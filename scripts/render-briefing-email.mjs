import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, basename, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const templateUrl = new URL('../templates/email/briefing.html', import.meta.url);
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const absoluteUrl = value => new URL(value).href;
const textStyle = 'color:#292d28;font-size:16px;line-height:28px;word-wrap:break-word;';
const mutedStyle = 'color:#70736a;font-size:13px;line-height:23px;';

function requiredText(value, name) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${name} 必须为非空文本。`);
}

function validateLink(link, name) {
  requiredText(link?.label, `${name}.label`);
  requiredText(link?.url, `${name}.url`);
  const url = new URL(link.url);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`${name}.url 必须是绝对 HTTPS 地址。`);
}

function validate(data) {
  for (const key of ['subject', 'preheader', 'title', 'date', 'intro']) requiredText(data[key], key);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)
    || Number.isNaN(Date.parse(data.date))
    || new Date(data.date).toISOString().slice(0, 10) !== data.date) throw new Error('date 必须是有效的 YYYY-MM-DD 日期。');
  validateLink({ label: '网页版', url: data.webUrl }, 'webUrl');
  if (!Array.isArray(data.stats) || data.stats.length !== 3) throw new Error('stats 需要三个计数。');
  for (const stat of data.stats) {
    requiredText(stat.label, 'stat.label');
    if (!Number.isInteger(stat.value) || stat.value < 0) throw new Error('stat.value 必须是非负整数。');
  }
  for (const key of ['today', 'stories', 'briefs', 'upcoming', 'relativeDeadlines']) {
    if (!Array.isArray(data[key])) throw new Error(`${key} 必须是数组，可为空。`);
    for (const [index, item] of data[key].entries()) {
      const name = `${key}[${index}]`;
      requiredText(item.title, `${name}.title`);
      requiredText(item.summary, `${name}.summary`);
      if (['today', 'upcoming', 'relativeDeadlines'].includes(key)) requiredText(item.when, `${name}.when`);
      if (key === 'stories') requiredText(item.category, `${name}.category`);
      if (key !== 'briefs') {
        if (!Array.isArray(item.facts)) throw new Error(`${name}.facts 必须是数组，可为空。`);
        for (const fact of item.facts) {
          requiredText(fact.label, `${name}.fact.label`);
          requiredText(fact.value, `${name}.fact.value`);
        }
      }
      if (!Array.isArray(item.links) || !item.links.length) throw new Error(`${name}.links 至少需要一个来源或详情链接。`);
      item.links.forEach((link, i) => validateLink(link, `${name}.links[${i}]`));
    }
  }
  if (!Array.isArray(data.notes) || !data.notes.length) throw new Error('notes 需要阅读提示。');
  data.notes.forEach((note, i) => requiredText(note, `notes[${i}]`));
}

const linksHtml = links => `<p style="margin:8px 0 0;font-size:14px;line-height:24px;">${links.map(link => `<a class="email-accent" href="${escape(absoluteUrl(link.url))}" style="display:inline-block;padding:6px 0;color:#526347;text-decoration:underline;">${escape(link.label)}</a>`).join('&nbsp;&nbsp;·&nbsp;&nbsp;')}</p>`;
const sectionRow = (title, content) => content ? `<tr><td class="page-pad" style="padding:26px 32px 4px;"><h2 class="email-text" style="margin:0 0 18px;color:#292d28;font-family:'Songti SC','SimSun',Georgia,serif;font-size:23px;line-height:34px;font-weight:400;">${title}</h2>${content}</td></tr>` : '';

const reminderFactsHtml = facts => facts.map(fact => `<p class="email-text" style="margin:8px 0 0;color:#292d28;font-size:15px;line-height:25px;overflow-wrap:anywhere;word-break:break-word;"><strong>${escape(fact.label)}：</strong>${escape(fact.value)}</p>`).join('\n');

function remindersHtml(items, featured) {
  return items.map(item => featured
    ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;margin:0 0 12px;"><tr><td class="email-soft email-mark" bgcolor="#e8eddf" style="padding:16px 18px;background-color:#e8eddf;border-left:3px solid #526347;">
      <p class="email-accent" style="margin:0 0 7px;color:#526347;font-size:13px;line-height:22px;font-weight:600;">${escape(item.when)}</p>
      <h3 class="email-text" style="margin:0 0 6px;${textStyle}font-size:17px;font-weight:600;">${escape(item.title)}</h3>
      <p class="email-text" style="margin:0;${textStyle}">${escape(item.summary)}</p>${reminderFactsHtml(item.facts)}${linksHtml(item.links)}
    </td></tr></table>`
    : `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;"><tr><td class="email-rule" style="padding:16px 0;border-top:1px solid #dedfd5;">
      <p class="email-accent" style="margin:0 0 6px;color:#526347;font-size:13px;line-height:22px;font-weight:600;">${escape(item.when)}</p>
      <h3 class="email-text" style="margin:0 0 5px;${textStyle}font-weight:600;">${escape(item.title)}</h3>
      <p class="email-text" style="margin:0;${textStyle}">${escape(item.summary)}</p>${reminderFactsHtml(item.facts)}${linksHtml(item.links)}
    </td></tr></table>`).join('\n');
}

function storiesHtml(items) {
  return items.map((item, index) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;"><tr><td class="email-rule" style="padding:0 0 22px;${index ? 'padding-top:22px;border-top:1px solid #dedfd5;' : ''}">
    <p class="email-muted" style="margin:0 0 8px;${mutedStyle}">${String(index + 1).padStart(2, '0')} &nbsp;/&nbsp; ${escape(item.category)}</p>
    <h3 class="email-text" style="margin:0 0 10px;color:#292d28;font-size:19px;line-height:30px;font-weight:600;">${escape(item.title)}</h3>
    <p class="email-text" style="margin:0 0 12px;${textStyle}">${escape(item.summary)}</p>
    ${item.facts.length ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-soft" bgcolor="#f0efe8" style="width:100%;border-collapse:collapse;background-color:#f0efe8;">${item.facts.map(fact => `<tr><td class="email-muted" width="72" valign="top" style="width:72px;padding:9px 0 9px 14px;${mutedStyle}">${escape(fact.label)}</td><td class="email-text" valign="top" style="padding:9px 14px 9px 10px;color:#292d28;font-size:15px;line-height:25px;word-wrap:break-word;">${escape(fact.value)}</td></tr>`).join('')}</table>` : ''}
    ${linksHtml(item.links)}
  </td></tr></table>`).join('\n');
}

function briefsHtml(items) {
  return items.map(item => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;"><tr><td class="email-rule" style="padding:16px 0;border-top:1px solid #dedfd5;">
    <h3 class="email-text" style="margin:0 0 7px;${textStyle}font-weight:600;">${escape(item.title)}</h3>
    <p class="email-text" style="margin:0;${textStyle}">${escape(item.summary)}</p>${linksHtml(item.links)}
  </td></tr></table>`).join('\n');
}

function plainSection(title, items) {
  if (!items.length) return '';
  return `\n${title}\n${items.map(item => [
    [item.when || item.category, item.title].filter(Boolean).join('｜'),
    item.summary,
    ...(item.facts || []).map(fact => `${fact.label}：${fact.value}`),
    ...item.links.map(link => `${link.label}：${absoluteUrl(link.url)}`),
  ].join('\n')).join('\n\n')}\n`;
}

/** 只生成邮件内容；输入均为纯文本，链接必须为绝对 HTTPS 地址。 */
export async function renderBriefingEmail(data) {
  validate(data);
  const template = await readFile(templateUrl, 'utf8');
  const dateLabel = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Shanghai' }).format(new Date(`${data.date}T00:00:00+08:00`));
  const replacements = {
    SUBJECT: escape(data.subject), PREHEADER: escape(data.preheader), WEB_URL: escape(absoluteUrl(data.webUrl)),
    TITLE: escape(data.title), DATE: escape(data.date), DATE_LABEL: escape(dateLabel), INTRO: escape(data.intro),
    STATS: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-rule" style="width:100%;table-layout:fixed;border-collapse:collapse;border-top:1px solid #dedfd5;border-bottom:1px solid #dedfd5;"><tr>${data.stats.map(stat => `<td width="33%" style="width:33%;padding:14px 0;"><p class="email-accent" style="margin:0 0 2px;color:#526347;font-size:25px;line-height:34px;font-weight:500;">${stat.value}</p><p class="email-muted" style="margin:0;${mutedStyle}">${escape(stat.label)}</p></td>`).join('')}</tr></table>`,
    TODAY: sectionRow('当日办理提醒', remindersHtml(data.today, true)),
    STORIES: sectionRow('本期重点', storiesHtml(data.stories)),
    BRIEFS: sectionRow('其他公告与补充', briefsHtml(data.briefs)),
    UPCOMING: sectionRow('后续时间节点', remindersHtml(data.upcoming, false)),
    RELATIVE_DEADLINES: sectionRow('相对期限提醒', remindersHtml(data.relativeDeadlines, false)),
    NOTES: data.notes.map(note => `<p class="email-muted" style="margin:0 0 7px;${mutedStyle}">${escape(note)}</p>`).join('\n'),
  };
  const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
    if (!(key in replacements)) throw new Error(`未知模板变量：${key}`);
    return replacements[key];
  });
  const text = `${data.title}｜${data.date}\n${data.preheader}\n\n${data.intro}\n${data.stats.map(stat => `${stat.label} ${stat.value}`).join(' · ')}\n`
    + plainSection('当日办理提醒', data.today) + plainSection('本期重点', data.stories)
    + plainSection('后续时间节点', data.upcoming) + plainSection('相对期限提醒', data.relativeDeadlines)
    + plainSection('其他公告与补充', data.briefs)
    + `\n阅读完整早报：${absoluteUrl(data.webUrl)}\n\n阅读提示\n${data.notes.join('\n')}\n\n本期日期 ${data.date}，所有时间均为北京时间。\n`;
  const bytes = Buffer.byteLength(html, 'utf8');
  if (bytes > 90 * 1024) throw new Error(`邮件 HTML 为 ${bytes} 字节，超过项目的 90 KiB 上限；请压缩非时限类背景或拆分邮件，保留全部办理与截止信息。`);
  return { subject: data.subject, html, text, bytes };
}

async function main() {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: { out: { type: 'string' } } });
  if (positionals.length !== 1) throw new Error('用法：npm run email:render -- <数据.json> [--out <输出目录>]');
  const input = resolve(positionals[0]);
  if (extname(input).toLowerCase() !== '.json') throw new Error('输入文件须为 JSON。');
  const data = JSON.parse(await readFile(input, 'utf8'));
  const email = await renderBriefingEmail(data);
  const outputDirectory = resolve(values.out || dirname(input));
  const stem = basename(input, extname(input));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, `${stem}.html`), email.html);
  await writeFile(resolve(outputDirectory, `${stem}.txt`), email.text);
  console.log(`主题：${email.subject}\nHTML：${resolve(outputDirectory, `${stem}.html`)}\n纯文本：${resolve(outputDirectory, `${stem}.txt`)}\nHTML 大小：${(email.bytes / 1024).toFixed(1)} KiB`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

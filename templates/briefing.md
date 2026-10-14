---
title: '早报排版样例｜2000-01-01'
description: '早报版式复用样例，包含重点日期、分类、完整公告、短公告、近期摘要和截止提醒。'
date: 2000-01-01
category: '南沙区政府早报'
format: briefing
tags: ['南沙', '政府公告', '早报']
draft: true
sample: true
---

<!--
复用方式：复制到 src/content/posts/，按本期日期重命名。
2000 年的日期、所有“示例”文案、【填写项】和 example.com 链接均需替换。
保留 format: briefing；完成核对后，将 draft 和 sample 改为 false。
HTML 包装标签与 Markdown 之间的空行不可省略，否则标题可能不进入目录。
本样例没有来源核验元数据；不要从往期文章复制旧的核验结果和正文摘要值。
-->

<p class="briefing-intro">2000年1月1日。本期汇总【填写收录日期范围】发布的公告，并附近期事项及截止提醒。以下时间均为北京时间。</p>

<!-- 重点概览：先交代本期数量与范围，再选一至两项最值得关注的时间节点。 -->
<section class="briefing-overview">

## 今日先看

本期收录 **3条示例公告**，包含1项政策申报、1项服务采购和1项结果公告。【填写一至两句本期概览】

<!-- href 必须对应下方真实标题的锚点；修改日期后同步修改链接。 -->
<div class="briefing-priorities">
  <a href="#2000年1月2日1800"><span>2000年1月2日 · 18:00前</span><strong>示例：企业申报材料送达截止</strong></a>
  <a href="#2000年1月3日1800"><span>2000年1月3日 · 18:00前</span><strong>示例：采购项目响应截止</strong></a>
</div>

</section>

<!-- 分类计数只统计本期公告；近期摘要单独说明，不重复计入。 -->
<section class="briefing-categories">

## 分类速览

<nav aria-label="按公告分类跳转">
  <a href="#政策及涉企">政策及涉企 <span>1</span></a>
  <a href="#招投标及采购">招投标及采购 <span>1</span></a>
  <a href="#其他">其他 <span>1</span></a>
  <a href="#土地规划及建设" class="is-empty">土地规划及建设 <span>0</span></a>
  <a href="#民生招聘及公共服务" class="is-empty">民生招聘及公共服务 <span>0</span></a>
</nav>

合计3条。另附1条近期公告，以及2项办理和截止提醒。

</section>

## 政策及涉企

<!-- 完整公告：复制整个 section；依次填写标题、日期、摘要、关键事项、说明和来源。 -->
<section class="briefing-item">

### 01｜示例：企业申报事项

<p class="briefing-meta">新发布 · <time datetime="2000-01-01">2000-01-01</time></p>

<div class="briefing-summary">

【填写适用对象】可申请【填写事项】，材料须于 **2000年1月2日18:00前** 提交。【补充一句关键条件】

</div>

<!-- dl 中使用 HTML；dd 内需要强调时用 <strong>，不要写 Markdown 的 **。 -->
<dl class="briefing-facts">
  <div><dt>适用对象</dt><dd>【填写对象与主要资格条件】</dd></div>
  <div><dt>申报时段</dt><dd>【填写开始时间】至2000年1月2日18:00</dd></div>
  <div><dt>所需材料</dt><dd>【填写材料清单、份数、签章等要求】</dd></div>
  <div><dt>提交方式</dt><dd>【填写线上入口、电子邮箱或线下地址】</dd></div>
</dl>

【填写事项背景、办理流程及官方明确的限制。保留必要条件，避免重复摘要。】

<!-- 四级标题可选：用于需要单独跳转的细节；短公告无需强行分节。 -->
#### 资格与材料

【填写较详细的资格说明或材料要求；内容较短时删除本小节，合并到上面的说明。】

<footer class="briefing-source">

**发布机关：** 【填写机关全称】<br />
**官方原标题：** 【填写完整原标题】

[官方原文](https://example.com/notice-policy) · [官方附件](https://example.com/notice-policy-attachment)

</footer>

</section>

<!-- 无新增类别：保留简短说明；当本期有公告时移除 briefing-empty，并改用完整公告结构。 -->
<section class="briefing-empty">

## 土地规划及建设

本期未收录【填写日期范围】发布的土地规划新公告。【如有持续关注事项，补充说明或链接】

</section>

## 招投标及采购

<section class="briefing-item">

### 02｜示例：服务采购事项

<p class="briefing-meta">新发布 · <time datetime="2000-01-01">2000-01-01</time></p>

<div class="briefing-summary">

预算 **【填写金额】**，服务期 **【填写期限】**，响应文件须于 **2000年1月3日18:00前** 送达。

</div>

<dl class="briefing-facts">
  <div><dt>预算</dt><dd>【填写含税金额及计价口径】</dd></div>
  <div><dt>获取文件</dt><dd>【填写获取时段、方式与费用】</dd></div>
  <div><dt>响应截止</dt><dd>2000年1月3日18:00；【填写接收要求】</dd></div>
  <div><dt>收件地点</dt><dd>【填写完整地址及房间号】</dd></div>
</dl>

【填写项目编号、服务范围、供应商资格、评审方式等背景。保留“不接受联合体”“邮寄以签收为准”等影响办理的限制；不要仅为了简短而删去。】

<footer class="briefing-source">

**采购人：** 【填写采购人全称】<br />
**官方原标题：** 【填写完整原标题】

[官方原文](https://example.com/notice-procurement)

</footer>

</section>

<section class="briefing-empty">

## 民生招聘及公共服务

本期未收录【填写日期范围】发布的招聘或公共服务新公告。【如有持续关注事项，补充说明或链接】

</section>

## 其他

<!-- 短公告：无需办理事项表时加 briefing-item--brief，使用更紧凑的间距。 -->
<section class="briefing-item briefing-item--brief">

### 03｜示例：结果公告

<p class="briefing-meta">新发布 · <time datetime="2000-01-01">2000-01-01</time></p>

<div class="briefing-summary">

【用一句话说明结果、适用对象及是否需要采取行动。】

</div>

【填写必要背景，区分文书作出日期与网页发布日期。没有面向公众的办理节点时，直接说明。】

<footer class="briefing-source">

**发布机关：** 【填写机关全称】<br />
**官方原标题：** 【填写完整原标题】

[官方原文](https://example.com/notice-result)

</footer>

</section>

<!-- 近期摘要是可选区块；没有内容时一并移除标题、目录入口与顶部数量说明。 -->
<section class="briefing-digest">

## 近期公告与持续关注

以下为【填写日期范围】发布、仍值得关注的1条近期公告。

### 示例：近期公共服务资料

1. **【填写公告标题】**<br />
   发布机关：【填写机关】。【概括事项与仍有效的办理要求；标明尚未核实的附件细节。】<br />
   [官方原文](https://example.com/notice-recent)

</section>

<!-- 按办理时间排序；同一天有多个事项时可合并到同一日期下。 -->
## 办理与截止提醒

以下按办理时间排序，涉及2项事项：

<div class="briefing-deadlines">

<section class="briefing-deadline">

### 2000年1月2日18:00

<div>

**1项企业申报截止**

【填写送达方式、办理地点及容易遗漏的条件。】[官方依据](https://example.com/notice-policy)

</div>

</section>

<section class="briefing-deadline">

### 2000年1月3日18:00

<div>

**1项采购项目响应截止**

【填写接收时段、送达方式与后续安排。】[官方依据](https://example.com/notice-procurement)

</div>

</section>

</div>

<section class="briefing-notes">

## 阅读提示

本期为公告摘编，部分事项可能未涵盖。未核实的附件细节请以官方原文为准；办理前请确认资格、材料和最新安排。

非政府官方发布，具体内容及解释以发布机关为准。

</section>

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const { clients, platforms } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/clients.json'), 'utf-8'));

const platformLabels = Object.fromEntries(platforms.map(p => [p.slug, p.name]));

const maintenanceBadge = {
  'active-documented': '项目有公开可核实的官方渠道与文档说明',
  'verify-maintenance': '⚠️ 维护状态待核实：建议先核对上游开源仓库最新提交记录，不宜直接作为首选客户端',
  'limited-maintenance-warning': '🚨 维护资源有限与安全警告：官方提示维护资源有限，且严禁下载 Google Play 商店中已被第三方控制的同名版本'
};

for (const c of clients) {
  const dir = path.join(ROOT, 'docs/clients', c.slug);
  fs.mkdirSync(dir, { recursive: true });

  const osNames = c.platforms.map(p => platformLabels[p] || p).join('、');
  const osLinks = c.platforms.map(p => `- [${platformLabels[p] || p} 客户端专题](/clients/${p}/)`).join('\n');

  const platformDetails = c.platformNotes
    ? Object.entries(c.platformNotes).map(([k, v]) => `- **${platformLabels[k] || k}**：${v}`).join('\n')
    : `- 覆盖平台：${osNames}。安装前请核对对应系统的芯片架构（如 x86_64 vs ARM64）与官方渠道说明。`;

  const faqs = [
    {
      q: `${c.name} 属于第三方通用客户端还是机场专属客户端？`,
      a: `${c.name} 属于第三方通用客户端，支持导入兼容格式订阅或节点配置，不绑定特定机场服务商；若您选用的机场仅提供专属 App 而不开放订阅链接，则无法在 ${c.name} 中导入使用。`
    },
    {
      q: `使用 ${c.name} 访问 Netflix 或 ChatGPT 报错，一定是软件问题吗？`,
      a: `不一定。客户端主要负责协议握手、规则分流与本地 DNS/TUN 接管；实际能否打开 Netflix 版权剧集或 ChatGPT 网页端，仍取决于机场出口 IP 地区、原生属性以及是否关闭了 IPv6 泄漏。`
    }
  ];

  const md = `---
title: ${c.name} 下载渠道、支持协议与配置使用指南
description: ${c.name} 客户端定位、支持系统（${osNames}）、核心（${c.core.join('/')}）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: ${c.name}
  os: ${osNames}
faqs:
  - q: ${faqs[0].q}
    a: ${faqs[0].a}
  - q: ${faqs[1].q}
    a: ${faqs[1].a}
---

# ${c.name} 使用与配置指南

**核心定位**：${c.summary}

> **维护与来源状态**：${maintenanceBadge[c.maintenanceStatus] || '请通过官方来源核实最新版本。'}

## 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | ${osNames} |
| **代理内核** | ${c.core.join(' / ')} |
| **支持网络协议** | ${c.protocols.join('、')} |
| **配置与订阅格式** | ${c.configFormat} |
| **授权与费用** | ${c.pricing} |
| **官方来源说明** | ${c.officialSourceLabel}（请勿从第三方广告站下载修改版） |

## 各平台安装与使用要点

${platformDetails}

## 订阅导入与流媒体 / AI 分流建议

1. **确认机场支持第三方订阅**：在购买机场套餐前，先核对[机场品牌数据库](/brands/)中该品牌是否标注“支持第三方订阅”（例如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均支持通用订阅；而飞猫云、SOGO 云、隐形人等仅提供专属客户端）。
2. **保护订阅链接**：不要将个人订阅链接粘贴到未知在线转换平台，防止节点信息泄漏。
3. **开启远程 DNS 与 TUN 接管**：使用桌面端 AI 应用或流媒体客户端时，建议开启 TUN 模式并关闭无效 IPv6 穿透，详细步骤见 [TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。
4. **AI 账号防风控**：在策略组中将 ChatGPT / Claude / Gemini 域名固定至单一可用海外地区节点（如美、日、新），避免自动测速频繁跨区切换。

## 所属平台入口与延伸阅读

${osLinks}
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## 常见问题

<FaqBlock :items="$frontmatter.faqs" />
`;

  fs.writeFileSync(path.join(dir, 'index.md'), md, 'utf-8');
}

console.log(`Generated ${clients.length} client detail pages under docs/clients/.`);

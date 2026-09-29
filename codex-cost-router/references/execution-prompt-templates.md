# Execution Prompt Templates

This file provides reusable final prompts for Codex after preflight routing.

## Template 1 — Answer Only

Use when the task does not require file access.

```prompt
请只回答问题，不要读取项目文件，不要修改文件，不要运行命令。

任务：
[填写用户问题]

输出要求：
1. 直接给出结论
2. 如有必要，给出简短原因
3. 不要扩展到无关内容
```

## Template 2 — Plan Only

Use when the task needs planning before execution.

```prompt
先不要修改文件，也不要运行命令。请只做执行计划。

任务目标：
[填写任务目标]

限制：
1. 不要扫描整个项目。
2. 不要修改任何文件。
3. 不要安装依赖。
4. 不要运行构建或测试命令。
5. 如果需要查看文件，请先说明需要查看哪些文件以及原因。

请输出：
1. 任务理解
2. 预计涉及的文件范围
3. 最低成本执行步骤
4. 风险点
5. 需要我确认的信息
6. 下一步建议
```

## Template 3 — Read-only Investigation

Use for debugging or unknown root cause.

```prompt
先不要修改文件。请只读分析问题原因。

任务目标：
[填写问题目标]

已知信息：
[粘贴错误信息、截图描述或现象]

限制：
1. 不要扫描整个项目。
2. 优先查看我指定的文件：[填写文件路径]
3. 如果还需要其他文件，请先说明文件路径和原因。
4. 不要安装依赖。
5. 不要运行命令，除非你先说明命令目的并得到确认。
6. 不要修改任何文件。

请输出：
1. 已查看的文件
2. 关键证据
3. 可能原因排序
4. 是否需要继续查看其他文件
5. 最低成本修复方案
```

## Template 4 — Narrow Single-file Edit

Use for clear low-risk changes.

```prompt
请只修改指定文件，不要扫描整个项目，不要修改其他文件。

任务目标：
[填写具体修改目标]

允许修改的文件：
[填写文件路径]

限制：
1. 只修改上述文件。
2. 不要安装依赖。
3. 不要重构无关代码。
4. 不要改变现有功能逻辑，除非任务明确要求。
5. 不要运行命令，除非修改后必须验证，并先说明原因。

完成后请输出：
1. 修改了什么
2. 修改了哪些文件
3. 是否需要我手动检查
4. 如果有风险，请说明
```

## Template 5 — Small Frontend Feature

Use for small UI or frontend logic tasks.

```prompt
请按低成本方式实现这个前端小功能。

任务目标：
[填写功能目标]

范围限制：
1. 不要扫描整个项目。
2. 先查看相关文件：[填写文件路径]
3. 如果需要更多文件，请先说明原因。
4. 不要安装新依赖，优先使用现有代码和现有样式。
5. 不要重构无关模块。
6. 不要改变无关页面。

执行步骤：
1. 先简短说明你的实现计划。
2. 然后只修改必要文件。
3. 修改后输出变更摘要。
4. 如有测试命令，请先说明再建议运行。

最终输出：
- 修改文件列表
- 核心改动
- 手动测试方法
- 潜在风险
```

## Template 6 — Multi-file Staged Implementation

Use for multi-file features.

```prompt
这是一个多文件任务，请分阶段执行，不要一次性大改。

任务目标：
[填写任务目标]

第一阶段要求：
1. 先只读分析相关文件。
2. 不要修改文件。
3. 不要运行命令。
4. 不要扫描整个项目。
5. 先查看这些文件：[填写初始文件路径]

请先输出：
1. 你认为会涉及哪些文件
2. 每个文件为什么相关
3. 最小修改方案
4. 风险点
5. 是否需要我确认后再进入修改阶段

只有我确认后，才进入第二阶段修改。
```

## Template 7 — Debug Build Error

Use for build errors or dependency issues.

```prompt
请先低成本定位构建错误原因，不要直接修改文件。

错误信息：
[粘贴关键错误日志，不要粘贴超长完整日志]

限制：
1. 不要扫描整个项目。
2. 先查看 package.json 和与错误相关的文件。
3. 不要读取 node_modules、dist、build、.next、coverage。
4. 不要修改 lock 文件，除非确认问题与依赖解析有关。
5. 不要运行 npm install / update。
6. 不要修改文件，先输出诊断结论。

请输出：
1. 错误类型
2. 最可能原因
3. 需要查看的文件
4. 最小修复方案
5. 是否需要运行命令验证
```

## Template 8 — Refactor Planning

Use before refactoring.

```prompt
请先做重构计划，不要直接修改文件。

重构目标：
[填写目标]

限制：
1. 先只读分析。
2. 不要扫描整个项目，先查看这些文件：[填写文件路径]
3. 不要修改文件。
4. 不要重命名或移动文件。
5. 不要改变现有功能。
6. 不要安装依赖。

请输出：
1. 当前结构问题
2. 建议重构范围
3. 需要修改的文件列表
4. 每个修改的原因
5. 最小可执行重构步骤
6. 风险和回滚建议
7. 需要我确认的问题
```

## Template 9 — High-risk Task

Use for auth, payment, database, deployment, secrets, production.

```prompt
这是高风险任务。请严格保持只读分析，不要修改文件，不要运行命令。

任务目标：
[填写任务目标]

高风险原因：
[填写涉及 auth / payment / database / deployment / secrets / production 等]

限制：
1. 不要修改任何文件。
2. 不要运行任何命令。
3. 不要读取或输出任何密钥、token、cookie、密码。
4. 不要部署。
5. 不要执行数据库迁移。
6. 不要删除、移动、重命名文件。
7. 只查看我允许的文件：[填写文件路径]

请输出：
1. 风险评估
2. 影响范围
3. 需要备份或确认的内容
4. 推荐执行步骤
5. 回滚思路
6. 需要我明确确认的问题

只有我确认后，才能进入下一步。
```

## Template 10 — Full Project Audit

Use only when broad analysis is necessary.

```prompt
请做项目审查，但要控制上下文消耗。

任务目标：
[填写审查目标]

限制：
1. 不要一开始读取所有文件内容。
2. 先读取文件树和关键配置文件。
3. 不要读取 node_modules、dist、build、.next、coverage、锁文件、大型生成文件。
4. 不要修改文件。
5. 不要运行命令，除非先说明必要性。
6. 审查过程中优先抽样和分层分析，不要全量展开。

请输出：
1. 项目结构概览
2. 你建议重点查看的文件/目录
3. 为什么这些文件重要
4. 第一轮发现
5. 是否需要进入第二轮深度分析
```

## Template 11 — Existing Codex Task Compression

Use when user already has a large vague task.

```prompt
请把下面这个大任务压缩成低成本、分阶段、可执行的Codex任务计划。

原始任务：
[粘贴原始大任务]

要求：
1. 不要直接执行。
2. 不要修改文件。
3. 先判断任务复杂度和风险。
4. 把任务拆成3-5个阶段。
5. 每个阶段都说明推荐模型、推理档位、权限和上下文范围。
6. 最后生成第一阶段的精简执行prompt。

输出：
- 任务分级
- 成本风险
- 阶段拆分
- 第一阶段执行prompt
```

## Template 12 — Cost-sensitive Mode

Use when user explicitly says budget is limited.

```prompt
请按最低成本方式处理这个任务。

任务目标：
[填写任务目标]

成本限制：
1. 不要使用不必要的大上下文。
2. 不要扫描整个项目。
3. 不要运行命令，除非必要。
4. 不要安装依赖。
5. 不要生成长篇解释。
6. 不要重构无关代码。
7. 只处理最小必要范围。

请先输出：
1. 最小需要查看的文件
2. 最小修改方案
3. 预计风险
4. 是否可以只改一个文件完成

确认后再修改。
```

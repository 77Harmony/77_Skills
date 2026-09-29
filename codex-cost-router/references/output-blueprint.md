# Output Blueprint

Every Codex Cost Router response must follow this structure.

## Standard Output Format

```text
【Codex执行前评估】

一、任务摘要
- 用户目标：
- 任务类型：
- 是否需要立即执行：
- 是否建议先Plan：

二、复杂度与成本风险
- 任务复杂度：A / B / C / D / E
- 成本风险：低 / 中 / 高 / 极高
- 主要消耗来源：
- 是否可能触发大上下文：
- 是否可能多轮返工：

三、推荐设置
- 推荐模型：
- 推荐推理档位：
- 推荐速度模式：
- 推荐权限：
- 是否允许读全项目：
- 是否允许改文件：
- 是否允许运行命令：
- 是否允许联网：
- 是否需要MCP/外部工具：

四、为什么这样选
- 原因1：
- 原因2：
- 原因3：

五、执行策略
- 第一步：
- 第二步：
- 第三步：
- 是否需要用户确认：

六、需要人工补充的信息
- 信息1：
- 信息2：
- 信息3：

七、省token建议
- 建议1：
- 建议2：
- 建议3：

八、风险提醒
- 风险1：
- 风险2：
- 风险3：

九、最终给Codex的执行Prompt
```prompt
...
```
```

## Field Guidance

### 一、任务摘要

Summarize the task in plain language.

Do not exaggerate complexity.

Identify whether the task is:

- Advice only
- Planning only
- Read-only investigation
- Direct small edit
- Staged implementation
- High-risk controlled task

### 二、复杂度与成本风险

Use complexity levels:

- A: Lightweight
- B: Standard small task
- C: Multi-file task
- D: Complex debugging/refactor
- E: High-risk task

Use cost risk levels:

- 低: small context, little output, no execution
- 中: several files or moderate output
- 高: multi-file analysis, tool calls, debugging loops
- 极高: full project scan, high reasoning, repeated execution, production-sensitive

Main cost sources may include:

- Large project context
- Multiple file reads
- Long generated code
- Repeated command execution
- High reasoning effort
- Strong model usage
- Fast mode
- Full repo scan
- Long error logs
- Large dependency files
- MCP/tool overhead

### 三、推荐设置

Recommended model examples:

- GPT-5.4-Mini or equivalent low-cost coding model
- GPT-5.4 or equivalent mid-strength coding model
- GPT-5.5 or strongest available reasoning/coding model
- DeepSeek official model if the user uses DeepSeek
- Local model if the task is low-risk and user wants zero API cost

Reasoning options:

- Low
- Medium
- High
- Ultra-high

Speed mode:

- Off by default
- On only when user prioritizes speed and accepts higher cost

Permissions:

- No access
- Read-only
- Workspace-write
- On-request approval
- Human-only for risky operations

### 四、为什么这样选

Give 2-4 concise reasons.

Focus on:

- Scope
- Complexity
- Risk
- Cost
- Expected context size

### 五、执行策略

Use one of these execution strategies:

1. Answer only
2. Plan only
3. Read-only investigation
4. Narrow edit
5. Staged implementation
6. High-risk controlled execution

### 六、需要人工补充的信息

Only ask for missing information that affects safety, accuracy, or cost.

Examples:

- Which file should be modified?
- What is the error log?
- Is this development or production?
- Which package manager is used?
- Can Codex run tests?
- Is there a backup?
- What model/provider are you using?
- Is cost or speed more important?

Do not ask unnecessary questions.

If the task can proceed with assumptions, list assumptions clearly.

### 七、省token建议

Always include token-saving suggestions.

Examples:

- Do not scan full project first.
- Provide exact file paths.
- Paste the error log.
- Ask Codex to inspect package/config only if needed.
- Avoid high reasoning until normal model fails.
- Do not enable speed mode.
- Split the task into diagnosis and implementation.
- Avoid reading lock files unless dependency issue requires it.
- Avoid reading build output directories.

### 八、风险提醒

Include only relevant risks.

Examples:

- This may modify multiple files.
- This may require running commands.
- This may affect authentication.
- This may expose secrets if logs are pasted carelessly.
- This may break existing layout.
- This may require manual browser testing.
- This may require rollback planning.

### 九、最终给Codex的执行Prompt

This must be directly usable.

The prompt must include:

- “Do not execute immediately” if planning is needed
- File scope restrictions
- Tool restrictions
- Whether to edit or only inspect
- Expected final output
- What not to do

## Example Final Prompt

```prompt
先不要修改文件。请先只读分析这个任务。

目标：找出React页面按钮点击无效的原因。

限制：
1. 不要扫描整个项目。
2. 先只查看我指定的文件：src/pages/ProductPage.tsx 和 src/components/BuyButton.tsx。
3. 不要安装依赖。
4. 不要运行构建命令，除非你先说明原因并获得确认。
5. 不要修改文件，先输出问题定位、可能原因、需要查看的下一批文件。

最终输出：
- 你查看了哪些文件
- 你判断的可能原因
- 是否需要继续查看其他文件
- 下一步最低成本修改方案
```

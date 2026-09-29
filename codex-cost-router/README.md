# Codex Cost Router

Codex Cost Router is a preflight planning skill for Codex.

It helps users choose the right model, reasoning effort, speed mode, permissions, context scope, and execution strategy before Codex starts reading files, modifying code, running commands, or consuming a large amount of tokens.

## Why This Exists

Many new Codex users waste usage because they give Codex a broad goal and let it start executing immediately.

Common problems:

- Using the strongest model for simple tasks
- Turning on high reasoning by default
- Letting Codex scan the whole project
- Running commands too early
- Editing files before diagnosis
- Installing dependencies unnecessarily
- Debugging by repeated trial and error
- Using fast mode when cost matters
- Giving broad write permissions for unclear tasks

Codex Cost Router solves this by adding a preflight step.

Before execution, it asks:

- What type of task is this?
- How complex is it?
- How much context is needed?
- Which model is enough?
- What reasoning effort is appropriate?
- Should fast mode be off?
- Should Codex stay read-only first?
- Should the task be split into stages?
- What is the safest and most cost-efficient execution prompt?

## What It Does

Codex Cost Router outputs a structured evaluation:

1. Task summary
2. Task type
3. Complexity level
4. Cost risk level
5. Recommended model
6. Recommended reasoning effort
7. Recommended speed mode
8. Recommended permissions
9. Recommended context scope
10. Execution strategy
11. Missing information
12. Token-saving suggestions
13. Risk warnings
14. Final optimized Codex prompt

## What It Does Not Do

This skill does not directly:

- Modify files
- Run commands
- Install dependencies
- Deploy projects
- Access secrets
- Change databases
- Change payment logic
- Refactor large projects automatically

It is a planning and routing skill, not an execution agent.

## Who It Is For

Codex Cost Router is useful for:

- New Codex users who want to avoid unnecessary token usage
- Builders who often start with broad or unclear coding goals
- Teams that want a consistent preflight process before edits
- Users comparing model, reasoning, speed, and permission settings
- Anyone who wants Codex to plan first and execute only after scope is clear

## Recommended Use

Before giving Codex a large or unclear task, ask:

```text
先不要执行，请使用 codex-cost-router 对下面任务做执行前配置评估：
[你的任务]
```

Example:

```text
先不要执行，请使用 codex-cost-router 对下面任务做执行前配置评估：
我想让Codex帮我修改一个HTML网页，把它变成服装SKU内容生成工作流，同时支持复制四个板块内容。
```

The skill will recommend:

- Whether this is A/B/C/D/E level
- Which model to use
- Which reasoning setting to use
- Whether to keep speed mode off
- Whether to start read-only
- Whether to modify files directly
- How to phrase the final Codex execution prompt

## Complexity Levels

### A — Lightweight Task

Examples:

- Explain code
- Rewrite text
- Change CSS
- Fix typo
- Update README
- Generate prompt

Recommended:

- Low-cost model
- Low or Medium reasoning
- No full project scan

### B — Standard Small Task

Examples:

- Modify one page
- Add simple frontend feature
- Add form UI
- Adjust layout
- Generate small script

Recommended:

- Low-cost model
- Medium reasoning
- Targeted file access

### C — Multi-file Task

Examples:

- Add feature across several files
- API integration
- State logic
- Module refactor
- Medium debugging

Recommended:

- Mid-strength model
- Medium or High reasoning
- Read-only first if unclear

### D — Complex Debugging / Refactor

Examples:

- Build failure
- Dependency conflict
- Repeated failed bug fix
- Architecture-level refactor
- Unknown root cause

Recommended:

- Strong model
- High reasoning
- Speed off
- Read-only investigation first

### E — High-risk Task

Examples:

- Auth
- Payment
- Database
- Deployment
- Secrets
- Production configuration
- File deletion

Recommended:

- Strongest model
- High or Ultra-high reasoning
- Speed off
- Mandatory user confirmation
- Read-only audit first

## Default Recommendation

For most new users:

```text
Model: GPT-5.4-Mini or equivalent low-cost coding model
Reasoning: Medium
Speed: Off
Permission: Read-only first for unclear tasks
Context: Targeted files only
Strategy: Plan before editing
```

Concrete model names are examples for routing. Use the closest available model tier in your Codex environment.

## Installation

Place this folder in your Codex skills directory:

```text
~/.codex/skills/codex-cost-router
```

## Directory Structure

Expected project structure:

```text
~/.codex/skills/codex-cost-router/
├── SKILL.md
├── references/
│   ├── decision-matrix.md
│   ├── task-taxonomy.md
│   ├── output-blueprint.md
│   ├── cost-saving-rules.md
│   ├── risk-checklist.md
│   └── execution-prompt-templates.md
└── README.md
```

## Usage

After placing the folder in your Codex skills directory and reloading Codex, ask for a preflight route before execution:

```text
使用 codex-cost-router，先评估下面任务，不要读全项目、不要改文件、不要运行命令：
[你的任务]
```

## Example Output

```text
【Codex执行前评估】

一、任务摘要
- 用户目标：修改一个HTML页面，加入SKU内容生成工作流
- 任务类型：单页面前端/MVP页面任务
- 是否需要立即执行：不建议直接执行
- 是否建议先Plan：建议

二、复杂度与成本风险
- 任务复杂度：B
- 成本风险：中
- 主要消耗来源：页面结构理解、HTML/CSS/JS修改、输出代码
- 是否可能触发大上下文：低
- 是否可能多轮返工：中

三、推荐设置
- 推荐模型：GPT-5.4-Mini
- 推荐推理档位：中
- 推荐速度模式：关闭
- 推荐权限：workspace-write，但只允许修改指定HTML文件
- 是否允许读全项目：否
- 是否允许改文件：允许，只改目标文件
- 是否允许运行命令：否，除非用户确认
- 是否允许联网：否
- 是否需要MCP/外部工具：否

九、最终给Codex的执行Prompt
请只修改指定HTML文件，不要扫描整个项目，不要安装依赖，不要运行命令……
```

## Project Philosophy

Codex Cost Router is based on one idea:

```text
Do not let the coding agent start expensive execution before the task is routed.
```

A good Codex workflow should decide:

- How much context is enough
- Which model is enough
- How much reasoning is enough
- Which permissions are safe
- Whether execution should be staged

## Roadmap

### v0.1

- Instruction-only skill
- Decision matrix
- Task taxonomy
- Output blueprint
- Cost-saving rules
- Risk checklist
- Execution prompt templates

### v0.2

- More real examples
- Model/provider comparison templates
- Chinese and English output modes
- Common Codex task library

### v0.3

- CLI version
- Interactive task classifier
- Markdown task plan export
- Local configuration recommendations

### v0.4

- Usage logging template
- Before/after cost comparison
- Team workflow guide
- AGENTS.md optimization guide

### v1.0

- Full Codex preflight toolkit
- Skill + CLI + examples + team rules

## License

MIT License recommended.

## Disclaimer

This tool provides planning and configuration recommendations only.

It does not guarantee lower cost in every case.

Actual usage depends on:

- Selected model
- Provider pricing
- Context size
- Number of tool calls
- Reasoning effort
- Speed mode
- User prompts
- Project size
- Execution loops

Always review high-risk tasks manually.

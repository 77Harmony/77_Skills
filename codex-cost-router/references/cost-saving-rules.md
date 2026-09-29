# Cost-saving Rules

This document defines practical rules for reducing unnecessary Codex usage.

## 1. Start Narrow

Do not start with a full project scan.

Prefer this order:

1. User’s task description
2. Error message or screenshot
3. Specific file path
4. One relevant file
5. Directly imported related file
6. Config file if needed
7. Full project scan only if necessary

## 2. Do Not Default to the Strongest Model

Use the strongest model only when:

- The task is complex
- A cheaper model failed
- Multiple files are involved
- Architecture reasoning is required
- Risk is high
- The bug root cause is unclear
- The task is production-critical

Use lower-cost models for:

- Text
- Prompts
- README
- HTML/CSS
- Simple JS
- Static pages
- Small UI edits
- Low-risk frontend changes

## 3. Do Not Default to High Reasoning

High reasoning is useful but costly.

Use low or medium reasoning first for:

- Simple edits
- Static content
- Basic layout
- Documentation
- Simple bug fixes
- Direct instructions

Use high reasoning for:

- Debugging
- Multi-file logic
- Build failures
- State management
- API integration
- Refactor planning

Use ultra-high reasoning only when:

- Failure cost is high
- Previous attempts failed
- Auth/payment/database/deployment is involved
- The task needs architecture-level decisions

## 4. Keep Speed Mode Off by Default

Speed mode can increase consumption.

Use it only if:

- The user explicitly prioritizes speed
- The task is not high-risk
- The user accepts higher cost
- The task is already clear and scoped

Avoid speed mode when:

- The user is cost-sensitive
- The task is unclear
- The task may require many iterations
- Large context may be needed
- The task is high-risk

## 5. Split Large Tasks

Large vague tasks waste usage.

Convert:

```text
帮我完善整个项目
```

Into:

```text
第一步：只读分析项目结构，输出问题清单。
第二步：选择一个最重要的问题。
第三步：只修改相关文件。
第四步：运行最小必要测试。
```

## 6. Separate Diagnosis and Implementation

For debugging tasks:

1. First turn: read-only diagnosis
2. Second turn: user confirms likely cause
3. Third turn: minimal edit
4. Fourth turn: run targeted test
5. Fifth turn: summarize and suggest next step

Do not let Codex debug by repeatedly editing randomly.

## 7. Avoid Reading Heavy Files

Avoid reading these files unless necessary:

- node_modules
- dist
- build
- .next
- coverage
- package-lock.json
- yarn.lock
- pnpm-lock.yaml
- large generated files
- minified assets
- compiled output
- binary files
- images
- videos
- database dumps
- logs with secrets
- huge CSV files

Read lock files only when dependency resolution is the actual problem.

## 8. Use File Paths

Always encourage the user to provide exact paths.

Good:

```text
请只看 src/components/SkuForm.tsx 和 src/utils/exportExcel.ts
```

Bad:

```text
你看看整个项目哪里有问题
```

## 9. Limit Output Size

For planning tasks, ask for concise output.

Recommended:

```text
只输出三部分：问题定位、最低成本执行方案、需要确认的信息。
```

Avoid:

```text
详细解释所有代码和所有可能性。
```

## 10. Avoid Premature Command Execution

Do not run commands unless needed.

Before running commands, Codex should state:

- What command it wants to run
- Why it is needed
- What output it expects
- Whether it may be costly or risky

Safe examples:

- npm test for targeted tests
- npm run lint if project already has lint
- npm run build after code changes

Risky examples:

- rm -rf
- npm install without confirmation
- database migration
- deployment
- modifying global config
- changing permissions

## 11. Avoid Dependency Installation

Installing dependencies can cause unnecessary churn.

Do not recommend installation unless:

- The feature truly requires it
- The existing stack lacks needed capability
- User confirms package manager
- User accepts package changes

Prefer using existing dependencies.

## 12. Use Read-only First for Unknown Bugs

If root cause is unknown, use read-only first.

Read-only investigation should output:

- Files inspected
- Evidence found
- Likely root cause
- Next files to inspect if needed
- Minimal fix plan

## 13. Stop After Useful Milestones

Codex should not continue endlessly.

After each stage, ask whether to proceed.

Stages:

1. Analysis
2. Plan
3. Minimal edit
4. Test
5. Summary

## 14. Keep AGENTS.md Focused

Large AGENTS.md files increase context overhead.

Recommendations:

- Keep global rules short
- Put project-specific instructions only where needed
- Avoid long background stories
- Avoid duplicated rules
- Avoid huge examples
- Keep commands and conventions concise

## 15. Avoid Tool Overload

Disable unnecessary MCP servers or external tools when not needed.

Do not use web, browser, GitHub, database, or cloud tools unless the task requires them.

## 16. Prefer Local Reasoning for Non-code Planning

Business analysis, product thinking, prompt writing, and task decomposition often do not need Codex execution.

Use a chat model or manual planning before asking Codex to modify files.

## 17. Use Staged Prompts

Instead of one huge task:

```text
帮我做完整AI电商网页，包括前端、后端、导出、部署
```

Use:

```text
第一阶段：只做静态前端页面。
第二阶段：加本地数据结构。
第三阶段：加导出功能。
第四阶段：再考虑后端。
```

## 18. Reuse Previous Analysis

If Codex already analyzed a file, do not ask it to re-read everything.

Provide a short summary and continue from the last stage.

## 19. Ask for Human Confirmation on Risk

Mandatory confirmation required for:

- Payment
- Auth
- Database
- Deployment
- File deletion
- Dependency changes
- Production settings
- Secrets
- Permissions
- CI/CD

## 20. Recommended Default

For most new users:

```text
Model: GPT-5.4-Mini
Reasoning: Medium
Speed: Off
Permissions: Read-only first for unclear tasks
Context: Targeted files only
Strategy: Plan before editing
```

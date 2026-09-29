# Decision Matrix

This document defines the routing rules for Codex Cost Router.

The goal is to recommend the lowest-cost configuration that is still strong enough to complete the task safely.

## 1. Main Decision Dimensions

Evaluate every task using these dimensions:

1. Task type
2. Codebase scope
3. Number of files likely involved
4. Need for project-wide context
5. Need for shell commands
6. Need for dependency installation
7. Need for external network or web access
8. Risk level
9. Expected output size
10. Prior failure history
11. User urgency
12. Need for creative generation vs code reasoning
13. Need for execution vs planning
14. Whether secrets, payment, auth, database, or deployment are involved

## 2. Model Recommendation Matrix

### GPT-5.4-Mini or Equivalent Low-cost Coding Model

Use for:

- Simple HTML/CSS/JS edits
- Static page changes
- Copywriting
- README edits
- Small bug fixes
- Simple scripts
- Prompt generation
- UI text replacement
- File formatting
- Small frontend tasks
- Low-risk single-file changes

Avoid for:

- Large refactors
- Complex debugging
- Deep architecture work
- Security-sensitive code
- Repeated failed fixes
- Unknown bug location across many files

Recommended reasoning:

- Low for text, explanation, formatting
- Medium for normal small coding tasks

### GPT-5.4 or Equivalent Mid-strength Coding Model

Use for:

- Multi-file features
- Frontend-backend connection
- API integration
- State management
- Medium debugging
- Module-level refactor
- Build errors with clear logs
- Data transformation logic
- Code review on selected files

Avoid using it as default for:

- Very simple text tasks
- Tiny CSS edits
- Large unknown production issues where strongest reasoning is required

Recommended reasoning:

- Medium for normal multi-file work
- High for complex integration or debugging

### GPT-5.5 or Equivalent Strongest Available Model

Use for:

- Complex debugging
- Repeated failed attempts
- Architecture decisions
- Cross-module refactor
- Unknown bug root cause
- Production-critical logic
- Security-sensitive reasoning
- Database/auth/payment/deployment planning
- High-risk changes
- Large codebase strategy

Avoid using it for:

- Basic page edits
- Simple CSS
- README generation
- SKU content generation
- Simple prompts
- Simple scripts
- Tasks where the user can provide the exact target file

Recommended reasoning:

- Medium for planning and analysis
- High for hard debugging and architecture
- Ultra-high only for critical or repeated-failure tasks

## 3. Reasoning Effort Matrix

### Low Reasoning

Use when:

- The task is simple
- The correct solution is obvious
- The user provides enough context
- No multi-step diagnosis is needed
- Output is mostly text, formatting, or small code

Examples:

- Change button text
- Explain one function
- Rewrite README section
- Modify one CSS rule
- Generate a simple prompt
- Fix a typo

### Medium Reasoning

Use when:

- Default coding mode is needed
- The task requires some planning
- One to three files are involved
- There is a small logic change
- The issue is understandable from given context

Examples:

- Add a form
- Modify a page layout
- Add local validation
- Refactor one component
- Fix a normal UI bug
- Add simple frontend logic

### High Reasoning

Use when:

- Multiple files are involved
- The root cause is not obvious
- The task needs design decisions
- There is a build/runtime error
- Integration logic is involved
- There is a risk of breaking existing behavior

Examples:

- Fix build failure
- Resolve API integration bug
- Refactor shared logic
- Add export feature across modules
- Debug state inconsistency
- Analyze project structure

### Ultra-high Reasoning

Use only when:

- The task is high-risk
- Previous attempts failed
- The issue is deep or hidden
- Production impact is likely
- Security, auth, payment, database, or deployment is involved
- Architecture-level tradeoffs must be made

Examples:

- Payment flow changes
- Database migration planning
- Auth system refactor
- Production deployment failure
- Security audit
- Major architecture decision

## 4. Speed Mode Matrix

### Speed Off

Default for almost all tasks.

Use when:

- User wants to save cost
- Task is unclear
- Task needs careful reasoning
- Large context may be needed
- Task is high-risk
- Debugging may involve multiple turns

### Speed On

Use only when:

- User explicitly values speed
- Task is time-sensitive
- User accepts higher consumption
- Task is not high-risk

Avoid speed mode when:

- The user says budget is limited
- The task requires deep thinking
- The task involves production, auth, database, payment, or deployment
- The task may need many tool calls

## 5. Permission Matrix

### Read-only

Use for:

- Planning
- Audit
- Code explanation
- Project understanding
- Risk assessment
- Debugging investigation before edits
- Any unclear task

### Workspace-write

Use for:

- Clear file modifications
- Low-risk code edits
- User-approved implementation
- Single-page or small feature changes
- Documentation updates

### On-request Approval

Use for:

- Shell commands
- Dependency installation
- File deletion
- Large refactors
- Database-related changes
- Auth/payment/security changes
- Deployment
- CI/CD changes
- Any potentially irreversible operation

### Never Recommend Automatic Execution

For:

- Deleting files
- Rotating secrets
- Modifying production database
- Changing payment logic
- Pushing deployment
- Running destructive shell commands
- Uploading private code or secrets

## 6. Context Scope Matrix

### User Snippet Only

Use when:

- User provided enough code
- Task is explanatory
- No project structure is needed

### One Relevant File

Use when:

- User names the file
- The change is localized
- The dependency chain is simple

### Few Relevant Files

Use when:

- A component imports another file
- A bug touches UI and logic
- A feature spans small modules

### Targeted Project Scan

Use when:

- The exact file is unknown
- There is a build error
- Need package/config inspection
- Need dependency chain investigation

### Full Project Scan

Use only when:

- Architecture analysis is required
- User explicitly requests full audit
- The bug location is unknown after targeted scan
- There is a migration/refactor across the codebase

## 7. Execution Strategy Matrix

### Strategy 1 — Answer Only

Use for:

- Concepts
- Advice
- Model choice
- Configuration explanation

No file read or modification.

### Strategy 2 — Plan Only

Use for:

- Unclear task
- Complex task
- High-risk task
- User asks for strategy first

No modification.

### Strategy 3 — Read-only Investigation

Use for:

- Debugging
- Project understanding
- Unknown root cause

Read files and logs, no edits.

### Strategy 4 — Narrow Edit

Use for:

- Single-file or clearly scoped changes

Edit only specified files.

### Strategy 5 — Staged Implementation

Use for:

- Multi-file changes
- Larger features
- Refactors

Plan → user confirmation → edit → test → summarize.

### Strategy 6 — High-risk Controlled Execution

Use for:

- Auth
- Payment
- Database
- Deployment
- Security

Read-only audit → risk report → user confirmation → minimal change → verification.

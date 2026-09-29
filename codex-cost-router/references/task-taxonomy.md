# Task Taxonomy

This file defines common Codex task types and their recommended treatment.

## 1. Text and Documentation Tasks

Examples:

- Rewrite README
- Generate product documentation
- Improve comments
- Translate text
- Generate prompts
- Write release notes
- Summarize code behavior

Default level:

- A

Recommended settings:

- Model: GPT-5.4-Mini or equivalent
- Reasoning: Low or Medium
- Speed: Off
- Permissions: No file access unless updating docs
- Context: User-provided text or selected files only

Notes:

- Do not scan full project unless documentation requires project-wide summary.
- If creating docs based on a real project, inspect only relevant files first.

## 2. Simple UI / Styling Tasks

Examples:

- Change button color
- Adjust spacing
- Modify CSS
- Change font size
- Update page title
- Replace icon
- Minor layout tweak

Default level:

- A or B

Recommended settings:

- Model: GPT-5.4-Mini
- Reasoning: Low for tiny edits, Medium for layout changes
- Speed: Off
- Permissions: Workspace-write only for specific files
- Context: One relevant file or component

Notes:

- Do not read the whole project.
- Ask user to name the file if unknown.
- Avoid running full build unless change may break layout or CSS pipeline.

## 3. Static Page or MVP Page Tasks

Examples:

- Build a simple HTML page
- Create a local prototype
- Add a content workflow page
- Create a landing page
- Create a dashboard mockup
- Add form UI without backend

Default level:

- B

Recommended settings:

- Model: GPT-5.4-Mini
- Reasoning: Medium
- Speed: Off
- Permissions: Workspace-write after plan
- Context: Relevant frontend files only

Notes:

- Keep task scoped.
- Avoid adding frameworks or dependencies unless requested.
- Prefer incremental implementation.

## 4. Frontend Feature Tasks

Examples:

- Add form validation
- Add modal
- Add tab switching
- Add local state logic
- Add export button
- Add filtering or search
- Add client-side data transformation

Default level:

- B or C

Recommended settings:

- Model: GPT-5.4-Mini for simple features
- Model: GPT-5.4 for multi-file features
- Reasoning: Medium or High
- Speed: Off
- Permissions: Workspace-write after plan
- Context: Relevant component files and data utilities

Notes:

- Ask for target files if unclear.
- Avoid project-wide scan unless necessary.
- Test with existing scripts if available.

## 5. Backend / API Tasks

Examples:

- Add API endpoint
- Connect frontend to API
- Modify request/response logic
- Add input validation
- Fix server error
- Add environment variable handling

Default level:

- C

Recommended settings:

- Model: GPT-5.4
- Reasoning: Medium or High
- Speed: Off
- Permissions: Read-only first, then workspace-write
- Context: API route, client call site, config files

Notes:

- Do not expose secrets.
- Do not print API keys.
- Avoid modifying auth/payment/database logic without risk review.

## 6. Debugging Tasks

Examples:

- Runtime error
- Build error
- Type error
- Broken UI behavior
- Failing test
- Dependency issue

Default level:

- B, C, or D depending on complexity

Recommended settings:

- Clear single-file error: GPT-5.4-Mini + Medium
- Multi-file error: GPT-5.4 + High
- Repeated failure: GPT-5.5 + High
- High-risk error: GPT-5.5 + High or Ultra-high

Notes:

- Start with the error log.
- Do not scan entire project first.
- Read package/config only if relevant.
- Do not reinstall dependencies without confirmation.
- Do not delete lock files unless user confirms.

## 7. Refactor Tasks

Examples:

- Split component
- Rename module
- Clean code
- Improve structure
- Extract utilities
- Replace duplicated logic
- Reorganize folders

Default level:

- C or D

Recommended settings:

- Small refactor: GPT-5.4 + Medium
- Multi-module refactor: GPT-5.5 + High
- Architecture refactor: GPT-5.5 + High or Ultra-high
- Speed: Off
- Permissions: Read-only plan first

Notes:

- Must produce a plan before editing.
- Must identify impacted files.
- Must avoid broad changes without confirmation.
- Must preserve existing behavior.

## 8. Full Project Analysis Tasks

Examples:

- Analyze project structure
- Find technical debt
- Create architecture map
- Identify unused files
- Review code quality
- Generate onboarding guide

Default level:

- C or D

Recommended settings:

- Model: GPT-5.4 or GPT-5.5
- Reasoning: High
- Speed: Off
- Permissions: Read-only
- Context: Start with file tree and key configs

Notes:

- Read file tree first.
- Do not open all files immediately.
- Ask user whether they want broad or focused analysis.
- Summarize before proposing edits.

## 9. Deployment / DevOps Tasks

Examples:

- Vercel deployment
- CI/CD workflow
- Docker config
- Environment variables
- Build pipeline
- Production configuration

Default level:

- D or E

Recommended settings:

- Model: GPT-5.5
- Reasoning: High
- Speed: Off
- Permissions: On-request
- Context: Config files, logs, package scripts

Notes:

- Do not deploy automatically.
- Do not modify secrets.
- Do not change production settings without confirmation.
- Provide rollback plan when necessary.

## 10. Database Tasks

Examples:

- Schema migration
- Query modification
- ORM model change
- Data import/export
- Production data issue

Default level:

- E

Recommended settings:

- Model: GPT-5.5
- Reasoning: High or Ultra-high
- Speed: Off
- Permissions: Read-only first, on-request always
- Context: Schema, migration files, query code

Notes:

- Never run destructive database commands automatically.
- Always require backup and confirmation.
- Distinguish development and production database.
- Provide migration plan and rollback plan.

## 11. Authentication / Security Tasks

Examples:

- Login system
- Password handling
- OAuth
- Session management
- Permissions
- Token storage
- Security audit

Default level:

- E

Recommended settings:

- Model: GPT-5.5
- Reasoning: High or Ultra-high
- Speed: Off
- Permissions: Read-only audit first

Notes:

- Never expose secrets.
- Never log tokens.
- Never weaken security for convenience.
- Must produce risk notes before changes.

## 12. Payment Tasks

Examples:

- Stripe integration
- Checkout flow
- Subscription logic
- Refund handling
- Billing webhook

Default level:

- E

Recommended settings:

- Model: GPT-5.5
- Reasoning: High or Ultra-high
- Speed: Off
- Permissions: On-request
- Context: Payment-related files only

Notes:

- Must be staged.
- Must not alter production payment behavior without explicit confirmation.
- Must explain test mode vs live mode.
- Must protect secret keys.

## 13. AI Workflow / Prompt Engineering Tasks

Examples:

- Create prompt templates
- Build content generation workflow
- Generate SKU listing workflow
- Design video prompt system
- Improve output format
- Build no-code AI workflow spec

Default level:

- A or B

Recommended settings:

- Model: GPT-5.4-Mini
- Reasoning: Medium
- Speed: Off
- Permissions: No project scan unless building files

Notes:

- Usually does not need GPT-5.5.
- Usually does not need high reasoning.
- For actual web implementation, classify as static page or frontend feature.

## 14. High-level Product Planning Tasks

Examples:

- Product roadmap
- MVP plan
- Business analysis
- Feature prioritization
- User persona
- Go-to-market strategy

Default level:

- A or B

Recommended settings:

- Model: GPT-5.4-Mini or GPT-5.4
- Reasoning: Medium
- Speed: Off
- Permissions: No code access required

Notes:

- Do not involve Codex execution unless creating files or prototypes.

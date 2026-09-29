# Risk Checklist

Use this checklist before recommending execution.

## 1. High-risk Categories

A task is high-risk if it involves any of the following:

- Authentication
- Authorization
- Passwords
- Sessions
- Tokens
- API keys
- Secrets
- Payment
- Billing
- Refunds
- Subscription logic
- Database migration
- Production data
- File deletion
- Deployment
- CI/CD
- Infrastructure
- Environment variables
- Permissions
- Security headers
- User data
- Personal information
- Encryption
- Production configuration

## 2. Questions to Ask for High-risk Tasks

Ask only what is needed.

Important questions:

1. Is this development, staging, or production?
2. Is there a backup?
3. Can changes be tested locally first?
4. Are there existing tests?
5. Which files are safe to modify?
6. Should Codex only inspect first?
7. Are any secrets present in logs or files?
8. Is user confirmation required before running commands?
9. Is rollback possible?
10. What should not be changed?

## 3. Mandatory Safeguards

For high-risk tasks, recommend:

- Read-only audit first
- No automatic edits
- No automatic command execution
- No deployment without explicit confirmation
- No database migration without backup
- No secret exposure
- No broad refactor
- No dependency changes unless needed
- No deletion without confirmation
- Staged plan before implementation

## 4. Dangerous Commands

Warn before any command similar to:

```bash
rm -rf
sudo
chmod -R
chown -R
git reset --hard
git clean -fd
npm install
npm update
pnpm update
yarn upgrade
pip install
docker system prune
drop database
truncate table
delete from
prisma migrate deploy
vercel deploy --prod
```

Not all are always forbidden, but they require explanation and user confirmation.

## 5. Secret Handling

Never recommend:

- Printing secrets
- Copying API keys into prompts
- Uploading .env files
- Logging access tokens
- Sharing cookies
- Sharing private keys
- Sharing production credentials

If the user posts secrets, recommend rotating them.

## 6. Database Safety

Before database changes:

- Identify environment
- Confirm backup
- Read schema
- Explain migration
- Provide rollback idea
- Avoid destructive operations
- Test locally or in staging first

## 7. Payment Safety

Before payment changes:

- Distinguish test mode and live mode
- Do not expose secret keys
- Do not change webhook behavior blindly
- Do not alter pricing logic without confirmation
- Recommend testing with sandbox/test cards
- Require user review

## 8. Auth Safety

Before auth changes:

- Do not weaken validation
- Do not bypass permissions
- Do not log tokens
- Do not store passwords insecurely
- Do not remove security checks for convenience
- Explain impact on existing users

## 9. Deployment Safety

Before deployment:

- Build locally if possible
- Check environment variables
- Confirm deployment target
- Confirm branch
- Confirm rollback plan
- Do not deploy production automatically

## 10. File Operation Safety

Require confirmation before:

- Deleting files
- Moving large folders
- Renaming shared modules
- Reformatting entire project
- Changing lock files
- Changing package manager
- Changing build config

## 11. Risk Levels

### Low Risk

- Documentation
- Text edits
- Small CSS
- Static page
- Local-only prototype

### Medium Risk

- Small feature
- Multi-file frontend change
- Local API logic
- Build config reading

### High Risk

- Dependency changes
- Refactor
- Backend logic
- API behavior
- Build pipeline

### Critical Risk

- Production
- Database
- Auth
- Payment
- Secrets
- Deployment
- User data

## 12. High-risk Output Requirement

For high-risk tasks, the final prompt must include:

```text
先不要修改文件。先只读分析并输出风险评估、影响范围、建议执行步骤和需要我确认的信息。
```

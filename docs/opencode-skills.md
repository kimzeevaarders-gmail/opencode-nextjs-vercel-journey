# OpenCode Skills

This project now includes three local OpenCode skills under `.opencode/skills/`.

These skills now support a broader multi-agent workflow with a product-owner agent, a developer agent, and a reviewer agent.

## Included Skills

- `requirements-thinker`: clarifies new requests into requirements, assumptions, risks, and acceptance criteria
- `feature-implementer`: builds approved work in small verified steps
- `change-reviewer`: reviews completed changes for correctness, completeness, and release readiness

## File Locations

- `.opencode/skills/requirements-thinker/SKILL.md`
- `.opencode/skills/feature-implementer/SKILL.md`
- `.opencode/skills/change-reviewer/SKILL.md`

## Suggested Workflow

1. Load `requirements-thinker` when a request is still fuzzy.
2. Load `feature-implementer` after the requirements are clear.
3. Load `change-reviewer` before you call the work finished.

## Notes

- These are project-local skills, so OpenCode can discover them from this repository.
- The skill names match the directory names, which is required by OpenCode skill discovery.
- The matching project agents live in `.opencode/agents/` and are documented in `docs/autonomous-agents.md`.

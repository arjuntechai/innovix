# GitHub Issues & Milestones Tracking Guide for AI Dev Agents

To maintain discipline and clean tracking of our development progress, all tasks and enhancements in this repository must be tracked using GitHub Issues. **Every AI developer agent starting a session or task MUST follow the rules in this guide.**

---

## 1. Project Context
*   **Repository Owner**: `arjuntechai`
*   **Repository Name**: `innovix`
*   **Default Branch**: `main`

---

## 2. Mandatory Workflows & Rules

### Phase 1: Task Initialization (Pre-Implementation)
Before writing any code or making workspace modifications:
1.  **Check for Existing Issues**:
    *   Search the open issues to see if there is an existing issue that matches the task at hand.
    *   *MCP Tool to use*: `github-mcp-server/search_issues` or `github-mcp-server/list_issues` (with `state: "OPEN"`).
2.  **Create Issue if Missing**:
    *   If no matching issue exists, create a new one. Ensure it has a descriptive title, structured description (goals, changes, and verification plan), and appropriate labels.
    *   *MCP Tool to use*: `github-mcp-server/issue_write` with `method: "create"`.
3.  **Assign & Link Milestone**:
    *   Assign the issue to yourself (or ask the user for their username to assign).
    *   Identify the current active Milestone. If the user mentions a milestone or if one exists on related issues, set the `milestone` (number) on the issue.
    *   *MCP Tool to use*: `github-mcp-server/issue_write` with `method: "update"` (or pass these parameters during creation).
4.  **Acknowledge Issue in Chat**:
    *   State the issue number you are working on to the user (e.g., *"Working on issue #12: Add dark mode layout"*).

---

### Phase 2: Implementation & Updates (During Development)
For longer-running or complex tasks:
1.  **Post Progress Comments**:
    *   Post regular updates in the issue comments section detailing what has been implemented, design decisions made, and any encountered blockers.
    *   *MCP Tool to use*: `github-mcp-server/add_issue_comment`.
2.  **Referencing Code**:
    *   When documenting progress, mention exact filenames and symbol names (classes, functions) to maintain documentation integrity.

---

### Phase 3: Integration & Completion (Post-Implementation)
When work is complete and ready for verification/review:
1.  **Create a Pull Request**:
    *   If the development workflow requires a PR, create it.
    *   **CRITICAL**: Include standard GitHub link keywords in the PR description to automatically close the associated issue when merged (e.g., `Closes #123`, `Fixes #123`, or `Resolves #123`).
    *   *MCP Tool to use*: `github-mcp-server/create_pull_request`.
2.  **Close the Issue Directly (If committing directly)**:
    *   If merging/committing directly, close the issue manually. Always specify `state_reason: "completed"`.
    *   *MCP Tool to use*: `github-mcp-server/issue_write` with `method: "update"`, `state: "closed"`, and `state_reason: "completed"`.
3.  **Confirm Milestone Update**:
    *   Verify that the issue has been successfully marked as completed under its assigned Milestone.

---

## 3. GitHub MCP Server Tool Reference & Payloads

To interact with GitHub issues and pull requests, use the `github-mcp-server` MCP server tools. Below are the exact parameter structures you should use:

### A. Searching Issues
Use this to check for duplicates before creating a new issue.
```json
// Tool: github-mcp-server/search_issues
{
  "query": "repo:arjuntechai/innovix state:open type:issue [keywords]"
}
```

### B. Listing Open Issues
Use this to scan active tasks.
```json
// Tool: github-mcp-server/list_issues
{
  "owner": "arjuntechai",
  "repo": "innovix",
  "state": "OPEN"
}
```

### C. Creating a New Issue
Create a tracking issue at the start of a task.
```json
// Tool: github-mcp-server/issue_write
{
  "owner": "arjuntechai",
  "repo": "innovix",
  "method": "create",
  "title": "feat: Implement persistence for user preferences",
  "body": "### Description\nAdd local storage persistence to retain theme preferences.\n\n### Tasks\n- [ ] Create config store helper\n- [ ] Integrate with Header component\n- [ ] Add unit tests",
  "labels": ["enhancement"],
  "assignees": ["arjuntechai"]
}
```

### D. Updating an Issue (e.g. Assigning Milestone or Closing)
Use this to assign milestones or to close the issue upon completion.
```json
// Tool: github-mcp-server/issue_write (Update / Close)
{
  "owner": "arjuntechai",
  "repo": "innovix",
  "method": "update",
  "issue_number": 12,
  "state": "closed",
  "state_reason": "completed"
}
```

### E. Adding Comments to an Issue
Use this to log progress, decisions, or dependencies.
```json
// Tool: github-mcp-server/add_issue_comment
{
  "owner": "arjuntechai",
  "repo": "innovix",
  "issue_number": 12,
  "body": "Completed implementation of local storage hooks in `useLocalStorage.ts`. Moving to component integration now."
}
```

### F. Creating a Pull Request
Use this to propose changes and link them to the issue.
```json
// Tool: github-mcp-server/create_pull_request
{
  "owner": "arjuntechai",
  "repo": "innovix",
  "title": "feat: persist user preferences theme",
  "head": "feature/theme-persistence",
  "base": "main",
  "body": "Implements local storage persistence for user preferences.\n\nCloses #12"
}
```

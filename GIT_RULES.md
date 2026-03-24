# 🚨 NSG SOLUTIONS: OFFICIAL DEVELOPER WORKFLOW 🚨
*Welcome to the team! We are running a strict, enterprise-level architecture to ensure zero merge conflicts and perfectly clean code. Every developer must read and perfectly adhere to these 11 rules.*

### 🛠️ 1. Branch Naming Convention
You are forbidden from committing directly to the `main` branch. When you start your task, you must immediately create a branch tracking your name and your exact task.
*   **Format:** `feature/[your-name]-[task-name]`
*   **Example 1:** `feature/john-client-reviews`
*   **Example 2:** `feature/sarah-portfolio-cards`

### 📁 2. The Folder Isolation Rule
The Project Manager has already generated placeholder pages and folders for you in the repository. You are **ONLY** permitted to type code inside your assigned feature folder.
*   **Rule:** If you are assigned to "Jobs", you may only edit `src/components/jobs/` and `src/pages/CandidateProfilePage.jsx`.
*   **Warning:** If you modify `App.jsx`, `Navbar.jsx`, `index.css`, or another developer's folder, your code will be instantly rejected!

### 🔄 3. The "Morning Sync" Protocol
Merge conflicts happen when your local code gets out of date. You must synchronize your computer with the rest of the team **every single morning** before you code:
1. `git commit -m "saving work"` *(Save your current progress)*
2. `git checkout main`
3. `git pull origin main` *(Download the team's approved updates)*
4. `git checkout [your-feature-branch]` 
5. `git merge main` *(Inject the fresh foundation into your branch safely)*

### 📝 4. Commit Message Standard
We maintain a clean repository. Vague commits are not allowed.
*   **✔ YES:** `"Added 5-star interactive rating UI to ReviewForm"`
*   **✔ YES:** `"Fixed mobile responsiveness on Portfolio grid"`
*   **❌ NO:** `"update"`, `"fixed stuff"`, `"final changes"`

### 📦 5. Restricted Files (`package.json`)
You are **NOT allowed** to run `npm install <package>`. If multiple developers install different packages at the same time, `package.json` will crash the merge.
*   **Rule:** If you desperately need a specific library (e.g., an icon pack or date picker), message the Lead Admin. The Admin will install it on `main`, and you will download it during your Morning Sync!

### ✅ 6. The "Final Check" Before Raising a PR
You cannot pass broken code to the Project Manager. Before you submit your code for review, you must check:
*   [ ] The page is completely functional with no console errors (Press F12 to check).
*   [ ] The page scales perfectly on Mobile, Tablet, and Desktop.
*   [ ] The UI perfectly matches the "NSG Solutions Global UI Design System" (colors, spacing, and hover effects).

### 🚀 7. Pull Request (PR) Policy
When your task is complete, you must raise a Pull Request on GitHub. The PR must include:
*   **Title:** Clear description (e.g., `"Portfolio Page UI Complete"`)
*   **Description:** Bullet points of exactly which components you built.
*   **Screenshots:** Attach images of your finished UI so the Admin can see it immediately.

### 🛑 8. Code Review & Deadlocks
*   **Code Review:** The Lead Admin will review your PR. If your code breaks the UI Guidelines, spacing rules, or hits an unapproved folder, it will be rejected with feedback.
*   **Conflicts:** If you accidentally trigger a massive merge conflict in Git, **DO NOT attempt to force or overwrite code.** Stop typing and inform the Lead Admin immediately so they can safely untangle it.

### 📅 9. Daily Standup Updates
Every developer must push their code to their remote branch daily, even if it is unfinished. 
*   Update your task status (e.g., on Jira/ClickUp).
*   No daily updates = Task is considered inactive.

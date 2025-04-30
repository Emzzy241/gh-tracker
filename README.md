# 📦 gh-tracker

A GitHub Issues and Pull Request tracker CLI tool that helps developers quickly view, filter, and search issues or PRs from the terminal.

---

## 🚀 Purpose

`gh-tracker` provides developers with a **fast**, **intuitive**, and **configurable** command-line interface to interact with GitHub repositories. It helps you stay productive without constantly switching to the browser.

---

## 🎯 Scope

This tool interacts with the **GitHub REST API v3** to:
- Fetch and display issues
- Fetch and display pull requests
- Filter by labels, state, and result count
- Output as pretty tables or JSON
- Use optional authentication for higher API rate limits

> ✨ Writing or editing GitHub issues/PRs is **out of scope** for the initial version.

---

## 🛠️ Tech Stack

- **Node.js**
- [Commander.js](https://github.com/tj/commander.js) – CLI framework
- [Axios](https://axios-http.com) – HTTP requests
- [Chalk](https://github.com/chalk/chalk), [Ora](https://github.com/sindresorhus/ora), [cli-table3](https://github.com/cli-table/cli-table3) – Terminal UX
- GitHub REST API v3

---

## 🔧 Installation

```bash
npm install -g gh-tracker
```

> Or if you’re running locally:

```bash
git clone https://github.com/your-username/gh-tracker.git
cd gh-tracker
npm install
npm link
```

---

## 🧪 Usage

### 🔍 View Issues

```bash
gh-tracker issues nodejs/node
```

### 📂 View Pull Requests

```bash
gh-tracker prs facebook/react --state closed --limit 5
```

### 📌 Filter by Label

```bash
gh-tracker issues nodejs/node --label bug
```

### 🧾 JSON Output

```bash
gh-tracker prs nodejs/node --json
```

---
<!-- 
## 🪪 Authentication (Optional)

You can use a GitHub Personal Access Token for increased API limits.

```bash
gh-tracker config set-token your_token_here
```

The token will be stored locally and attached to future API requests.

--- -->

## 🧰 CLI Options

| Option        | Description                       |
| ------------- | --------------------------------- |
| `--state`     | Filter by issue/PR state          |
| `--label`     | Filter by label                   |
| `--limit`     | Limit number of results           |
| `--json`      | Output raw JSON                   |
| `--version`   | Show CLI version                  |
| `--help`      | Show usage instructions           |

---

## ✅ Features

- [x] List latest open issues of a repo
- [x] List latest pull requests
- [x] Filter by state (`open`, `closed`, `all`)
- [x] Filter by label (e.g., `bug`, `enhancement`)
- [x] Limit number of items returned
- [x] Output as JSON or pretty table
- [x] Save and use GitHub token

---

## 🛣️ Roadmap / TODOs

- [ ] Add pagination support
- [ ] Add search feature
- [ ] Add cached requests for performance
- [ ] Support multiple repo tracking in one command

---

## 📎 Example Output

```bash
gh-tracker issues vercel/next.js --label bug --limit 3
```

```text
┌────┬───────────────────────────────┬──────────────┐
│ #  │ Title                         │ State        │
├────┼───────────────────────────────┼──────────────┤
│ 1  │ Fix hydration issue in 13.4.2 │ open         │
│ 2  │ Memory leak in next dev       │ open         │
│ 3  │ Bug in dynamic routing        │ open         │
└────┴───────────────────────────────┴──────────────┘
```

---

## 🔐 Security

- Tokens are saved to a local config file and not pushed to GitHub.
- Always keep your token private.
- Support for `.env`-based fallback planned.

---

## 📜 License

MIT © Your Name

---

## 🙌 Contributions

PRs are welcome! Please open an issue to discuss changes before submitting.

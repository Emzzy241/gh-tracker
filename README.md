# gh-tracker

A GitHub issues and Pull Request tracker that helps developers quickly view, filter, and search issues or PRs from the terminal.

## Installation

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/gh-tracker.git
cd gh-tracker
```

2. Install dependencies
```bash
npm install
```

3. Link the package to use it from anywhere
```bash
npm link
```

### From npm (Once Published)

```bash
npm install -g gh-tracker
```

## Usage

### Viewing Issues

```bash
# List open issues for a repository
gh-tracker issues nodejs/node

# List closed issues with a specific label
gh-tracker issues facebook/react --state closed --label bug

# Limit the number of results
gh-tracker issues microsoft/vscode --limit 5

# Output as JSON
gh-tracker issues vuejs/vue --json
```

### Viewing Pull Requests

```bash
# List open PRs for a repository
gh-tracker prs nodejs/node

# List closed PRs
gh-tracker prs facebook/react --state closed

# Limit the number of results
gh-tracker prs microsoft/vscode --limit 5

# Output as JSON
gh-tracker prs vuejs/vue --json
```

### Managing Configuration

```bash
# Set GitHub personal access token (for higher rate limits)
gh-tracker config --set-token YOUR_GITHUB_TOKEN

# View current configuration
gh-tracker config --view
```

## GitHub Rate Limits

When using gh-tracker without authentication, GitHub limits API requests to 60 per hour. To increase this limit:

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens)
2. Configure gh-tracker to use your token:
```bash
gh-tracker config --set-token YOUR_GITHUB_TOKEN
```

## Available Options

### Issues and PRs Commands

| Option           | Description                                    | Default |
|------------------|------------------------------------------------|---------|
| `-s, --state`    | Filter by state (open, closed, all)            | open    |
| `-l, --label`    | Filter by label                                | -       |
| `--limit`        | Limit the number of results                    | 10      |
| `--json`         | Output as JSON                                 | false   |

## License

MIT

## Tool Creator
Mojiboye Emmanuel Oluwole (Dynasty)
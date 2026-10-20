# Haxnation Blog

> The official community blog for [Haxnation](https://Haxnation.org) — cybersecurity, development, and community stories.

🌐 **Live Site**: [haxnation.github.io/blog](https://haxnation.github.io/blog/)

---

## 🗂️ Repository Structure

```
blog/
├── .github/
│   └── workflows/
│       ├── validate-pr.yml   # PR authorization + content isolation check
│       └── deploy.yml        # Build & deploy to GitHub Pages
├── blog/
│   ├── authors.yml           # Author profile definitions
│   └── <github-username>/   # Each author's posts (namespaced)
│       └── YYYY-MM-DD-title.md
├── src/
│   └── css/
│       └── custom.css        # Haxnation theme & design tokens
├── static/
│   └── img/                  # Static assets
├── blog-writers.txt          # Authorized writers allow-list
├── docusaurus.config.js      # Site configuration
├── package.json
└── CONTRIBUTING.md           # How to write and submit a post
```

---

## 🔐 Security Model

This repository enforces a **strict review-driven contribution model**:

1. **Direct pushes to `main` are disabled** via branch protection rules
2. All posts must be submitted via **Pull Request from a fork**
3. Automated checks validate:
   - Author is in the **authorized writers list** (trial) or **GitHub Team** (production)
   - All changed files are **under the author's own folder** (`blog/<username>/`)
4. A designated **blog-reviewer** must approve the PR before it can be merged
5. Merged PRs **automatically trigger deployment** to GitHub Pages

---

## 🚀 Deployment

Deployed automatically to [GitHub Pages](https://haxnation.github.io/blog/) on every merge to `main`.

---

## ✍️ Want to Contribute?

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

---

## 🛠️ Local Development

```bash
npm install
npm start        # Start dev server at http://localhost:3000
npm run build    # Production build (output in ./build)
```

---

## 📜 License

Content is © Haxnation contributors. Site infrastructure MIT licensed.

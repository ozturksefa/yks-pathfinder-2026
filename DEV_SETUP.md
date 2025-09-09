# Developer Setup

This project is a Vite + React + TypeScript app using Tailwind and shadcn-ui.

## Requirements

- Node.js 18 or newer (Node 20 LTS recommended)
- npm (bundled with Node)

Optional:
- bun (lockfile present) — we use npm here for consistency (package-lock.json)

## Getting Started

```bash
# 1) Install dependencies (clean, deterministic)
npm ci

# 2) Start the dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview the production build
npm run preview
```

## Recommended Node Setup (macOS)

Use nvm or Homebrew.

With nvm:
```bash
brew install nvm # if not installed
mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"
nvm install 20
nvm use 20
```

With Homebrew only:
```bash
brew install node@20
echo 'export PATH="$(brew --prefix)/opt/node@20/bin:$PATH"' >> ~/.zshrc
exec $SHELL -l
```

## Notes

- Vite 5 requires Node >= 18.
- If you prefer bun, run `bun install` and `bun dev`, but ensure tooling is consistent among contributors.


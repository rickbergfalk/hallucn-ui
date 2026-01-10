# hallucn Installation Test

This directory contains a minimal test project for verifying that hallucn components install correctly via the shadcn CLI.

## Prerequisites

- Node.js 18+
- npm

## Running Tests

### Against Deployed Registry (Production)

```bash
cd test-install
npm install
./test-install.sh
```

### Against Local Registry (Development)

First, start the docs server from the root directory (in a separate terminal):

```bash
# From root directory
npm run docs:dev
```

Then run tests pointing to local registry:

```bash
cd test-install
npm install
REGISTRY_URL=http://localhost:5173/r ./test-install.sh
```

## What the Tests Verify

1. **Component Installation**: Button component installs via direct URL
2. **File Placement**: Files are placed according to `components.json` aliases:
   - Components: `src/components/ui/`
   - Utils: `src/lib/`
3. **Import Paths**: Installed files use `@/lib/utils` alias
4. **TypeScript**: Compilation succeeds with installed components

## Manual Testing

To manually test installation:

```bash
# Direct URL
npx shadcn@latest add https://hallucn-ui.github.io/hallucn-ui/r/button.json

# Via namespace (requires deployed registry)
npx shadcn@latest add @hallucn/button
```

## Configuration

The `components.json` file configures:

- **aliases.ui**: `@/components/ui` - where UI components are installed
- **aliases.utils**: `@/lib/utils` - where utils is installed
- **registries.@hallucn**: hallucn registry URL with `{name}` placeholder

## Cleanup

To reset and run tests again:

```bash
rm -rf src/components src/lib node_modules/.shadcn
./test-install.sh
```

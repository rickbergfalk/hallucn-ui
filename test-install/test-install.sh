#!/bin/bash
set -e

# Registry URL - use local if REGISTRY_URL env var is set
# For local testing: REGISTRY_URL=http://localhost:5173/r ./test-install.sh
# For production: ./test-install.sh (uses deployed registry)
DEFAULT_REGISTRY_URL="https://hallucn-ui.github.io/hallucn-ui/r"
REGISTRY_URL="${REGISTRY_URL:-$DEFAULT_REGISTRY_URL}"

echo "=== hallucn Installation Test ==="
echo "Registry URL: $REGISTRY_URL"
echo ""

# Clean previous test artifacts
echo "Cleaning previous test artifacts..."
rm -rf src/components src/lib node_modules/.shadcn 2>/dev/null || true

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing npm dependencies..."
  npm install
fi

# Test 1: Install button component via direct URL
echo ""
echo "Test 1: Installing button component via direct URL..."
npx shadcn@latest add "${REGISTRY_URL}/button.json" --yes --overwrite

# Verify button.ts exists
if [ -f "src/components/ui/button.ts" ]; then
  echo "  PASS: button.ts installed at src/components/ui/button.ts"
else
  echo "  FAIL: button.ts not found at expected location"
  echo "  Checking what was actually created..."
  find src -name "*.ts" 2>/dev/null || echo "  No .ts files found in src/"
  exit 1
fi

# Verify utils.ts exists
if [ -f "src/lib/utils.ts" ]; then
  echo "  PASS: utils.ts installed at src/lib/utils.ts"
else
  echo "  FAIL: utils.ts not found at expected location"
  exit 1
fi

# Verify import path in button.ts
if grep -q "@/lib/utils" src/components/ui/button.ts; then
  echo "  PASS: Import uses @/lib/utils alias"
else
  echo "  FAIL: Import path incorrect (should use @/lib/utils)"
  grep "from.*utils" src/components/ui/button.ts || true
  exit 1
fi

# Test 2: TypeScript compilation
echo ""
echo "Test 2: Verifying TypeScript compilation..."
if npx tsc --noEmit 2>/dev/null; then
  echo "  PASS: TypeScript compilation successful"
else
  echo "  FAIL: TypeScript compilation failed"
  npx tsc --noEmit
  exit 1
fi

# Test 3: Install via namespace (if registry is deployed)
echo ""
echo "Test 3: Testing namespace installation..."
echo "  (Skipping - requires deployed registry)"

echo ""
echo "=== All Tests Passed! ==="

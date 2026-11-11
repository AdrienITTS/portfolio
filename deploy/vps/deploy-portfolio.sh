#!/usr/bin/env bash
# Copy to ~/stacks/bin/deploy-portfolio.sh on the VPS (chmod +x).
# Only run through the forced command of the GitHub deploy key (~/.ssh/authorized_keys).
set -euo pipefail

APP_DIR=/home/adrien/stacks/portfolio

# With a forced command, sshd puts the requested command here: the image tag.
TAG="${SSH_ORIGINAL_COMMAND:-latest}"

# Never trust a value that comes from the network.
if [[ ! "$TAG" =~ ^[A-Za-z0-9._-]{1,64}$ ]]; then
  echo "Rejected tag: '$TAG'" >&2
  exit 1
fi

echo "==> Deploying portfolio $TAG"
cd "$APP_DIR"
echo "IMAGE_TAG=$TAG" > .env
docker compose pull
docker compose up -d --remove-orphans
docker image prune -f >/dev/null
echo "==> Done: $(docker compose ps --format '{{.Name}} {{.Status}}')"

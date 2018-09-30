#!/bin/bash
certbot certonly --non-interactive --manual \
  --manual-auth-hook "./auth-hook.sh UPSERT findcheeseheads.com" \
  --manual-cleanup-hook "./auth-hook.sh DELETE findcheeseheads.com" \
  --preferred-challenge dns \
  --config-dir "./letsencrypt" \
  --work-dir "./letsencrypt" \
  --logs-dir "./letsencrypt" \
  --agree-tos \
  --manual-public-ip-logging-ok \
  --domains findcheeseheads.com,www.findcheeseheads.com \
  --email john@johnluetke.com
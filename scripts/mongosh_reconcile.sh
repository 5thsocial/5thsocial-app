#!/usr/bin/env bash
set -euo pipefail
: "${MONGODB_URI:=${MONGODB_URI:-mongodb://localhost:27017/5thsocial}}"
echo "[reconcile] using MONGODB_URI=$MONGODB_URI"
mongosh "$MONGODB_URI" scripts/mongodb_schema_v2.mongosh.js

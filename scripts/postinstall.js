#!/usr/bin/env node

// Resolved via Node's normal module lookup (walks up node_modules from this
// file), so it works whether npm hoists go-npm-next to the top-level
// node_modules or nests it under this package — a hardcoded relative path
// like "node_modules/go-npm-next/dist/index.js" only works for the latter.
const { install } = require("go-npm-next/dist/index.js");

install((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Binary installation completed successfully!");
    process.exit(0);
  }
});

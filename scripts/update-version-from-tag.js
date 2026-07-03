#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function updatePackageVersion() {
  try {
    // Get the latest tag
    const { execSync } = require("child_process");
    const tag = execSync("git describe --tags --abbrev=0", { encoding: "utf8" }).trim();

    if (!tag) {
      console.log("No git tags found. Skipping version update.");
      return;
    }

    // Remove 'v' prefix if present
    const version = tag.startsWith("v") ? tag.substring(1) : tag;

    // Read package.json
    const packagePath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

    // Update version
    const oldVersion = packageJson.version;
    packageJson.version = version;

    // Write back to package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

    console.log(`Updated package version from ${oldVersion} to ${version}`);

    // Stage the package.json changes
    execSync("git add package.json", { stdio: "inherit" });
  } catch (error) {
    console.error("Error updating package version from tag:", error.message);
    process.exit(1);
  }
}

updatePackageVersion();

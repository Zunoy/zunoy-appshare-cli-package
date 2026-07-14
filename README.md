# Zunoy Appshare CLI

The official command-line tool for uploading mobile app builds (`.apk`, `.aab`, `.ipa`) to [Zunoy Appshare](https://github.com/Zunoy/zunoy-appshare-cli). Point it at a build artifact, and it validates the file, uploads it, and prints back a shareable URL — locally or as a step in your CI pipeline.

## Features

- Uploads Android (`.apk`, `.aab`) and iOS (`.ipa`) builds
- Validates the file extension and archive format before uploading, so bad paths fail fast with a clear error
- Associates uploads with a specific app via `--app-id`, or does a Quick Release when omitted
- Prints the shareable URL on success and exits non-zero on failure, so it's safe to use as a CI/CD gate
- Ships as a small, dependency-free native binary — no runtime required beyond npm to install it

## Requirements

- Node.js and npm (only needed to install the CLI; the CLI itself is a native binary)
- macOS, Linux, or Windows on amd64/arm64

## Installation

Install the CLI globally with npm:

```bash
npm install -g zunoy-appshare-cli
```

This downloads the prebuilt `appshare` binary for your platform during `postinstall` and puts it on your `PATH`.

Alternatively, run it without a global install using `npx`:

```bash
npx zunoy-appshare-cli ./build/app-release.apk
```

Verify the install:

```bash
appshare help
```

## Authentication

The CLI reads your API key from the `APPSHARE_API_KEY` environment variable. Get a key from your Zunoy Appshare account, then export it in your shell:

```bash
export APPSHARE_API_KEY="your_api_key_here"
```

For CI/CD, set `APPSHARE_API_KEY` as a secret/protected environment variable in your provider (GitHub Actions secret, Bitrise secret, Jenkins credential, etc.) rather than committing it anywhere.

## Usage

```bash
appshare <file-path> [--app-id <appID>]
```

Basic upload:

```bash
export APPSHARE_API_KEY="your_api_key_here"
appshare ./build/app-release.ipa
```

The CLI:

1. Validates that the file exists, has a `.apk`, `.aab`, or `.ipa` extension, and is a valid archive
2. Validates the API key against the server
3. Uploads the file
4. Prints the shareable URL and exits `0` on success, or prints an error and exits non-zero on failure

This makes it suitable for both local use and automated environments like GitHub Actions, Bitrise, or Jenkins.

Running `appshare` with no arguments, or `appshare help`, shows the built-in help text.

### Associating an upload with a specific app

Pass `--app-id` to tag the upload with an app slug:

```bash
appshare ./build/app-release.apk --app-id my-app-slug
```

`--app-id` can appear anywhere in the argument list, and also accepts the `--app-id=my-app-slug` form:

```bash
appshare --app-id=my-app-slug ./build/app-release.apk
```

### Quick Release (no `--app-id`)

`--app-id` is optional. If you omit it, Appshare treats the upload as a **Quick Release** — a one-off release that isn't tied to an existing app in your Appshare account, useful for ad-hoc builds you just want a shareable link for:

```bash
appshare ./build/app-release.apk
```

Pass `--app-id` instead whenever you want the upload to become a new release under an app you already manage in Appshare.

## Options

| Flag | Required | Description |
| --- | --- | --- |
| `<file-path>` | Yes | Path to the build file to upload (`.apk`, `.aab`, or `.ipa`) |
| `--app-id <appID>` | No | Slug of the app to associate this upload with. Omit it to create a Quick Release instead |

| Environment variable | Required | Description |
| --- | --- | --- |
| `APPSHARE_API_KEY` | Yes | Your Zunoy Appshare API key, used to authenticate the upload |

## Available commands

```bash
appshare help    # Show detailed help information
```

## Exit codes

The CLI exits `0` on a successful upload and non-zero if any step fails (missing API key, invalid file, failed validation, or a failed upload). Check the exit code in scripts to gate a pipeline on a successful release:

```bash
appshare ./build/app-release.apk || exit 1
```

## CI/CD examples

### GitHub Actions

```yaml
- name: Upload build to Appshare
  env:
    APPSHARE_API_KEY: ${{ secrets.APPSHARE_API_KEY }}
  run: |
    npx zunoy-appshare-cli ./build/app-release.apk --app-id my-app-slug
```

### Bitrise

Add a **Script** step:

```bash
#!/usr/bin/env bash
set -e
npm install -g zunoy-appshare-cli
appshare "$BITRISE_APK_PATH" --app-id my-app-slug
```

Set `APPSHARE_API_KEY` as a Secret in your Bitrise app's environment variables.

### Jenkins

```groovy
withEnv(["APPSHARE_API_KEY=${env.APPSHARE_API_KEY}"]) {
    sh 'npx zunoy-appshare-cli ./build/app-release.apk --app-id my-app-slug'
}
```

## Troubleshooting

- **`Please add the APPSHARE_API_KEY as an environment variable and try again.`** — the environment variable isn't set in the current shell/CI job. Export it before invoking `appshare`.
- **`invalid file extension`** — the CLI only accepts `.apk`, `.aab`, or `.ipa` files.
- **`invalid file format: not a valid ZIP archive`** — the file exists but isn't a real APK/AAB/IPA (these formats are ZIP archives under the hood). Confirm your build step produced a complete, uncorrupted artifact.
- **`API key invalid`** — double-check the key value and that it hasn't been revoked/rotated.

## Uninstall

```bash
npm uninstall -g zunoy-appshare-cli
```

## Links

- [Source & issues](https://github.com/Zunoy/zunoy-appshare-cli)
- [npm package](https://www.npmjs.com/package/zunoy-appshare-cli)

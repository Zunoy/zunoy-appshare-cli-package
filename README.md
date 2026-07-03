# Zunoy Appshare CLI

The official CLI tool for uploading mobile app builds (`.apk`, `.aab`, `.ipa`) to Zunoy Appshare. It features a polished interactive terminal UI for local use, and a headless mode for CI/CD pipelines.

## Installation

Install the CLI globally using npm:

```bash
npm install -g zunoy-appshare-cli
```

## Usage

### 1. Interactive Mode (Local Development)

Simply run the `appshare` command. You can provide the file path as an argument or enter it when prompted.

```bash
appshare
# or
appshare ./build/app-release.apk
```

If you haven't set your API key as an environment variable, the CLI will prompt you to securely paste it in.

### 2. Headless Mode (CI/CD Pipelines)

For automated environments like GitHub Actions, Bitrise, or Jenkins, you must provide both the API key as an environment variable and the file path as a command-line argument.

```bash
export APPSHARE_API_KEY="your_api_key_here"
appshare ./build/app-release.ipa
```

The CLI will automatically detect that it is running in a non-interactive terminal (headless mode) and upload the file silently, outputting the final shareable URL and exiting with a success/failure code.

## Available Commands

```bash
appshare help    # Show detailed help information
```
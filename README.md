# Zunoy Appshare CLI

The official CLI tool for uploading mobile app builds (`.apk`, `.aab`, `.ipa`) to Zunoy Appshare.

## Installation

Install the CLI globally using npm:

```bash
npm install -g zunoy-appshare-cli
```

## Usage

You must provide both the API key as an environment variable and the file path as a command-line argument.

```bash
export APPSHARE_API_KEY="your_api_key_here"
appshare ./build/app-release.ipa
```

The CLI uploads the file, then outputs the final shareable URL and exits with a success/failure code. This makes it suitable for both local use and automated environments like GitHub Actions, Bitrise, or Jenkins.

Running `appshare` with no arguments shows the help text.

### Associating an Upload with an App

Pass `--app-id` to associate the upload with a specific app. It is optional.

```bash
appshare ./build/app-release.apk --app-id my-app-slug
```

## Available Commands

```bash
appshare help    # Show detailed help information
```
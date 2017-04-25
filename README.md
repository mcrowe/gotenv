# Gotenv

Environment-variable based config for node.

## Description

Gotenv offers a clean, robust, and secure way to configure your node applications. It is based on the following principles:

- Configuration via environment variables is [one honking good idea](https://12factor.net/config)
- Despite what the 12factor doctrine suggests, it is a good a idea to have separate configurations for dev/test environments in your code base
- Required and optional environment variables for an application should be well documented in a conventional place.
- The app should abort and tell you if required environment variables are missing, rather than breaking in unpredictable ways.
- Parsing and validating format of environment variables is the app developer's job

Gotenv:

- Parses a `.env` file for enviroment variables if present
- Parses a `.env.test` file instead if `NODE_ENV=test`
- Validates required enviroment variables, documented in your `package.json` (see below)

## Why not "D"otenv

[Dotenv](https://github.com/motdotla/dotenv) is a great package, and I have borrowed much of its functionality here. I feel that it gets 3 things wrong, though:

1. It does not allow you to specify a separate `.env` file for your test environment. While 12-factor-y, this is very inconvenient. Almost all apps need separate configuration for their dev/test environments, and this should live within the codebase for convenience. Other enviroments like production, staging, qa, etc. should be configured directly via environment variables specified by the enviroment they are running in.

2. It doesn't allow you to overwrite global environment variables in your `.env` files. If you have, say, `PORT=5000` in your `.bashrc` for some reason, then any value you set in your `.env` will be ignored. This bit me when I was setting AWS credentials for my projects.

3. It doesn't validate required enviroment variables, which I believe should be done for all applications.

## Usage

Install it:

> npm install @mcrowe/gotenv --save

Add the following to your `.gitignore`:

```
.env
.env.test
```

Create a `.env.example` file with example environment variables (its OK to check this in to git).

```
CONCURRENCY=3
LOG_LEVEL=debug
SERVICE_URL=
```

Have each developer copy `.env.example` to `.env` and set their own custom enviroment variables. This file should *not* be commited to git.

Add an "env" section to your `package.json`, specifying your environment variables.

```
"env": {
  "required": {
    "SERVICE_URL": "URL for the super service",
    "CONCURRENCY": "Number of concurrent workers to run",
  },
  "optional": {
    "LOG_LEVEL": "Log level [debug, info, error] (defaults to 'info')",
  }
}
```

Import or require this module at the top of your program:

```
// ES6
import '@mcrowe/gotenv'

// ES5
require('@mcrowe/gotenv')
```

Or, require it when invoking node:

```
node -r @mcrowe/gotenv src/index.js
```

## Development

Install npm modules:

> npm install

Run tests:

> npm test

## Release

Release a new version:

> bin/release.sh

This will publish a new version to npm, as well as push a new tag up to github.

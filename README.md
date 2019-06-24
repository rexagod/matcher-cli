# [`matcher-cli`](/): CLI utility for [`matcher-core`](https://github.com/publiclab/matcher-core)

[![Build Status](https://travis-ci.org/publiclab/matcher-cli.svg?branch=ci-ops)](https://travis-ci.org/publiclab/matcher-cli) ![LICENCE](https://img.shields.io/badge/license-GNU--General--Public--License--v3.0-green.svg)

## Description

A Node-based CLI utility for headlessly testing custom matcher-core configurations, this module eases any development process on the matcher-core library by allowing the user to run a set of commands on their locally puppeteer-deployed Chromium environment in a headless manner, i.e., right from the CLI, without the need to open the browser whatsoever, be it testing, demonstration, debugging issues, etc.

`matcher-cli` enables headless support for all of these tasks, and can easily integrate with your choice of CI to automate any of the above tasks right inside your CI. For more details on automating tasks and cross-posting to different sites (including issues and PRs on GitHub), checkout the [`ci-ops`](https://github.com/publiclab/matcher-cli/tree/ci-ops) branch of this repository.  

## Interactive Demonstration

```sh
$ bash <(curl -s https://gist.githubusercontent.com/rexagod/6e1a2cfdc18e1b12ff8d64b5d4e6985a/raw/e5cf33c9bb2427f25d8394d0e007cabc40a8a5da/cli-demo.sh)
```

## Installation

* Clone this repository: `git clone git@github.com:publiclab/matcher-cli.git`.
* Navigate inside the repository and `npm i`.
* Run `npm start` to get started!

## Building from source

* Currently, `npm run build`ing inside the repository will initiate two build commands, namely,
	* `npm run build:lint`: Runs [ESLint](https://eslint.org/) and fixes all "fixable" linting errors, otherwise reports them.
	* `npm run build:terser`: Runs [Terser](https://xem.github.io/terser-online/) and creates a minified source file, [`matcher.unc.min.js`](/matcher.unc.min.js).
* After the build script above exits successfully, you may test out your modifications by `npm start`ing.
* Remember to always build the source code before submitting a PR!

## Codeflow
 
Points are stated according in order of occurrence of their code segments.

* [`matcher.js`](/matcher.js) (entry point)
	* Checks for user's environment. Default environment is set to `DEV`, and can be changed to `PROD` for the end-user.
	* Initializes Vorpal, the helper library used for different customized operations inside the CLI.
	* Checks validity of the input arguments, and fetches appropriate data using [`vorpalify`](/matcher.js#L27-L39) helper function.

* [`src/matcher-commands.js`](/src/matcher-commands.js)
	* Consists of all non-algorithmic commands (such as update and clear) and is a valid point for additional of newer external commands. However, it is strongly recommended that you create an external file with your command functions, and `require` those inside this file **to add custom user-defined commands**.
	* Collects all command references from different locations, and exports them to the entry point. Be sure to `module.export` your command if you plan on adding a custom one.

* [`src/matcher-summon.js`](/src/matcher-summon.js)
	* Essentially consists of a single IIFE, named [`summoner`](/src/matcher-summon.js#L7-L13) that calls on the following functions.
		* [`initiateServer`](/src/matcher-summon.js#L15-L26): [`exec`](/src/matcher-summon.js#L16-L24)utes a [live-server](https://www.npmjs.com/package/live-server) query, as specified in [`utils/matcher-init-query.js`](/utils/matcher-init-query.js), and deploys a local server under the given constraints. This server will act as the target for setting up our headless Chromium environment to run the commands on. Additional parameters can be found in [`.env_vars.json`](/.env_vars.json).
		* [`invoke`](/src/matcher-summon.js#L28-L68): Parent of algorithmic commands' (such as matches and corners) closures. Also, initializes puppeteer-specific-port in our deployed server, after which, it performs a number of **asynchronous headless operations** on the page, along with some synchronous validations. Returns all the [`matches`](/src/matcher-summon.js#L46-L55) and [`corners`](/src/matcher-summon.js#L37-L45) found to the [`summoner`](/src/matcher-summon.js#L7-L13).

* [`src/matcher-updater.js`](/src/matcher-updater.js)
	* Checks the user's version against the current release version.
	* If a mismatch is found, updates dependencies, and the minified source file.
	* Originally designed to incorporate an "independent updation system" into the repository to ward off any inconveniences that the non-technical users might face during synchronizing with the latest release, such as git and npm commands, etc.

* [`utils/`](/utils)
	* Consists of minor helper functions for frequent usage throughout the codebase.
	* [`./matcher-init-query`](/utils/matcher-init-query.js) consists of the [`live-server`](https://www.npmjs.com/package/live-server) query command.
	* [`./matcher-pings`](/utils/matcher-pings.js) consists of helper functions for printing on the console.

## LICENSE

[BSD-2-Clause](/LICENSE)

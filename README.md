<p>
  <a href="https://aurelia.io/" target="_blank">
    <img alt="Aurelia" src="https://aurelia.io/styles/images/aurelia.svg">
  </a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm Version](https://img.shields.io/npm/v/aurelia-metadata.svg)](https://www.npmjs.com/package/aurelia-metadata)
[![Discourse status](https://img.shields.io/discourse/https/meta.discourse.org/status.svg)](https://discourse.aurelia.io)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Twitter](https://img.shields.io/twitter/follow/aureliaeffect.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=aureliaeffect)

[![Backers on Open Collective](https://opencollective.com/aurelia/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/aurelia/sponsors/badge.svg)](#sponsors)
[![Discord Chat](https://img.shields.io/discord/448698263508615178.svg)](https://discord.gg/RBtyM6u)

# aurelia-metadata

This library is part of the [Aurelia](http://www.aurelia.io/) platform and contains utilities for reading and writing the metadata of JavaScript functions. It provides a consistent way of accessing type, annotation and origin metadata across a number of languages and formats. This library supports TypeScript metadata and contains helper functions that understand several simple, alternate locations and formats for metadata which are more easily leveraged by developers authoring code in plain ES6 or ES5.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.aurelia.io/) and [our email list](http://eepurl.com/ces50j). We also invite you to [follow us on twitter](https://twitter.com/aureliaeffect). If you have questions, please [join our community on Gitter](https://gitter.im/aurelia/discuss) or use [stack overflow](http://stackoverflow.com/search?q=aurelia). Documentation can be found [in our developer hub](http://aurelia.io/hub.html).

## Platform Support

This library can be used in the **browser** as well as on the **server**.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) version 12+ is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

	```shell
	npm ci
	```
3. To build the code, you can now run:

	```shell
	npm run build
	```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js`, or `package.json` (`scripts` section) for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. You can now run the tests with this command:

	```shell
	npm run test
	```

If you want to run the test in watch mode, you can run this command:

```shell
npm run test:watch
```

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      "test/**/*.ts",
      "src/**/*.ts",
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript",
    },
    reporters: ["progress", "karma-typescript"],
    karmaTypescriptConfig: (() => {
      /**@type {import('karma-typescript').KarmaTypescriptConfig} */
      const options = {
        bundlerOptions: {
          entrypoints: /\.spec\.ts$/
        },
        compilerOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          module: "commonjs",
          sourceMap: true,
          target: "ES2015",
          lib: ['es2015', 'dom'],
        },
        exclude: ["node_modules"]
      };
      return options;
    })(),

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

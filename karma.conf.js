var webpack = require("webpack");
module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            // all files ending in "test"
            'test/test.js',
            'src/**/*.js'

            // each file acts as entry point for the webpack configuration
        ],

        // frameworks to use
        frameworks: ['mocha'],

        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'test/test.js': ['webpack'],
            'src/**/*.js': ['coverage']
        },

        reporters: ['spec', 'junit', 'coverage'],


        junitReporter: {
            outputDir: 'build/junit/',
            outputFile: 'test-results.xml',
        },

        coverageReporter: {
            dir: 'build/coverage/',
            includeAllSources: true,
            reporters: [
                {type: 'html'},
                {type: 'text'},
                {type: 'text-summary'}
            ]
        },

        webpack: {

            
            // webpack configuration
            module: {
                loaders: [
                    {test: /\.css$/, loader: "style!css"},
                    {test: /\.less$/, loader: "style!css!less"}
                ],
                postLoaders: [{
                    test: /\.js/,
                    exclude: /(test|node_modules|bower_components)/,
                    loader: 'istanbul-instrumenter'
                }]
            },

            webpackMiddleware: {
                noInfo: true
            },
            
            resolve: {
                modulesDirectories: [
                    "",
                    "src",
                    "node_modules"
                ]
            }
        },



        plugins: [
            require("karma-webpack"),
            require("istanbul-instrumenter-loader"),
            require("karma-mocha"),
            require("karma-coverage"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-junit-reporter")
        ],

        coverageReporter: {
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },

        browsers: ['ChromeNoSandbox'],
        customLaunchers: {
            ChromeNoSandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    });
};

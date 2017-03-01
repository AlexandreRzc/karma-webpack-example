var webpack = require("webpack");
module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            // all files ending in "test"
            'test/Example/*.js'

            // each file acts as entry point for the webpack configuration
        ],

        // frameworks to use
        frameworks: ['mocha'],

        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'test/Example/*.js': ['webpack']
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
            node : {
                fs: 'empty'
            },
            
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

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
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
        
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,        

        browsers: ['ChromeNoSandbox'],
        customLaunchers: {
            ChromeNoSandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    });
};

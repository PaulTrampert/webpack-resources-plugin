var WebpackResourcesPlugin = require('../webpack-resources-plugin.js');
var sampleStats = require('./sampleStats.json');
var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    savePath: './testResults',
    consolidateAll:false
});
jasmine.getEnv().addReporter(junitReporter);

describe('webpack-resources-plugin', function() {
    var subject;
    var stats;
    var compiler;

    beforeEach(function () {
        stats = jasmine.createSpyObj('stats', ['toJson']);
        stats.toJson.and.returnValue(sampleStats);

        compiler = {
            hooks: {
                done: {
                    tap: jasmine.createSpy('tap')
                }
            }
        };
    });

    describe('Constructor', function () {
        it('sets fileName correctly when options are provided.', function () {
            subject = new WebpackResourcesPlugin({fileName: './somefile.json'});
            expect(subject.fileName).toEqual('./somefile.json');
        });

        it('sets fileName correctly when empty options are provided', function () {
            subject = new WebpackResourcesPlugin({});
            expect(subject.fileName).toEqual('./WebpackResources.json');
        });

        it('sets fileName correctly when no options are provided', function () {
            subject = new WebpackResourcesPlugin();
            expect(subject.fileName).toEqual('./WebpackResources.json');
        });

        it('creates a function called exportResources', function() {
            subject = new WebpackResourcesPlugin();
            expect(subject.exportResources).toEqual(jasmine.any(Function));
        });
    });

    describe('apply', function() {
        beforeEach(function () {
            subject = new WebpackResourcesPlugin();
        });

        it('plugs into the compilers "done" event', function () {
            subject.apply(compiler);
            expect(compiler.hooks.done.tap).toHaveBeenCalledWith('WebpackResourcesPlugin', jasmine.any(Function));
        });
    });

    describe('exportStats', function () {
        beforeEach(function () {
            subject = new WebpackResourcesPlugin();
        });

        it('outputs the mapping of resources to publicPaths and hashes', function() {
            subject.exportResources(stats);
            var result = require('../WebpackResources.json');
            expect(result.webpackResources['index.js']).toBeDefined();
            expect(result.webpackResources['index.js'].fileName).toEqual('/dist/index.js');
            expect(result.webpackResources['index.js'].hash).toEqual('5b9d7015457dd508bd4e');
        });
    });
});
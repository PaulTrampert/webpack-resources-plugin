var fs = require('fs');

class WebpackResourcesPlugin {
    constructor(options) {
        const defaultFileName = './WebpackResources.json';
        if (options) {
            this.fileName = options.fileName || defaultFileName;
        }
        else {
            this.fileName = defaultFileName;
        }

        this.exportResources = this.exportResources.bind(this);
        this.apply = this.apply.bind(this);
    };

    exportResources(stats) {
        let expandedStats = stats.toJson();
        let result = {
            webpackResources: {}
        };
        for (let chunk of expandedStats.chunks) {
            for (let file of chunk.files) {
                result.webpackResources[file] = {
                    fileName: expandedStats.publicPath + file,
                    hash: chunk.hash
                }
            }
        }
        fs.writeFileSync(this.fileName, JSON.stringify(result));
    }

    apply(compiler) {
        compiler.hooks.done.tap('WebpackResourcesPlugin', this.exportResources);
    }
}
module.exports = WebpackResourcesPlugin;
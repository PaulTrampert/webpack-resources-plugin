var fs = require('fs');

class WebpackResourcesPlugin {
    constructor(options) {
        const defaultFileName = './WebpackResources.json';
        const self = this;
        if (options) {
            self.fileName = options.fileName || defaultFileName;
        }
        else {
            self.fileName = defaultFileName;
        }

        self.exportResources.bind(self);
        self.apply.bind(self);
    };

    exportResources(stats) {
        const self = this;
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
        fs.writeFileSync(self.fileName, JSON.stringify(result));
    }

    apply(compiler) {
        const self = this;
        compiler.hooks.done.tap('WebpackResourcesPlugin', self.exportResources);
    }
}
module.exports = WebpackResourcesPlugin;
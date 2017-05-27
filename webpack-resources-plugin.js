var fs = require('fs');

function DotnetResourcesPlugin(options) {
    const defaultFileName = './WebpackResources.json';
    const self = this;
    if (options) {
        self.fileName = options.fileName || defaultFileName;
    }
    else {
        self.fileName = defaultFileName;
    }
};

DotnetResourcesPlugin.prototype.exportResources = function (stats) {
    const self = this;
    let expandedStats = stats.toJson();
    let result = {};
    for(let chunk of expandedStats.chunks) {
        for(let file of chunk.files) {
            result[file] = {
                fileName: expandedStats.publicPath + file,
                hash: chunk.hash
            }
        }
    }
    fs.writeFileSync(self.fileName, JSON.stringify(result));
}

DotnetResourcesPlugin.prototype.apply = function(compiler) {
    const self = this;
    compiler.plugin('done', function(stats) {
        self.exportResources(stats);
    });
}

module.exports = DotnetResourcesPlugin;
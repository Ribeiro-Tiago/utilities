module.exports = {
    mode: "production",
    entry: "./src/utilities.ts",
    output: {
        filename: "index.js"
    },
    resolve: {
        extensions: ["ts"]
    },
    module: {
        rules: [{
            loader: "ts-loader"
        }]
    }
};
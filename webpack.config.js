module.exports = {
    mode: "production",
    entry: "./src/utilities.ts",
    output: {
        filename: "index.js",
        path: __dirname
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
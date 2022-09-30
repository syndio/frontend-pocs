const path = require('path');
const deps = require('./package.json').dependencies;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { outputConfig, copyPluginPatterns, entryConfig, devServer } = require("./env.config");

module.exports = (env, options) => 
{
    return {
        cache: true,
        mode: options.mode,
        entry: entryConfig,
        devServer,
        // Dev only
        // Target must be set to web for hmr to work with .browserlist
        // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
        target: "web",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    // include: path.resolve(__dirname, 'src'),
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: "javascript/auto",
                    loader: "file-loader",
                    options: {
                        publicPath: "../",
                        name: "[path][name].[ext]",
                        context: path.resolve(__dirname, "src/assets"),
                        emitFile: false,
                    },
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: "javascript/auto",
                    exclude: /images/,
                    loader: "file-loader",
                    options: {
                        publicPath: "../",
                        context: path.resolve(__dirname, "src/assets"),
                        name: "[path][name].[ext]",
                        emitFile: false,
                    },
                },
            ],
        },
        resolve: { extensions: [".tsx", ".ts", ".js", ".jsx"] },
        /* output: {
            filename: "js/[name].bundle.js",
            path: path.resolve(__dirname, outputConfig.destPath),
            publicPath: "",
        }, */
        plugins: [
            new ModuleFederationPlugin({
                name: 'UI',
                filename: 'remoteEntry.js',
                exposes: {
                    './Button': './src/components/ui/Button/Button',
                    './Callout': './src/components/ui/Callout/Callout',
                    './Tabs': './src/components/ui/Tabs/Tabs',
                    //'./Header': './src/Layout/Header/Header',
                    //'./Sidebar': './src/Layout/Sidebar/Sidebar',
                    //'./Main': './src/Layout/Main/Main',
                    './Layout': './src/Layout',
                },
                remotes: {
                    libs: `libs@http://localhost:3333/remoteEntry.js`,
                },
                shared: [
                    {
                      ...deps,
                      react: {
                        // eager: true,
                        singleton: true,
                        requiredVersion: deps.react,
                      },
                      'react-dom': {
                        // eager: true,
                        singleton: true,
                        requiredVersion: deps['react-dom'],
                      },
                      tailwindcss: {
                        // eager: true,
                        singleton: true,
                        requiredVersion: deps['tailwindcss'],
                      },
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                inject: true,
                minify: false
            }),
            new CopyPlugin(copyPluginPatterns),
        ]
    };
};
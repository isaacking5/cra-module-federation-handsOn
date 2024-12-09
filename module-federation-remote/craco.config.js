const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = () => ({
  devServer: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      "Cross-Origin-Resource-Policy": "cross-origin"
    }
  },
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
        globalObject: "self"
      }
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "firstRemoteEntry",
          filename: "remoteEntry1.js",
          exposes: {
            "./App": "./src/App.js"
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"]
            }
          }
        })
      ]
    },
    rules: {
      add: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.worker\.(js|ts)$/,
          use: {
            loader: "worker-loader",
            options: {
              filename: "static/js/[name].[contenthash].worker.js",
              publicPath: "auto" // Ensures the worker path resolves correctly
            }
          }
        }
      ]
    }
  }
});

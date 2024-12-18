const { ModuleFederationPlugin } = require("webpack").container

const deps = require("./package.json").dependencies

module.exports = () => ({
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
    port: 3001,
  },
  webpack: {
    configure: {
      output: {
        publicPath: "/",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "hostApplication",
          filename: "hostApplication.js",
          remotes: {
            NxtmockPlatform:
              "NxtmockPlatform@http://localhost:3002/remoteEntry-0.1.2.js",
            firstRemoteEntry:
              "firstRemoteEntry@http://localhost:3000/remoteEntry1.js",
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
})

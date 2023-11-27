const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: {
          host: "127.0.0.1",
          protocol: 'http:',
          port: 8000
        },
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
    }
  },
})

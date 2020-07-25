module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080/recite',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
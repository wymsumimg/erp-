// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');
module.exports = {
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 autoprefixer(),
    //                 pxtorem({
    //                     rootValue: 192, //基准值(计算公式：设计图宽度/10)，设计图尺寸为750X1134(iPhone6)，基准值为750/10=75
    //                     propList: ['*']
    //                 })
    //             ]
    //         }
    //     }
    // },
    publicPath: './',
    outputDir: "dist", // 输出文件目录
    lintOnSave: false, // eslint 是否在保存时检查
    assetsDir: 'static', // 配置js、css静态资源二级目录的位置  
    devServer: {
        open: true,
        host: '0.0.0.0',//localhost
        port: 8080,
        https: false,
        disableHostCheck: true,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        // proxy: {//配置跨域
        //     '/api': {
        //         target: 'https://api.wfjar.com/APi/',//这里后台的地址模拟的;应该填写你们真实的后台接口
        //         ws: true,
        //         changOrigin: true,//允许跨域
        //         pathRewrite: {
        //             '^/api': ''//请求的时候使用这个api就可以
        //         }
        //     }

        // }

    },

    configureWebpack: (config) => {
        config.entry.app = ['babel-polyfill', './src/main.js'];
        config.performance = {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    transpileDependencies: [/[/\\]node_modules[/\\](.+?)?relation-graph(.*)/] //依赖中es6转es5




}
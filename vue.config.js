module.exports = {
    devServer: {
        port: 7778
    },
    runtimeCompiler: true,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'ar',
            localeDir: 'locales',
            enableInSFC: false
        }
    }
}

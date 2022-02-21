module.exports = {
    devServer: {
        port: 7778
    },
    runtimeCompiler: true,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'ru',
            localeDir: 'locales',
            enableInSFC: false
        }
    }
}

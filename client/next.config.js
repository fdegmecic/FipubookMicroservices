module.exports = {
    webpackDevMiddleware: (config) => {
        config.watchOptions.poll = 300;
        return config;
    },
    images: {
        domains: [
            "i.imgur.com",
            "res.cloudinary.com",
            "links.papareact.com",
            "platform-lookaside.fbsbx.com",
            "firebasestorage.googleapis.com",
        ]
    }
};
const { createServer } = require("vite");

(async () => {
    const server = await createServer({
        // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
        configFile: "vite.config.js",
        root: "./",
        server: {
            port: 3000,
        },
    });
    await server.listen();

    server.printUrls();
})();

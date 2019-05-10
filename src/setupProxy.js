module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://localhost:8002/",
      pathRewrite: {
        "^/api/": "/"
      }
    })
  );
};

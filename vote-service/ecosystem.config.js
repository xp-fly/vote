module.exports = {
  apps : [{
    name: "vote-service",
    script: "./dist/main.js",
    env: {
      NODE_ENV: "PRODUCTION",
    }
  }]
}

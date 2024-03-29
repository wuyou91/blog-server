module.exports = {
  apps : [
    {
      "name": "blog-server",
      "script": "./app.js",
      "watch": false,
      "max_memory_restart": "800M",
      "error_file" : "./logs/error.log",
      "out_file"   : "./logs/out.log",
      "env_development": {
        "NODE_ENV": "development"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ]
}
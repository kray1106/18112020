module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : '18112020',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development',
      },
      env_production : {
        NODE_ENV: 'production'
      },
      watch: true,
      watch_options: {
        "followSymlinks": true,
        "usePolling": true,
        "interval": 100
      },
      "max_restarts": 5,
      "instances": 1,
      "exec_mode": "cluster"
    },
  ]
};

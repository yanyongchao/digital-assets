module.exports = {
  apps: [
    {
      name: 'digital-server',
      script: 'dist/index.js',
      cwd: '/Users/yanyongchao/Documents/dreame/digital/digital/packages/digital-server',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

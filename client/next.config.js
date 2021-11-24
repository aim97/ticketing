module.exports = {
  webpackDevMiddleware: config => {
    //* this is added to solve next problem with automatic reload during development
    //* we are not using it yet, since no problem occured
    //* but it is a good practice to keep it, however we are returning the config as is for now
    //! the server needs to be restarted after this change
    // config.watchOptions = {
    //   poll: 1000,
    //   aggregateTimeout: 300,
    //   ignored: /node_modules/
    // }
    return config
  }
}
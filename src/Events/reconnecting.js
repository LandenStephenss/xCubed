class reconnecting {
  constructor(client) {
    this.log = client.logger
  }
  run() {
    this.log.debug("xCubed is reconnecting...");
  }
}

module.exports = reconnecting;

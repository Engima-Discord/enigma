const { Event } = require("../classes.js");

class ReadyEvent extends Event {
  constructor(client) {
    super(client, { name: "ready", emitter: client, emit: "once" });
  }
  async run() {
    console.log(`${this.client.user.tag} is ready`);
  }
}

module.exports = ReadyEvent;

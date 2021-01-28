const { Command } = require("../classes.js");

class BotbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "botban",
      description: "Ban a user from using the bot",
      aliases: []
    });
  }
  async run(message, args) {
    
  }
}

module.exports = BotbanCommand;

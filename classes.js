const { Client, Collection, Intents } = require("discord.js");
const Emitter = require("events");

class EnigmaClient extends Client {
  constructor(options) {
    options.ws = { intents: Intents.ALL };
    super(options);
    
    this.commands = new Collection();
  }
}

class Command {
  constructor(client, { name, description = "", aliases = [] }) {
    if (!client) throw new Error("Commands must have a client property");
    if (!client instanceof EnigmaClient)
      throw new TypeError("Command client must be instance of EnigmaClient");
    this.client = client;

    if (!name) throw new Error("Commands must have a name");
    if (typeof name != "string")
      throw new TypeError("Command name must be String");
    this.name = name;

    if (typeof description != "string")
      throw new TypeError("Command description must be String");
    this.description = description;

    if (!aliases instanceof Array || !aliases.every(e => typeof e == "string"))
      throw new TypeError("Command aliases must be an Array of String");
    this.aliases = aliases;
  }
}

class Event {
  constructor(client, { name, emitter = client, emit = "on" }) {
    if (!client) throw new Error("Events must have a client property");
    if (!client instanceof EnigmaClient)
      throw new TypeError("Event client must be instance of EnigmaClient");
    this.client = client;

    if (!name) throw new Error("Events must have a name");
    if (typeof name != "string")
      throw new TypeError("Event name must be String");
    this.name = name;

    if (!emitter instanceof Emitter)
      throw new TypeError("Event emitter must be instance of event emitter");
    this.emitter = emitter;

    if (typeof emit != "string" || !["on", "once"].some(e => e == emit))
      throw new TypeError(
        "Event emit must be either 'on' or 'once' (type string)"
      );
    this.emit = emit;
  }
}

module.exports = {
  EnigmaClient,
  Command,
  Event
};

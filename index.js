const { EnigmaClient } = require("./classes.js");
const req = require("require-all");

const client = new EnigmaClient({ fetchAllMembers: true });
client.login(process.env.bot_token);

// listen to events dynamically
const events = req(`${__dirname}/events`);
for (let event of Object.values(events)) {
  if (typeof event != "function") continue;
  event = new event(client);
  event.emitter[event.emit](
    event.name,
    async (...args) => await event.run(...args).catch(console.error)
  );
}

// load commands dynamically
const commands = req(`${__dirname}/commands`);
for (let command of Object.values(commands)) {
  if (typeof command != "function") continue;
  command = new command(client);
  if (client.commands.has(command.name))
    throw new Error(`Command with name, ${command.name} is already loaded`);
  client.commands.set(command.name, command);
}

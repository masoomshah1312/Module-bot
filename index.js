const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
if (!fs.existsSync(configPath)) {
  console.error('[-] CRITICAL ERROR: config.json file is missing from your project directory!');
  process.exit(1);
}
let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const client = new Client();

const context = {
  PREFIX: config.DEFAULT_PREFIX || '*',
  mockCaseMode: config.DEFAULT_MOCK_CASE !== undefined ? config.DEFAULT_MOCK_CASE : true,
  cloneDelayMs: config.CLONE_DELAY_MS || 1500,
  interfaceDeleteMs: config.INTERFACE_AUTO_DELETE_MS || 3000,
  ghostMsgMode: false,
  targetUserIds: new Set(),
  spyTargetIds: new Set(),
  alertKeywords: new Set(),
  textAliases: new Map(),
  alertLogChannelId: null,
  logChannelId: null,
  activeEmoji: null,
  reactTargetId: null,
  messageMap: new Map(),
  client: client,

  saveActiveRpcState(stateName) {
    config.LAST_ACTIVE_RPC = stateName;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  },

  async sendResponse(message, content) {
    try {
      return await message.edit(content);
    } catch (err) {
      await message.delete().catch(() => {});
      const slowmodeSeconds = message.channel.rateLimitPerUser || 0;
      if (slowmodeSeconds > 0) {
        await new Promise(resolve => setTimeout(resolve, (slowmodeSeconds * 1000) + 100));
      }
      return await message.channel.send(content);
    }
  },
  
  applyWordReplacements(text, authorId, myId) {
    let output = text;
    if (myId && authorId) {
      const myIdRegex = new RegExp(`<@!?${myId}>|${myId}`, 'g');
      output = output.replace(myIdRegex, `<@${authorId}>`);
    }
    output = output.replace(/\bfuck me\b/gi, 'fuck you')
                   .replace(/\bme\b/gi, 'you')
                   .replace(/\bmy\b/gi, 'your')
                   .replace(/\bmine\b/gi, 'yours')
                   .replace(/\bi am\b/gi, 'you are')
                   .replace(/\bi'm\b/gi, "you're");
    return output;
  },
  toMockCase(text) {
    return text.split('').map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())).join('');
  }
};

const commands = new Map();
const backgroundHandlers = []; // 👈 THIS MAKES IT MODULAR! Holds passive loops from files dynamically.

context.commands = commands;
// Allows new modules to push background rules down without editing index.js
context.registerBackgroundHandler = (handlerFn) => {
  backgroundHandlers.push(handlerFn);
};

const modsPath = path.join(__dirname, 'mods');
const commandFiles = fs.readdirSync(modsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(modsPath, file));
  if (command.name) commands.set(command.name, command);
  // If the file contains a background trigger, load it instantly!
  if (typeof command.initBackground === 'function') {
    command.initBackground(context);
  }
}

client.on('ready', () => {
  console.log(`[+] Modular selfbot configuration manager loaded!`);
  console.log(`[+] System fully active and online as: ${client.user.tag}`);

  const savedState = config.LAST_ACTIVE_RPC || 'clear';
  if (savedState !== 'clear') {
    const rpcModule = commands.get('rpc');
    if (rpcModule) {
      const dryArgs = savedState.startsWith('custom:') ? [savedState.slice(7)] : ['template', savedState];
      rpcModule.execute(null, dryArgs, context).catch(() => {});
    }
  }
});

client.on('messageCreate', async (message) => {
  // 1. DYNAMIC BACKGROUND RUNNER (Executes ALL module passive behaviors blindly)
  for (const handler of backgroundHandlers) {
    try {
      await handler(message);
    } catch (err) {
      console.error('[-] Background Module loop failure:', err.message);
    }
  }

  // 2. COMMAND HANDLING
  if (message.author.id === client.user.id) {
    if (!message.content.startsWith(context.PREFIX)) return;

    const args = message.content.slice(context.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const cmd = commands.get(commandName);
    if (cmd) {
      try {
        await cmd.execute(message, args, context);

        if (context.ghostMsgMode && commandName !== 'status' && commandName !== 'purge') {
          setTimeout(async () => {
            await message.delete().catch(() => {});
          }, context.interfaceDeleteMs);
        }
      } catch (err) {
        console.error(`[-] Execution Error inside module (${commandName}):`, err);
      }
      return;
    }
  }
});

// Passive deletion listeners linked straight to core context maps
client.on('messageDelete', async (deletedMessage) => {
  if (deletedMessage.author && context.targetUserIds.has(deletedMessage.author.id)) {
    const myEchoedMessageId = context.messageMap.get(deletedMessage.id);
    if (myEchoedMessageId) {
      try {
        const myMsg = await deletedMessage.channel.messages.fetch(myEchoedMessageId);
        if (myMsg) await myMsg.delete();
      } catch (err) {
      } finally {
        context.messageMap.delete(deletedMessage.id);
      }
    }
  }
});

client.login(config.TOKEN);

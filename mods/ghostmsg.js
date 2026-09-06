module.exports = {
  name: 'ghostmsg',
  async execute(message, args, context) {
    const subCommand = args[0] ? args[0].toLowerCase() : null;

    if (subCommand === 'off') {
      context.ghostMsgMode = false;
      await message.edit('🟢 Command interface cleanup disabled.').catch(() => {});
      return;
    }

    context.ghostMsgMode = true;
    await message.edit('👻 Command interface cleanup activated! Menus will auto-delete in 3 seconds.').catch(() => {});
  }
};

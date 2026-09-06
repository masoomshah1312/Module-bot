module.exports = {
  name: 'statuscycle',
  category: 'Status',
  async execute(message, args, context) {
    const subCommand = args[0] ? args[0].toLowerCase() : null;

    if (subCommand === 'off') {
      if (context.colorCycleInterval) {
        clearInterval(context.colorCycleInterval);
        delete context.colorCycleInterval;
        await message.client.user.setStatus('online');
        await message.edit('🟢 Profile color status cycler deactivated.').catch(() => {});
      } else {
        await message.edit('❌ No profile color state loops are currently active.').catch(() => {});
      }
      return;
    }

    if (context.colorCycleInterval) {
      clearInterval(context.colorCycleInterval);
    }

    await message.edit('⚡ Profile color status loop cycling activated...').catch(() => {});

    const colorStates = ['online', 'idle', 'dnd'];
    let sequencePointer = 0;

    context.colorCycleInterval = setInterval(async () => {
      try {
        await message.client.user.setStatus(colorStates[sequencePointer]);
        sequencePointer = (sequencePointer + 1) % colorStates.length;
      } catch (err) {
        console.error('[-] Color status packet fail:', err.message);
      }
    }, 10000);
  }
};

module.exports = {
  name: 'alias',
  category: 'Settings',
  async execute(message, args, context) {
    // If you type '*alias clear', wipe your entire dictionary mapping clean
    if (args[0] && args[0].toLowerCase() === 'clear') {
      context.textAliases = new Map();
      await context.sendResponse(message, '🧹 Text alias dictionary flushed and cleared.');
      return;
    }

    const shortcutWord = args[0];
    const expansionText = args.slice(1).join(' ');

    if (!shortcutWord || !expansionText) {
      await context.sendResponse(message, `❌ Format: \`${context.PREFIX}alias <trigger> <full_text>\` (e.g., \`${context.PREFIX}alias ;git https://github.com\`)`);
      return;
    }

    // Fallback dictionary map creation if not loaded during boot iterations
    if (!context.textAliases) context.textAliases = new Map();
    
    // Save your new shorthand mapping sequence
    context.textAliases.set(shortcutWord.toLowerCase(), expansionText);
    await context.sendResponse(message, `📝 Saved alias shortcut! Typing \`${shortcutWord}\` will now auto-expand dynamically.`);
  }
};

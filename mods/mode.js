module.exports = {
  name: 'mode',
  category: 'Troll',
  async execute(message, args, context) {
    context.mockCaseMode = !context.mockCaseMode;
    await message.edit(`[+] Mock Case Mode: ${context.mockCaseMode ? 'ON' : 'OFF'}`).catch(() => {});
  }
};

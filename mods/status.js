module.exports = {
  name: 'status',
  category: 'Misc',
  async execute(message, args, context) {
    console.log(`[i] Active Mock Targets:`, Array.from(context.targetUserIds));
    console.log(`[i] Mock Case Mode: ${context.mockCaseMode ? 'ON' : 'OFF'}`);
    console.log(`[i] Active Spy Radar Tracking IDs:`, Array.from(context.spyTargetIds));
    await message.delete().catch(() => {});
  }
};

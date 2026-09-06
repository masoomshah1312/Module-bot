module.exports = {
  name: 'verify',
  category: 'Misc',
  async execute(message, args, context) {
    // 1. Scan loaded command registry map
    const totalCommands = context.commands ? context.commands.size : 0;
    const commandList = context.commands ? Array.from(context.commands.keys()) : [];

    // 2. Scan active background monitoring states
    const activeStates = [];
    
    if (context.targetUserIds && context.targetUserIds.size > 0) {
      activeStates.push(`• **Mock Repetition:** Active tracking on \`${context.targetUserIds.size}\` user(s)`);
    }
    if (context.spyTargetIds && context.spyTargetIds.size > 0) {
      activeStates.push(`• **Spy Radar Document Logs:** Active capturing on \`${context.spyTargetIds.size}\` target(s)`);
    }
    if (context.textAliases && context.textAliases.size > 0) {
      activeStates.push(`• **Shorthand Text Aliases:** \`${context.textAliases.size}\` macro shortcut(s) loaded`);
    }
    if (context.alertKeywords && context.alertKeywords.size > 0) {
      activeStates.push(`• **Keyword Alerts Hook:** Monitoring \`${context.alertKeywords.size}\` word(s)`);
    }
    if (context.afkReasonMessage) {
      activeStates.push(`• **AFK Auto-Responder:** ON (Reason: *${context.afkReasonMessage}*)`);
    }
    if (context.typingInterval) {
      activeStates.push('• **Ghost Typing State Loop:** Active');
    }
    if (context.statusRotationInterval) {
      activeStates.push('• **Status Line Rotator Loop:** Active');
    }
    if (context.colorCycleInterval) {
      activeStates.push('• **Status Indicator Orb Cycler:** Active');
    }
    if (context.reactTargetId && context.activeEmoji) {
      activeStates.push(`• **Targeted Emoji Reactions:** Active tracking on ID \`${context.reactTargetId}\` with ${context.activeEmoji}`);
    }

    // 3. Compile report
    let diagnosisReport = 
      `🛡️ **--- WORKSPACE DIAGNOSTICS CONFIGURATION ---**\n\n` +
      `📊 **Module File Engine:**\n` +
      `• Total structural files loaded completely: \`${totalCommands}\` modules\n` +
      `• Command mappings: \`${commandList.join(', ')}\`\n\n` +
      `⚙️ **Active Runtime Core Tasks:**\n`;

    if (activeStates.length > 0) {
      diagnosisReport += activeStates.join('\n');
    } else {
      diagnosisReport += `• \`No background automation processes running right now. System is resting.\``;
    }

    await context.sendResponse(message, diagnosisReport);
  }
};

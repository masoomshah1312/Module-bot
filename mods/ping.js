module.exports = {
  name: 'ping',
  category: 'General',
  async execute(message, args, context) {
    const localStartTime = Date.now();
    
    // First edit tells the API to process a request packet
    await context.sendResponse(message, 'Calculating system latency... 📡');
    
    // Calculate difference between start time and response arrival time
    const roundTripLatency = Date.now() - localStartTime;
    const gatewayWebsocketPing = Math.round(message.client.ws.ping);

    await context.sendResponse(
      message,
      `🏓 **PONG**\n` +
      `• **API Latency:** \`${roundTripLatency}ms\`\n` +
      `• **Websocket Ping:** \`${gatewayWebsocketPing}ms\``
    );
  }
};

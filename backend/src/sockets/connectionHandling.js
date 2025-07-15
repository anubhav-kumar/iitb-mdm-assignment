function connectionHandling(wss) {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

}

export default connectionHandling;

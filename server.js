import { WebSocketServer } from 'ws';

// WebSocketサーバーを立ち上げる処理
// 接続を待ち受ける入り口になる
const wss = new WebSocketServer({ port: 3001 });
console.log('WebSocket server -> ws://localhost:3001');

// クライアントがサーバーに接続した時に呼ばれるイベント
// socketはそのクライアント専用の通路
wss.on('connection', (socket) => {
  // ブラウザが新しく接続してきた！という意味
  console.log('client connected');

  // その特定のクライアント(socket)からメッセージを受け取った時の処理
  socket.on('message', (data) => {
    // wss.clientsは接続している全てのクライアント一覧
    // 接続している各ブラウザ（socket）を順に取り出す
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) {
        // 接続可能なクライアントに対して、サーバー側から順にデータを送信する
        client.send(data);
      }
    }
  });

  socket.on('close', () => {
    console.log('client disconnected');
  });
});
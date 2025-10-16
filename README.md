## 全体像
- client：実際に接続してきたブラウザやアプリ
- socket(またはws)：接続が確立したあとにできる「一本の通信線」みたいなもの
- WebSocketServer(WSS)：サーバー本体(クライアントの接続を受け付ける側)

ブラウザ(client) ----[socket通信線]----> サーバー(wss)

       │                                 │
       │ connect()                       │
       ├──────────────▶ wss.on('connection')
       │                                 │
       │ message("hi")                   │
       ├──────────────▶ socket.on('message')
       │                                 │
       │ <────────────── socket.send("hello back")
       │                                 │
1. ブラウザ(client)がサーバーにnew WebSocket("ws://localhost:3001")で接続開始
2. サーバー側のwss.on('connection')が発火　→　socketオブジェクトができる
→ まだ何もデータはきてなくて、「線がつながったよ」というイベントだけ
3. その後、クライアントがws.send('こんにちは')を送るとsocket.on('message')が発火して「通路を通ったデータ」を受け取る

```ts
if (client.readyState === client.OPEN)
```
各クライアント(=socketオブジェクト)は「通信状態」を持っている
- CONNECTING(0)：通信確立中(まだ確立していない)
- OPEN(1)：通信可能
- CLOSING(2)：通信終了処理中
- CLOSED(3)：通信終了

特定のクライアント(例.タブA)がサーバーにメッセージを送る
↓
サーバーは、「受け取ったよ」と認識した上で、接続中のすべてのクライアントに対して同じメッセージを送信する
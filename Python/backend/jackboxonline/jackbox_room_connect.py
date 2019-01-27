from websocket import create_connection

ws = create_connection("wss://i-09bebd33c0dffd309.jackboxgames.com:38203/socket.io/1/websocket/9Le-DwQin9vhHPLT8Ef-")
print("Sending 'Hello, World'...")
ws.send("Hello, World")
print("Sent")
print("Receiving...")
result = ws.recv()
print("Received '%s'" % result)
ws.close()

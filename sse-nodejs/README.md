# Server-Sent Events (SSE) POC
This is a basic proof-of-concept of using SSE with Node.js as the backend server and React as the frontend client. 

## Installation
```
cd sse-server
npm install
cd sse-client
npm install
```

## Running it
To run, you need three terminal windows. 

### Terminal #1: Event streams server
```
cd sse-server
node index.js
```

### Terminal #2: Open HTTP connection to listen for new event updates
```
cd sse-server
curl -H Accept:text/event-stream http://localhost:3030/events
```

### Terminal #3: React app
```
cd sse-client
npm start
```

Now you can visit the app: http://localhost:3001/ (Port might be different for you)

### Terminal #4: Post new messages to the server
Now, you can post messages to the backend by doing a CURL POST:

```
cd sse-server
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"message": "Hello world", "type": "salutation"}'\
 -s http://localhost:3030/fact
```

Now every time you make the CURL request you should see the React app update with all the messages posted so far. You will also see the same messages in terminal #2:

```
❯ curl -H Accept:text/event-stream http://localhost:3030/events
data: [{"message":"Hello world","type":"salutation"}]
```


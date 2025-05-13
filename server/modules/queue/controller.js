import { router } from '../../router.js';
import { Worker } from 'worker_threads';
import { Server } from 'socket.io';

const requestQueue = [];

const io = new Server(8080, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const clients = new Set();

io.on('connection', (socket) => {
  clients.add(socket);
  
  socket.on('disconnect', () => {
    clients.delete(socket);
  });
});

const worker = new Worker('./modules/queue/worker.js');

worker.on('message', (result) => {
  clients.forEach(client => {
    client.emit('result', result);
  });
});

const processQueue = () => {
  if (requestQueue.length > 0) {
    const request = requestQueue.shift();
    worker.postMessage(request);
  }
  setTimeout(processQueue, 100);
};

processQueue();

router.post('/api/queue/request', (req, res) => {
  const requestId = Date.now().toString();
  
  requestQueue.push({
    id: requestId,
    data: req.body
  });

  res.json({ 
    status: 'pending',
    requestId 
  });
});

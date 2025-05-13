import { parentPort } from 'worker_threads';

parentPort.on('message', async (request) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  parentPort.postMessage({
    id: request.id,
    result: 'result'
  });
});

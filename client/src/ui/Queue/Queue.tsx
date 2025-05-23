import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import config from '../../config';

type QueueResult = {
  [key: string]: string;
}

const Queue: React.FC = () => {
  const [results, setResults] = React.useState<QueueResult>({});
  const ws = React.useRef<Socket | null>(null);

  React.useEffect(() => {
    ws.current = io(config.api.wsUrl);

    ws.current.on('result', (result: { id: string; result: string }) => {
      setResults(prev => ({
        ...prev,
        [result.id]: result.result,
      }));
    });

    const makeRequests = async () => {
      for (let i = 0; i < 20; i++) {
        const response = await fetch(`${config.api.baseUrl}/api/queue/request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ index: i })
        });
        const data = await response.json();
        setResults((prev) => ({
          ...prev,
          [data.requestId]: 'pending',
        }));
      }
    };

    makeRequests();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Queue Status</h2>
      <div className="grid grid-cols-4 gap-4">
        {Object.values(results).map((result, index) => (
          <div 
            key={index}
            className="border p-4 rounded shadow"
          >
            <div className="font-bold mb-2">Request {index + 1}</div>
            <div>{result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;

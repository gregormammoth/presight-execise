import * as React from 'react';
import { io, Socket } from 'socket.io-client';

type QueueResult = {
  [key: string]: string;
}

const Queue: React.FC = () => {
  const [results, setResults] = React.useState<QueueResult>({});
  const ws = React.useRef<Socket | null>(null);

  React.useEffect(() => {
    ws.current = io('http://localhost:8080');

    ws.current.on('result', (result: { id: string; result: string }) => {
      setResults(prev => ({
        ...prev,
        [result.id]: result.result,
      }));
    });

    const makeRequests = async () => {
      for (let i = 0; i < 20; i++) {
        const response = await fetch('http://localhost:3001/api/queue/request', {
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
      <div className="grid grid-cols-3 gap-4">
        {Object.values(results).map((result, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="font-semibold text-gray-800">Request {index + 1}</div>
            <div>{result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;

import React from 'react';

import { Queue, Text, Users } from './ui';
import './index.css';

const App: React.FC = () => {
  return (
    <div className='grid grid-cols-3'>
      <div className="h-screen overflow-y-auto">
        <Users/>
      </div>
      <div className="h-screen overflow-y-auto">
        <Text/>
      </div>
      <div className="h-screen overflow-y-auto">
        <Queue/>
      </div>
    </div>
  );
};

export default App;

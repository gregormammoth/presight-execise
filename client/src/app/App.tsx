import React from 'react';

import { Queue, Text, Users } from './ui';
import './index.css';

const App: React.FC = () => {
  return (
    <div className='grid grid-cols-3'>
      <Users/>
      <Text/>
      <Queue/>
    </div>
  );
};

export default App;

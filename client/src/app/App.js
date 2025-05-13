
import React from 'react';

import { Text, Users } from './ui';
import './index.css';

const App = () => {
  return (
    <div className='grid grid-cols-3'>
      <Users/>
      <Text/>
      <div>col 3</div>
    </div>
  );
};

export default App;


import React from 'react';

import { Users } from './ui';
import './index.css';

const App = () => {
  return (
    <div className='grid grid-cols-3'>
      <Users/>
      <div>col 2</div>
      <div>col 3</div>
    </div>
  );
};

export default App;

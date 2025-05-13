// Create an api that responds with long text (`faker.lorem.paragraphs(32)`)

import { router } from '../../router.js';
import { faker } from '@faker-js/faker';

router.get('/api/text/paragraphs', (req, res) => {
  const text = faker.lorem.paragraphs(32);
  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  let index = 0;
  const streamText = () => {
    if (index < text.length) {
      res.write(text[index]);
      index++;
      setTimeout(streamText, 10);
    } else {
      res.end();
    }
  };

  streamText();
});

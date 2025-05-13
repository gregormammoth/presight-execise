// Create an api that responds with long text (`faker.lorem.paragraphs(32)`)

import { router } from '../../router.js';
import { faker } from '@faker-js/faker';

router.get('/api/text/paragraphs', (req, res) => {
  const text = faker.lorem.paragraphs(32);
  res.send(text);
});

import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { readFile } from 'fs/promises';
import path from 'path';

import { Hono } from 'hono'

const app = new Hono()

app.use('/', serveStatic({ path: './index.html' }))
app.use('/post1', serveStatic({ path: './post1.html' }))
app.use('/post2', serveStatic({ path: './post2.html' }))
app.get('/post3', async (c) => {
  const currentDir = path.resolve();
  const file = await readFile(path.join(currentDir, 'post3.html'), 'utf8')
  await sleep(2000)
  return c.html(file)
})

serve(app)

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

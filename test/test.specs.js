import test from 'ava'

test('bonjour toot', async t => {

  const mockServer = require('mockttp').getLocal()
  mockServer.start(8080)
  await mockServer.get('/hello').thenReply(200, JSON.stringify({mocked: 'response'}))

  const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill')
  let controller = new AbortController()
  let signal = controller.signal 
  
  global.fetch = abortableFetch(require('node-fetch')).fetch
  
  try {
    let prom = global.fetch('http://localhost:8080/hello', {signal})
    controller.abort()
    let resp = await prom
  } catch(error) {
    console.log('error********', error.name)    
    t.is(error.name, 'AbortError')
  }
  
  mockServer.stop()
})
// Step 1: Test this in browser... and error message gets thrown
async function someFunction() {

  let controller = new AbortController()
  let signal = controller.signal  

  fetch('http://localhost:8080', {signal})
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
    })

  controller.abort()
}

async function delayedPromise() {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 5000, 'foo');
  })
}
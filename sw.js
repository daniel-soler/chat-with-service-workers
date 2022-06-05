
self.addEventListener("message", evt => {
  
  self.clients.matchAll().then((clients) => {
    
    clients.forEach((client) => {
      if ( client.id != evt.source.id ) client.postMessage(evt.data)
    });
    
  })
  
})
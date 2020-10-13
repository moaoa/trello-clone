self.addEventListener('push', event => {
  
  

  // Notification.requestPermission().then(res => console.log(res))
  console.log('permission: ', Notification.permission);
  console.log('check Context : ', self.isSecureContext);
  
  const data = event.data.json()
  console.log('New notification', data)
  const options = {
    body: data.body,
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );


  })

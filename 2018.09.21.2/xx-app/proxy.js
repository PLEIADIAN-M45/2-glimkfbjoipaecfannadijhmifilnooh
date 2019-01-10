  var obj = new Proxy({}, {
      get: function(target, key, receiver) {
          console.log(`getting ${key}!`);
          return Reflect.get(target, key, receiver);
      },
      set: function(target, key, value, receiver) {
          console.log(`setting ${key}!`);
          return Reflect.set(target, key, value, receiver);
      }
  });

  console.log(obj);

  //var proxy = new Proxy(target, handler);

  var proxy = new Proxy({}, {
      get: function(target, property) {
          console.log(target, property);
          return 35;
      }


  });

  proxy.time // 35
  proxy.name // 35
  proxy.title // 35


  var proxy = new Proxy({}, {
      get: function(target, key, receiver) {


      },
      set: function(target, key, value, receiver) {
          console.log(`setting ${key}!`);
          return Reflect.set(target, key, value, receiver);
      }
  });
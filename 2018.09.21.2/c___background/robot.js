 switch (ACTION) {
     case "getmodel--":
         console.log(request);
         var unique = [request.sendData.account, request.channel].toUnique();
         var user = await this.user.get(unique);
         if (user.module) { return }
         if (user.status[0] == user.status[1]) { return }
         user.module = (user.status[0] == 3) ? "authorize" : "suspended"
         user.status.push(request.respData.f_ishow)
         user.permit.push(request.respData.f_depositStatus)
         user.timing.push(request.timeSpan)
         user.timing.timeDiff();
         //if(user.status[0] == 3) { user.module = "authorize"; } else { user.module = "suspended"; }
         this.user.put(user);
         console.log(user);
         break;
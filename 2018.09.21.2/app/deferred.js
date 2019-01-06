 //return { $defUser };

 $('#result').html('waiting...');

 var promise = wait();

 promise.done(result);

 function result() {
     $('#result').html('done');
 }

 function wait() {
     var deferred = $.Deferred();
     setTimeout(function() {
         deferred.resolve();
     }, 2000);
     return deferred.promise();
 }
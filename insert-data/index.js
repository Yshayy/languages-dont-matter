var azure = require('azure-storage');
require('dotenv').config()

const url ="https://testdqd.queue.core.windows.net";
var queueService = azure.createQueueServiceWithSas(url, process.env.SAS_TOKEN);
queueService.messageEncoder = new azure.QueueMessageEncoder.TextBase64QueueMessageEncoder();
for (let i=0; i<1; i++){
queueService.createMessage('test', JSON.stringify({
    "batteryLevel": 50,
    "ownerEmail": "yshayy@mailniator.com"
}) , function(error, b) {
  if (error) {
      console.error(error);
    // Message inserted
  }
  else{
      console.log("queue message");
  }
})
};
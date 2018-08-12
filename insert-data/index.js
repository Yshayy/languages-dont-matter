var azure = require('azure-storage');
require('dotenv').config()

var queueService = azure.createQueueServiceWithSas(process.env.STORAGE_ACCOUNT_URL, process.env.SAS_TOKEN);
queueService.messageEncoder = new azure.QueueMessageEncoder.TextBase64QueueMessageEncoder();
for (let i=0; i<1; i++){
queueService.createMessage('languages-dont-matter-anymore', JSON.stringify({
    "batteryLevel": 50,
    "ownerEmail": "languages-dont-matter-anymore@mytrashmail.com"
    //"ownerEmail": "languages-dont-matter-anymore@mailinator.com"
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
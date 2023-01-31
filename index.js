const express = require('express')
const app = express()
const {WebhookClient} = require('dialogflow-fulfillment');

app.get('/webhook', function (req, res) {
  res.send('webhook')
})

app.post('/webhook',express.json() ,function (req, res) {
    
        const agent = new WebhookClient({ request:req, response:res });
        console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
        console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
       
        function welcome(agent) {
          agent.add(`Welcome to my agent!`);
        }
       
        function fallback(agent) {
          agent.add(`I didn't understand`);
          agent.add(`I'm sorry, can you try again?`);
        }

        function PRobandowebhook(agent) {
            agent.add(`webhook answer`);
            
          }
      
        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcome);
        intentMap.set('Default Fallback Intent', fallback);
        intentMap.set('PRobandowebhook', PRobandowebhook);
        // intentMap.set('your intent name here', yourFunctionHandler);
        // intentMap.set('your intent name here', googleAssistantHandler);
        agent.handleRequest(intentMap);

});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");

});
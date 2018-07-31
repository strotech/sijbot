/** This is a sample code for your bot**/
var dataTable =  []  ;
var sum=0;
function MessageHandler(context, event) {
    
    context.console.log("test")
    if(event.message.toLowerCase() == "hi") {
        context.sendResponse("Welcome to Daily expense Manager");
    }
    
    else if(event.message.toLowerCase().startsWith("add ")){
        
        
        if(event.message != null){
            var entrySet=event.message.split(" ");
            
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            var today = dd+'-'+mm+'-'+yyyy;
      
            
            var date=today;
            var item=entrySet[1];
            var value=entrySet[2];
            
           // insert into json object
           dataTable.push({date: date,item: item, value: value});
          
        }
        context.sendResponse("Data has been saved");
    }else if(event.message.toLowerCase().startsWith("get ")){
            
            
            
                var getSet=event.message.split(" ");
                var getItem=getSet[1];
                var getDate=getSet[2];
                //fetch from json object
               
                for(var i = 0; i < dataTable.length; i++) {
                    if(getDate==dataTable[i].date  &&  getItem==dataTable[i].item){
                        sum+=parseInt(dataTable[i].value);
                        
                    }
                
                }
                
                
            
            context.sendResponse("Total expense incurred is "+sum); 
          
            sum=0;
            
    }else{
            context.sendResponse("sorry, i didnt get that");
        }
        
}
    

/** Functions declared below are required **/
function EventHandler(context, event) {
    if(! context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;
    context.sendResponse("Thanks for adding me. You are:" + numinstances);
}

function HttpResponseHandler(context, event) {
    // if(event.geturl === "http://ip-api.com/json")
    context.sendResponse(event.getresp);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}

function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
}
onmessage = function(VARS){
    try{
        var vars = VARS.data;
        alphabetUpper = "abcdefghijklmnopqrstuvwxyz";
        alphabetLower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(vars.k == ""){
            
        }
    }catch(err){
        
    }
}

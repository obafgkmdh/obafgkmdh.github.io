importScripts('biginteger.js');
function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function caesar(text, key){
    alphabetUpper = "abcdefghijklmnopqrstuvwxyz";
    alphabetLower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    caesared = "";
    for(var i = 0; i < text.length; i++){
        if(alphabetUpper.search(text[i]!==-1)){
            caesared+=alphabetUpper[(alphabetUpper.search(text[i])+key)%alphabetLower.length];
        }else if(alphabetLower.search(text[i]!==-1)){
            caesared+=alphabetLower[(alphabetLower.search(text[i])+key)%alphabetLower.length];
        }else{
            caesared+=text[i];
        }
    }
    return caesared;
};
onmessage = function(VARS){
    try{
        var vars = VARS.data;
        alphabetUpper = "abcdefghijklmnopqrstuvwxyz";
        alphabetLower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(isNaN(parseInt(vars.k))){
            for(var i = 0;i<26;i++){
                write("Decrypted message found: "+caesar(vars.c,i))
            }
        }else if(parseInt(vars.k)){
            write("Decrypted message found: "+caesar(vars.c,parseInt(vars.k)))
        }
    }catch(err){
        
    }
}

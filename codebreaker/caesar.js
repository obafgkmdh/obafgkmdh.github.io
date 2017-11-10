importScripts('biginteger.js');
function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function caesar(text, key){
    key=bigInt(key);
    alphabetLower = "abcdefghijklmnopqrstuvwxyz";
    alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    caesared = "";
    for(var i = 0; i < text.length; i++){
        if(alphabetUpper.search(text[i])!==-1){
            caesared+=alphabetUpper[(bigInt(alphabetUpper.search(text[i])).plus(key)).mod(bigInt(alphabetUpper.length)).valueOf()];
        }else if(alphabetLower.search(text[i])!==-1){
            caesared+=alphabetLower[(bigInt(alphabetLower.search(text[i])).plus(key)).mod(bigInt(alphabetLower.length)).valueOf()];
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
            write("Guessing key... ");
            for(var i = 0;i<26;i++){
                write("Decrypted message found: "+caesar(vars.c,i),1);
            }
            write("END");
        }else if(parseInt(vars.k)){
            write("Decrypted message found: "+caesar(vars.c,parseInt(vars.k)),1);
            write("END");
        }
    }catch(err){
        
    }
}

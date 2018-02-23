importScripts('biginteger.js');
function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function xor(text, key, e){
    
};
onmessage = function(VARS){
    try{
        var vars = VARS.data;
        if(vars.k){
            write(!vars.e?"Decrypted message found: ":"Encrypted message: "+xor(vars.c,vars.k,vars.e),1);
            write("END");
        }else{
            write("END");
        }
    }catch(err){
        write("END");
    }
}

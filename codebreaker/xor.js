importScripts('biginteger.js');
function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function xor(text, key, e){
    t="";k="";a="";
    if(text.length>key.length){t=text;k=key.repeat(Math.ceil(text.length/key.length)).substr(0,text.length)}
    for(var i = 0;i < t.length;i++){a+=String.fromCharCode(t[i].charCodeAt(0)^k[i].charCodeAt(0));}
    return a;
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

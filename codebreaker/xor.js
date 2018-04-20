importScripts('biginteger.js');
function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function xor(text, key, e){
    t="";k="";a="";
    if(text.length>key.length){t=text;k=key.repeat(Math.ceil(text.length/key.length)).substr(0,text.length)}
    else{t=text;k=key;}
    if(e=="xia"){
        for(var i = 0;i < t.length;i++){a+=String.fromCharCode(t[i].charCodeAt(0)^k[i].charCodeAt(0));}
    }
    if(e=="xih"){
        t = t.toLowerCase();
        if(!/[0-9a-f]+/.test(t)){return "Not valid hexadecimal!"}
        for(var i = 0;i < t.length;i++){a+="0123456789abcdef"[parseInt(t[i],16)^parseInt(k[i],16)];}
    }
    if(e=="xib"){
        if(!/[0-1]+/.test(t)){return "Not valid binary!"}
        for(var i = 0;i < t.length;i++){a+=""+((+t[i])^(+k[i]));}
    }
    return "Message: "+a;
};
onmessage = function(VARS){
    try{
        var vars = VARS.data;
        if(vars.k){
            write(xor(vars.c,vars.k,vars.e),1);
            write("END");
        }else{
            write("No key provided!")
            write("END");
        }
    }catch(err){
        write("END");
    }
}

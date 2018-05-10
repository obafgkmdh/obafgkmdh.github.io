importScripts('biginteger.js');

async function sha(message, h) {

    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest(h, msgBuffer);
    
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function hash(text, e, hash){
    var a="";
    if(e==="e"){
        switch(hash){
            case "sha1":
                (async function(){a=await sha(text, 'SHA-1');}());
            break;
            case "sha256":
                (async function(){a=await sha(text, 'SHA-256');}());
            break;
            case "sha384":
                (async function(){a=await sha(text, 'SHA-384');}());
            break;
            case "sha512":
                (async function(){a=await sha(text, 'SHA-512');}());
            break;
            default:
                a = "Hash type not supported."
        }
    }else{
        a = "'Decryption' of hashes is not supported."
    }
    while(a==""){}
    return a;
};
onmessage = function(VARS){
    try{
        var vars = VARS.data;
        if(vars.h && vars.e){
            write("Message: "+hash(vars.c,vars.e,vars.h),1);
            write("END");
        }else{
            write("Please provide a hash type and an encryption/decryption mode!")
            write("END");
        }
    }catch(err){
        write("END");
    }
}

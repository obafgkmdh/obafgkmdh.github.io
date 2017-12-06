importScripts('biginteger.js');
function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function caesar(text, key){ // it's basically just caesar
    alphabetLower = "abcdefghijklmnopqrstuvwxyz";
    alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    a=key;key=[];
    for(var i = 0;i<a.length;i++){
        if(alphabetUpper.search(a[i])!==-1){
            key.push(alphabetUpper.search(a[i]));
        }else if(alphabetLower.search(a[i])!==-1){
            key.push(alphabetLower.search(a[i]));
        }else{
            key.push(0);
        }
    }
    caesared = "";
    for(var i = 0; i < text.length; i++){
        if(alphabetUpper.search(text[i])!==-1){
            caesared+=alphabetUpper[(bigInt(alphabetUpper.search(text[i])).plus(key[i%key.length])).mod(bigInt(alphabetUpper.length)).valueOf()];
        }else if(alphabetLower.search(text[i])!==-1){
            caesared+=alphabetLower[(bigInt(alphabetLower.search(text[i])).plus(key[i%key.length])).mod(bigInt(alphabetLower.length)).valueOf()];
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
            write("Guessing key... <br>");
            for(var i = 0;i<26;i++){
                write("Decrypted message found: "+caesar(vars.c,i),1);
                write("<br>");
            }
            write("END");
        }else if(parseInt(vars.k)){
            write("Decrypted message found: "+caesar(vars.c,vars.e?parseInt(vars.k):-parseInt(vars.k)),1);
            write("END");
        }
    }catch(err){
        write("END");
    }
}

var webWorkersSupported = false;
function getCookie(cname) { // thanks w3schools
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
function run(){
    var res = document.getElementById("result");
    res.innerHTML="Results:<br>";
    var type1 = document.getElementById("t").value;
    var type2 = document.getElementById("t2").value;
    if(type1=="d"){
        if(webWorkersSupported){
            switch(type2){
                case "rsa":
                    RSA = new Worker('rsa.js');
                    RSA.postMessage({
                        n:document.getElementById("rn").value,
                        e:document.getElementById("re").value,
                        c:document.getElementById("rc").value,
                        d:document.getElementById("rd").value,
                        p:document.getElementById("rp").value,
                        q:document.getElementById("rq").value
                    });
                    RSA.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            RSA.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "c":
                    C = new Worker("caesar.js");
                    C.postMessage({
                        c:document.getElementById("c").value,
                        k:document.getElementById("k").value, 
                        e:false
                    });
                    C.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            C.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "v":
                    V = new Worker("vigenere.js");
                    V.postMessage({
                        c:document.getElementById("c").value,
                        k:document.getElementById("k").value, 
                        e:false
                    });
                    V.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            V.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "x":
                    X = new Worker("xor.js");
                    X.postMessage({
                        c:document.getElementById("c").value,
                        k:document.getElementById("k").value, 
                        e:document.querySelector('input[name="xi"]:checked').value
                    });
                    X.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            X.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "h":
                    H = new Worker("hash.js");
                    H.postMessage({
                        c: document.getElementById("c").value,
                        h: document.getElementById("k").value,
                        e: false
                    });
                    H.onmessage = function(e) {
                        var data = e.data;
                        if(data=="END"){
                            H.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
            }
        }else{
            //darn
        }
    }
    else if(type1=="e"){
        if(webWorkersSupported){
            switch(type2){
                case "rsa":
                    RSA = new Worker('rsa.js');
                    RSA.postMessage({
                        n:document.getElementById("rn").value,
                        e:document.getElementById("rd").value,
                        c:document.getElementById("rc").value,
                        d:document.getElementById("re").value,
                        p:document.getElementById("rp").value,
                        q:document.getElementById("rq").value
                    });
                    RSA.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            RSA.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "c":
                    C = new Worker("caesar.js");
                    C.postMessage({
                        c:document.getElementById("c").value,
                        k:document.getElementById("k").value, 
                        e:true
                    });
                    C.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            C.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "v":
                    V = new Worker("vigenere.js");
                    V.postMessage({
                        c:document.getElementById("c").value,
                        k:document.getElementById("k").value, 
                        e:true
                    });
                    V.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            V.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "x":
                    X = new Worker("xor.js");
                    X.postMessage({
                        c:document.getElementById("c").value,
                        k:document.getElementById("k").value, 
                        e:document.querySelector('input[name="xi"]:checked').value
                    });
                    X.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            X.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
                case "h":
                    H = new Worker("hash.js");
                    H.postMessage({
                        c: document.getElementById("c").value,
                        h: document.getElementById("k").value,
                        e: "e"
                    });
                    H.onmessage = function(e) {
                        var data = e.data;
                        if(data=="END"){
                            H.terminate();
                        }else{
                            res.innerHTML+=data;
                        }
                    };
                    break;
            }
        }else{
            //darn
        }
    }
    else{
        res.innerHTML+="wow";
    }
    
}
onload=function(){
    var js_working=document.querySelector("#js-working");
    if(!window.Worker){
        js_working.innerHTML="Your browser does not support Web Workers, which are required for this website to work. Try using one of the browsers specififed <a href=\"https://caniuse.com/#feat=webworkers\">here</a>.";
    }else{
        js_working.innerHTML="";
        webWorkersSupported = true;
    }
    if(getCookie("fawef")){
        document.querySelector("nav").removeChild(document.querySelector("nav").lastChild);
        document.querySelector("nav").lastChild.innerHTML="LOGOUT";
        document.querySelector("nav").lastChild.href="logout.html";
    }
    inputs = ["rnp","rep","rcp","rdp","rpp","rqp","cp","kp","xip"]
    RSAinputs = ["rnp","rep","rcp","rdp","rpp","rqp"];
    cPlusKeyInputs = ["cp","kp"]
    XORInputs = ["cp","kp","xip"]
    document.getElementById("t2").oninput = function(event){
        for(var i = 0;i<inputs.length;i++){document.querySelector("#"+inputs[i]).className="hide"}
        switch(event.currentTarget.value){
            case "rsa":
                for(var i = 0;i<RSAinputs.length;i++){document.querySelector("#"+RSAinputs[i]).className="visible"}
                document.querySelector("#cipher").innerHTML = "the RSA Cryptosystem"
                document.querySelector("#cipherlink").href = "rsa.html"
                break;
            case "c":
                for(var i = 0;i<cPlusKeyInputs.length;i++){document.querySelector("#"+cPlusKeyInputs[i]).className="visible"}
                document.querySelector("#cipher").innerHTML = "the Caesar Cipher"
                document.querySelector("#cipherlink").href = "caesar.html"
                break;
            case "v":
                for(var i = 0;i<cPlusKeyInputs.length;i++){document.querySelector("#"+cPlusKeyInputs[i]).className="visible"}
                document.querySelector("#cipher").innerHTML = "the Vigenere Cipher"
                document.querySelector("#cipherlink").href = "vigenere.html"
                break;
            case "x":
                for(var i = 0;i<XORInputs.length;i++){document.querySelector("#"+XORInputs[i]).className="visible"}
                document.querySelector("#cipher").innerHTML = "the XOR Cipher"
                document.querySelector("#cipherlink").href = "xor.html"
                break;
            case "h":
                for(var i = 0;i<cPlusKeyInputs.length;i++){document.querySelector("#"+cPlusKeyInputs[i]).className="visible"}
                document.querySelector("#cipher").innerHTML = "hashing"
                document.querySelector("#cipherlink").href = "hash.html"
                break;
            default:
                document.querySelector("nop").className="visible"
        }
    };
    document.getElementById("t").oninput = function(e){
        switch(event.currentTarget.value){
            case "e":
                document.querySelector("#rcp").innerHTML=document.querySelector("#rcp").innerHTML.replace(/ciphertext/,"message");
                document.querySelector("#cp").innerHTML=document.querySelector("#cp").innerHTML.replace(/ciphertext/,"message");
                break;
            case "d":
                document.querySelector("#rcp").innerHTML=document.querySelector("#rcp").innerHTML.replace(/message/,"ciphertext");
                document.querySelector("#cp").innerHTML=document.querySelector("#cp").innerHTML.replace(/message/,"ciphertext");
                break;
        }
    };
    document.getElementById("t2").oninput = function(e){
        switch(event.currentTarget.value){
            case "h":
                document.querySelector("#kp").innerHTML=document.querySelector("#kp").innerHTML.replace(/key/,"hash type (sha1, sha256, sha512)");
                break;
            default:
                document.querySelector("#kp").innerHTML=document.querySelector("#kp").innerHTML.replace(/hash type \(sha1, sha256, sha512\)/,"key");
                break;
        }
    };
};

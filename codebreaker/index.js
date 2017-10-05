var webWorkersSupported = false;
function run(){
    var res = document.getElementById("result");
    res.innerHTML="Results:<br>";
    var type1 = document.getElementById("t").value;
    var type2 = document.getElementById("t2").value;
    if(type1=="d"){
        if(webWorkersSupported){
            switch(type2){
                case "rsa":
                    RSA = new Worker('rsa-decrypt.js');
                    RSA.postMessage({
                        n:document.getElementById("rn").value,
                        e:document.getElementById("re").value,
                        c:document.getElementById("rc").value,
                        d:document.getElementById("rd").value,
                        p:document.getElementById("rp").value,
                        q:document.getElementById("rq").value
                    });
                    w.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            RSA.terminate();
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
    else if(type1=="d"){
        if(webWorkersSupported){
            switch(type2){
                case "rsa":
                    RSA = new Worker('rsa-decrypt.js');
                    RSA.postMessage({
                        n:document.getElementById("rn").value,
                        e:document.getElementById("rd").value,
                        c:document.getElementById("rc").value,
                        d:document.getElementById("re").value,
                        p:document.getElementById("rp").value,
                        q:document.getElementById("rq").value
                    });
                    w.onmessage=function(e){
                        var data = e.data;
                        if(data=="END"){
                            RSA.terminate();
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
        res.innerHTML+="very funny.";
    }
    
}
inputs = ["rnp","rep","rcp","rdp","rpp","rqp","cp","kp"]
RSAinputs = ["rnp","rep","rcp","rdp","rpp","rqp"];
document.getElementById("t2").oninput = function(e){
    for(var i = 0;i<inputs.length;i++){document.querySelector("#"+inputs[i]).className="hide"}
    switch(event.currentTarget.value){
        case "rsa":
            for(var i = 0;i<RSAinputs.length;i++){document.querySelector("#"+RSAinputs[i]).className="visible"}
            break;
    }
};
document.getElementById("t1").oninput = function(e){
    document.querySelector("rcp").innerHTML=document.querySelector("rcp").innerHTML.replace(/ciphertext/,"message")
};
onload=function(){
    var js_working=document.querySelector("#js-working");
    if(!window.Worker){
        js_working.innerHTML="Your browser does not support Web Workers. This website will still work, just more slowly.";
    }else{
        js_working.innerHTML="";
        webWorkersSupported = true;
    }
};

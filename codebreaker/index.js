var webWorkersSupported = false;
function run(webWorkersSupported){
    var res = document.getElementById("result");
    res.innerHTML="Results:<br>";
    var type1 = document.getElementById("t").value;
    var type2 = document.getElementById("t2").value;
    if(type1=="e"){
        if(webWorkersSupported){
            switch(type2){
                case "":
                    RSA = new Worker('rsa-decrypt.js');
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
            //do stuff
        }else{
            //darn
        }
    }
    else{
        res.innerHTML+="very funny.";
    }
    
}
onload=function(){
    var js_working=document.querySelector("#js-working");
    if(!window.Worker){
        js_working.innerHTML="Your browser does not support Web Workers. This website will still work, just more slowly.";
    }else{
        js_working.innerHTML="";
        webWorkersSupported = true;
    }
};

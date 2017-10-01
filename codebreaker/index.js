function run(webWorkersSupported){
    var res = document.getElementById("result").innerHTML;
    res.innerHTML="Result:<br>";
    var type1 = document.getElementById("t").value;
    var type2 = document.getElementById("t2").value;
    if(type1=="e"){
        if(webWorkersSupported){
            //do stuff
        }else{
            //darn
        }
    }
    elif(type1=="d"){
        if(webWorkersSupported){
            //do stuff
        }else{
            //darn
        }
    }
    else{
        res.innerHTML="really?!";
    }
    
}
setTimeout(function(){
    var js_working=document.querySelector("#js-working");
    if(!window.Worker){
        js_working.innerHTML="Your browser does not support Web Workers. This website will still work, just more slowly.";
    }else{
        js_working.innerHTML="";

    }
},5);

function run(){
    document.getElementById("result").innerHTML=""; // clear
    var type = document.getElementById("t").value;
    /*var vars={
        n:document.getElementById("n").value,
        e:document.getElementById("e").value,
        c:document.getElementById("c").value,
        d:document.getElementById("d").value,
        p:document.getElementById("p").value,
        q:document.getElementById("q").value
    };*/
}
setTimeout(function(){
    var js_working=document.querySelector("#js-working");
    if(!window.Worker){
        js_working.innerHTML="Your browser does not support Web Workers. This website will still work, just more slowly.";
    } else{
        js_working.innerHTML="";

    }
},50);

function run(){
    
}
var js_working=document.querySelector("#js-working");
if(!windwo.Worker){
    js_working.innerHTML="Your browser does not support Web Workers. This website will still work, just more slowly.";
} else{
    js_working.innerHTML="";
    
}

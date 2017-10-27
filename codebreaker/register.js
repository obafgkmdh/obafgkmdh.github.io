function register(){
    u=document.getElementById("user").value;
    m=document.getElementById("mail").value;
    p1=document.getElementById("pass").value;
    p2=document.getElementById("cpass").value;
    if(p1!=p2){console.log("passwords do not match")}
};
onload=function(){
    var js_working=document.querySelector("#js-working");
    js_working.innerHTML="";
}

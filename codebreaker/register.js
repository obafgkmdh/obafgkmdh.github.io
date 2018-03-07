function register(){
    u=document.getElementById("name").value;
    p1=document.getElementById("pass").value;
    p2=document.getElementById("cpass").value;
    js_working=document.querySelector("#js-working");
    if(p1!=p2){js_working.innerHTML="Passwords do not match!"}
    req = new XMLHttpRequest();
    req.open("POST","https://lamchcl.pythonanywhere.com/reg",true);
    req.send("user="+urlencode(u)+"&pass="+urlencode(p1));
    req.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            if(this.responseText=="1"){
                js_working.innerHTML="Registered!"
            }else{
                js_working.innerHTML="Username is blank or is taken."
            }
        }
    };
};
onload=function(){
    var js_working=document.querySelector("#js-working");
    js_working.innerHTML="";
}

onload=function(){
    var js_working=document.querySelector("#js-working");
    js_working.innerHTML="";
}
function login(){
    u = document.querySelector("#user").value;
    p = document.querySelector("#pass").value;
    req = new XMLHttpRequest();
    req.open("POST","https://lamchcl.pythonanywhere.com/log",true);
    req.send("user="+encodeURI(u)+"&pass="+encodeURI(p));
    req.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            js_working=document.querySelector("#js-working");
            if(this.responseText=="1"){
                js_working.innerHTML="Logged in!" 
                document.cookie=u;
            }else{
                js_working.innerHTML="Wrong username or password!"
            }
        }
    };
}

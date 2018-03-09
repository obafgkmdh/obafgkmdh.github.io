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
}
onload=function(){
    var js_working=document.querySelector("#js-working");
    js_working.innerHTML="";
    if(getCookie("fawef")){
       document.getElementById("form").innerHTML="You are already logged in!";
    }
}
function login(){
    u = document.querySelector("#user").value;
    p = document.querySelector("#pass").value;
    req = new XMLHttpRequest();
    req.open("POST","https://lamchcl.pythonanywhere.com/log",true);
    req.send("user="+encodeURIComponent(u)+"&pass="+encodeURIComponent(p));
    req.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            js_working=document.querySelector("#js-working");
            if(this.responseText=="1"){
                js_working.innerHTML="Logged in!" 
                document.cookie="fawef="+encodeURIComponent(u);
            }else{
                js_working.innerHTML="Wrong username or password!"
            }
        }
    };
}

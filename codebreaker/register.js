function register(){
    u=document.getElementById("name").value;
    p1=document.getElementById("pass").value;
    p2=document.getElementById("cpass").value;
    js_working=document.querySelector("#js-working");
    if(p1!=p2){js_working.innerHTML="Passwords do not match!"}
    req = new XMLHttpRequest();
    req.open("POST","https://lamchcl.pythonanywhere.com/reg",true);
    req.send("user="+encodeURI(u)+"&pass="+encodeURI(p1));
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
        document.querySelector("nav").removeChild(document.querySelector("nav").lastChild);
        document.querySelector("nav").lastChild.innerHTML="LOGOUT";
        document.querySelector("nav").lastChild.href="logout.html";
    }
};

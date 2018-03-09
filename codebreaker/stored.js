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
    if(getCookie("fawef")){
        document.querySelector("nav").removeChild(document.querySelector("nav").lastChild);
        document.querySelector("nav").lastChild.innerHTML="LOGOUT";
        document.querySelector("nav").lastChild.href="logout.html";
    }
};

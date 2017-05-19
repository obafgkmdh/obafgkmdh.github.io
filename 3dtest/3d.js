function to3d(coords){
    r=coords.r;
    t1=coords.t1;
    t2=coords.t2;
    
    x=r*Math.cos(t2)*Math.cos(t1);
    y=r*Math.cos(t2)*Math.sin(t1);
    z=r*Math.sin(t2);
    return {x:x,y:y,z:z};
}
function toSpherical(coords){
    x=coords.x;
    y=coords.y;
    z=coords.z;
    
    t1=Math.atan(y/x);
    t2=Math.atan(z/(y/Math.sin(t1)));
    r=z/Math.sin(t2);
    return {r:r,t1:t1,t2:t2};
}
points = [{x:3,y:-4,z:12}, {x:-4,y:2,z:15}, {x:17,y:7,z:17}];
lines = [[0,1],[1,2]];
var tracking = false;
var mouseX = 0;
var mouseY = 0;
var mouseX_ = 0;
var mouseY_ = 0;
$(document).ready(function(){
    $("#magic").mousedown(function(e){
        tracking = true;
    });
    $("#magic").mouseup(function(e){
        tracking = false;
    });
    $("#magic").mousemove(function(e){
        if(tracking){
            mouseX_ = mouseX;
            mouseY_ = mouseY;
            mouseX = e.pageX - $('#magic').offset().left;
            mouseY = e.pageY - $('#magic').offset().top;
        }
    });
});
p = []
l = []
zoom = 1
size = document.querySelector("#magic").width.baseVal.value;
window.setInterval(function(){
    while(p.length){p[0].parentElement.removeChild(p[0]);p.shift();}
    while(l.length){l[0].parentElement.removeChild(l[0]);l.shift();}
    if(tracking){}
    for(var i = 0;i<points.length;i++){
        scalefactor=size/500*zoom*50/points[i].z;
        a = document.createElementNS("http://www.w3.org/2000/svg","circle");
        a.setAttribute("cx",points[i].x*scalefactor+size/2);
        a.setAttribute("cy",points[i].y*scalefactor+size/2);
        a.setAttribute("r",5*scalefactor/50);
        document.querySelector("#magic").appendChild(a);
        p.push(a);
    }
    for(var i = 0;i<lines.length;i++){
        scalefactor=size/500*zoom*50/points[i].z;
        a = document.createElementNS("http://www.w3.org/2000/svg","line");
        a.setAttribute("x1",points[lines[i][0]].x*scalefactor+size/2);
        a.setAttribute("y1",points[lines[i][0]].y*scalefactor+size/2);
        a.setAttribute("x2",points[lines[i][1]].x*scalefactor+size/2);
        a.setAttribute("y2",points[lines[i][1]].y*scalefactor+size/2);
        document.querySelector("#magic").appendChild(a);
        l.push(a);
    }
},200);

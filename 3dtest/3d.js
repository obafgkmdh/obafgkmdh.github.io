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
points = [{x:3,y:-4,z:12}, {x:-4,y:2,z:15}];
lines = [[points[0],points[1]]];
var zoom = 100; // r
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
s = 1
window.setInterval(function(){
    while(p.length){p[0].parentElement.removeChild(p[0]);}
    for(var i = 0;i<points.length;i++){
        scalefactor=s*5/points[i].z;
        a = document.createElement("circle");
        a.cx=points[i].x*scalefactor;
        a.cy=points[i].y*scalefactor;
        a.r=5*scalefactor;
        document.querySelector("#magic").appendChild(a);
        p.push(a);
    }
},200);

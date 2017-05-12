function sphericalTo3d(coords){
	r=coords.r;
	t1=coords.t1;
	t2=coords.t2;
	
	x=r*Math.cos(t2)*Math.cos(t1);
	y=r*Math.cos(t2)*Math.sin(t1);
	z=r*Math.sin(t2);
	return {x:x,y:y,z:z};
}
function 3dToSpherical(coords){}

function decrypt1(c,d,n){
    return c.modPow(d,n);
}
function decrypt2(p,q,c,e,n){
    return decrypt1(c,e.modInv(p.prev().multiply(q.prev())),n);
}
function nthroot(x,n){
    try{
        //adapted from https://stackoverflow.com/a/356206/5335592
        var high = bigInt.one;
        while(high.pow(n).lt(x)){
            high=high.times(2);
        }
        var low=high.over(2);
        while(low.lt(high)){
            mid = low.plus(high).over(2);
            if(low.lt(mid)&&mid.pow(n).lt(x)){
                low = mid;
            }
            else if(high.gt(mid)&&mid.pow(n).gt(x)){
                high = mid;
            }
            else{
                return mid;
            }
        }
        return mid.next();
    }catch(err){
        //give up
        return bigInt(1);
    }
}
function frac2continued(num,den){
    var a=[];
    while(num.neq(bigInt.one)){
        var b=num.over(den);
        a.push(b);
        num=num.minus(b.times(den));
        //uhh i really hope there's no aliasing
        var tmp=num;
        num=den;
        den=tmp;
    }
    return a;
}
function continued2convergents(arr){
    var a=[];
    for(var i = arr.length-1;i>=0;i--){
        // i could probably make this run in O(n) instead of O(n^2) but whatever
        var num=bigInt.one,den=arr[i];
        for(var j = i;j>0;j--){
            num = num.plus(den.times(arr[j-1]));
            var tmp=num;
            num=den;
            den=tmp;
        }
        num = num.plus(den.times(arr[0]));
        var b = bigInt.gcd(num,den);
        a.push([den.over(b),num.over(b)]); //hm got them mixed up somehow idk it works tho so whatever
    }
    return a.reverse();
}
//arrow functions? template strings? now that's pretty exciting
h2a=a=>a.match(/.{1,2}/g).map(v=>String.fromCharCode(parseInt(v, 16))).join``;
function write(m,e){
    document.getElementById("result").innerHTML+=e==1?m.replace(/</g,"&lt;"):m;//plz no inject
}
async function rsa(){
    document.getElementById("result").innerHTML=""; // clear
    try{
        var vars={
            n:document.getElementById("n").value,
            e:document.getElementById("e").value,
            c:document.getElementById("c").value,
            d:document.getElementById("d").value,
            p:document.getElementById("p").value,
            q:document.getElementById("q").value
        };
        for(var i in vars){vars[i]=vars[i].replace(/\D/g,'');if(vars[i]==""){delete vars[i];}else{vars[i]=bigInt(vars[i]);}}
        //error checking
        if(!vars.e&&!vars.d){
            write("<br><span class='warning'>Warning: no values for e or d specified. Assuming e is a fermat prime.</span><br>");
        }
        if(!vars.n&&(!vars.p||!vars.q)){
            write("<br><span class='warning'>Warning: Information about modulus missing and/or incomplete. Assuming message does not wrap around modulus.</span><br>");
        }
        if(vars.n&&vars.c&&vars.c.gt(vars.n)){
            write("<br><span class='warning'>Warning: Message is larger than modulus</span><br>");
        }
        if(vars.p&&vars.q&&vars.n&&vars.p.multiply(vars.q).neq(vars.n)){
            throw ("Error: inconsistency between p, q, and n");
        }
        if(vars.d&&vars.e&&vars.n&&bigInt(2).modPow(vars.d.multiply(vars.e),vars.n).neq(bigInt(2))){
            throw ("Error: inconsistency between d and e");
        }
        if(!vars.c){
            throw ("Error: no value for c specified");
        }
        //computation
        if(!vars.p&&!vars.q&&vars.n){
            let res = await fetch(`https://cors-anywhere.herokuapp.com/http://www.factordb.com/api?query=${vars.n}`,{
				headers:{'X-Requested-With':''}
			});
			let data = await res.json();
			switch (data.status) {
				case "FF":
					if (data.factors.length==2 && data.factors.every(x=>x[1]==1)) {
						vars.p = bigInt(data.factors[0][0]);
						vars.q = bigInt(data.factors[1][0]);
					} else {
						let phi = vars.n;
						for (let i = 0; i < data.factors.length; i++) {
							phi = phi.over(bigInt(data.factors[i]))*bigInt(data.factors[i]).prev()
						}
						let e_arr = [3, 5, 17, 257, 65537];
						if (vars.e) {
							e_arr = [vars.e];
						}
						for (let i = 0; i < e_arr.length; i++) {
							let e = bigInt(e_arr[i]);
							var m = decrypt1(vars.c,e.modInv(phi),vars.n);
							write("<br><span class='success'>Decrypted message found"+(vars.e?"":" assuming e="+e)+": "+m.toString()+"</span>");
							write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
							write("<br><span class='info'>converted to ASCII: ");
							write(h2a(m.toString(16)),1);
							write("</span><br>");
						}
						return;
					}
					break;
				case "C":
				case "CF":
					break;
				case "Prp":
				case "P":
					let e_arr = [3, 5, 17, 257, 65537];
					if (vars.e) {
						e_arr = [vars.e];
					}
					for (let i = 0; i < e_arr.length; i++) {
						let e = bigInt(e_arr[i]);
						var m = decrypt1(vars.c,e.modInv(vars.n.prev()),vars.n);
						write("<br><span class='success'>Decrypted message found"+(vars.e?"":" assuming e="+e)+": "+m.toString()+"</span>");
						write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
						write("<br><span class='info'>converted to ASCII: ");
						write(h2a(m.toString(16)),1);
						write("</span><br>");
					}
					return;
			}
        }
        if(vars.p&&vars.q){
            if(vars.d){
                var m = decrypt1(vars.c,vars.d,vars.p.multiply(vars.q));
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else if(vars.e){
                var m = decrypt2(vars.p,vars.q,vars.c,vars.e,vars.p.multiply(vars.q));
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else{
                var fermat_primes=[3, 5, 17, 257, 65537];
                for(var i = 0;i<fermat_primes.length;i++){
                    vars.e=bigInt(fermat_primes[i]);
                    if(!vars.p.prev().multiply(vars.q.prev()).isDivisibleBy(vars.e)){
                        var m = decrypt2(vars.p,vars.q,vars.c,vars.e,vars.p.multiply(vars.q));
                        write("<br><span class='success'>Decrypted message assuming e="+vars.e.toString()+": "+m.toString()+"</span>");
                        write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                        write("<br><span class='info'>converted to ASCII: ");
                        write(h2a(m.toString(16)),1);
                        write("</span><br>");
                    }
                    else{
                        write("<br><span class='info'>No message could be recovered when e="+vars.e.toString()+"</span><br>");
                    }
                }
                return;
            }
        }
        else if(vars.n&&vars.p){
            vars.q=vars.n.over(vars.p);
            if(vars.d){
                var m = decrypt1(vars.c,vars.d,vars.p.multiply(vars.q));
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else if(vars.e){
                var m = decrypt2(vars.p,vars.q,vars.c,vars.e,vars.p.multiply(vars.q));
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else{
                var fermat_primes=[3, 5, 17, 257, 65537];
                for(var i = 0;i<fermat_primes.length;i++){
                    vars.e=bigInt(fermat_primes[i]);
                    if(!vars.p.prev().multiply(vars.q.prev()).isDivisibleBy(vars.e)){
                        var m = decrypt2(vars.p,vars.q,vars.c,vars.e,vars.p.multiply(vars.q));
                        write("<br><span class='success'>Decrypted message assuming e="+vars.e.toString()+": "+m.toString()+"</span>");
                        write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                        write("<br><span class='info'>converted to ASCII: ");
                        write(h2a(m.toString(16)),1);
                        write("</span><br>");
                    }
                    else{
                        write("<br><span class='info'>No message could be recovered when e="+vars.e.toString()+"</span><br>");
                    }
                }
                return;
            }
        }
        else if(vars.n&&vars.q){
            vars.p=vars.n.over(vars.q);
            if(vars.d){
                var m = decrypt1(vars.c,vars.d,vars.p.multiply(vars.q));
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else if(vars.e){
                var m = decrypt2(vars.p,vars.q,vars.c,vars.e,vars.p.multiply(vars.q));
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else{
                var fermat_primes=[3, 5, 17, 257, 65537];
                for(var i = 0;i<fermat_primes.length;i++){
                    vars.e=bigInt(fermat_primes[i]);
                    if(!vars.p.prev().multiply(vars.q.prev()).isDivisibleBy(vars.e)){
                        var m = decrypt2(vars.p,vars.q,vars.c,vars.e,vars.p.multiply(vars.q));
                        write("<br><span class='success'>Decrypted message assuming e="+vars.e.toString()+": "+m.toString()+"</span>");
                        write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                        write("<br><span class='info'>converted to ASCII: ");
                        write(h2a(m.toString(16)),1);
                        write("</span><br>");
                    }
                    else{
                        write("<br><span class='info'>No message could be recovered when e="+vars.e.toString()+"</span><br>");
                    }
                }
                return;
            }
        }
        else if(vars.n){
            if(vars.d){
                var m = decrypt1(vars.c,vars.d,vars.n);
                write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                write("<br><span class='info'>converted to ASCII: ");
                write(h2a(m.toString(16)),1);
                write("</span><br>");
                return;
            }
            else {
				for (let e of (vars.e?[vars.e]:[3, 5, 17, 257, 65537].map(x=>bigInt(x)))) {
					if(nthroot(vars.c,e).modPow(e,vars.n).equals(vars.c)){
						var m = nthroot(vars.c,e);
						write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
						write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
						write("<br><span class='info'>converted to ASCII: ");
						write(h2a(m.toString(16)),1);
						write("</span><br>");
						return;
					}
					// wiener's attack for d < N^(1/3)/4
					var w = continued2convergents(frac2continued(e,vars.n));
					w.shift();
					for(var i = 0; i < w.length; i++){
						var s = e.times(w[i][1]).prev();
						if(!s.isDivisibleBy(w[i][0])){continue;}
						var t = s.over(w[i][0]);
						var b = vars.n.minus(t).next();
						if(nthroot(b.square().minus(bigInt[4].times(vars.n)),2).square().eq(b.square().minus(bigInt[4].times(vars.n)))){
							var p = (b.plus(nthroot(b.square().minus(bigInt[4].times(vars.n)),2))).over(bigInt[2]);
							var q = (b.minus(nthroot(b.square().minus(bigInt[4].times(vars.n)),2))).over(bigInt[2]);
							if(p.times(q).neq(vars.n)){console.log("oh no something has gone horribly wrong");continue;}
							var m = decrypt2(p,q,vars.c,e,p.times(q));
							write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
							write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
							write("<br><span class='info'>converted to ASCII: ");
							write(h2a(m.toString(16)),1);
							write("</span><br>");
							return;
						}else{/*console.log(t.toString()+" "+b.toString());*/continue;}
					}
				}
            }
        }
        else{
            if(vars.e){
                if(vars.e <= vars.c.toString(2).length){
                    if(nthroot(vars.c,vars.e).pow(vars.e)==vars.c){
                        var m = nthroot(vars.c,vars.e);
                        write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                        write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                        write("<br><span class='info'>converted to ASCII: ");
                        write(h2a(m.toString(16)),1);
                        write("</span><br>");
                        return;
                    }
                    else{
                        throw ("No result found.");
                    }
                }else{
                    throw ("No result found.");
                }
            }
            else{
                var fermat_primes=[bigInt[3], bigInt[5], bigInt[17], bigInt[257], bigInt(65537)]; // waiting for a 6th fermat prime
                for(var i = 0;i<fermat_primes.length;i++){
                    vars.e=fermat_primes[i];
                    if(nthroot(vars.c,vars.e).pow(vars.e)==vars.c){
                        var m = nthroot(vars.c,vars.e);
                        write("<br><span class='success'>Decrypted message found assuming e="+vars.e.toString()+": "+m.toString()+"</span>");
                        write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                        write("<br><span class='info'>converted to ASCII: ");
                        write(h2a(m.toString(16)),1);
                        write("</span><br>");
                    }
                }
            }
        }
    }
    catch(e){
        write("<br><span class='error'>"+e+"</span>");
    }
}

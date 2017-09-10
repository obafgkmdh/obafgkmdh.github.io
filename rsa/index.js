function decrypt1(c,d,n){
    return c.modPow(d,n);
}
function decrypt2(p,q,c,e,n){
    return decrypt1(c,e.modInv(p.prev().multiply(q.prev())),n);
}
function nthroot(x,n){
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
            console.log(1);
            console.log(num);console.log(den);
            num = num.plus(den.times(arr[j]));
            console.log(2);
            console.log(num);console.log(den);
            var tmp=num;
            num=den;
            den=tmp;
            console.log(3);
            console.log(num);console.log(den);
        }
        console.log(4);
        console.log(num);console.log(den);
        num = num.plus(den.times(arr[0]));
        var b = bigInt.gcd(num,den);
        console.log(5);
        console.log(num);console.log(den);
        a.push([num.over(b),den.over(b)]);
    }
    return a.reverse();
}
//arrow functions? template strings? now that's pretty exciting
h2a=a=>a.match(/.{1,2}/g).map(v=>String.fromCharCode(parseInt(v, 16))).join``;
function write(m,e){
    document.getElementById("result").innerHTML+=e==1?m.replace(/</g,"&lt;"):m;
}
function rsa(){
    document.getElementById("result").innerHTML=""; // clear
    try{
        var vars={
            n:document.getElementById("n").value.replace(/\D/g,''),
            e:document.getElementById("e").value.replace(/\D/g,''),
            c:document.getElementById("c").value.replace(/\D/g,''),
            d:document.getElementById("d").value.replace(/\D/g,''),
            p:document.getElementById("p").value.replace(/\D/g,''),
            q:document.getElementById("q").value.replace(/\D/g,'')
        };
        for(var i in vars){if(vars[i]==""){delete vars[i];}else{vars[i]=bigInt(vars[i]);}}
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
            //todo: get factor tables
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
            else if(vars.e){
                if(nthroot(vars.c,vars.e).pow(vars.e)==vars.c){
                    var m = nthroot(vars.c,vars.e);
                    write("<br><span class='success'>Decrypted message found: "+m.toString()+"</span>");
                    write("<br><span class='info'>in hex: "+m.toString(16)+" </span>");
                    write("<br><span class='info'>converted to ASCII: ");
                    write(h2a(m.toString(16)),1);
                    write("</span><br>");
                    return;
                }
                var e_is_large = false;
                if(e_is_large){
                    var w = frac2continued(vars.e,vars.n);
                    //ragequit
                    return;
                }
            }
            else{
                //hope and pray
            }
        }
        else{
            if(vars.e){
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
                    //give up your hopes and dreams, all is lost
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
        write("<br><span class='error'>"+e+"</span><br><span class='error'>Process terminated.</span>");
    }
}

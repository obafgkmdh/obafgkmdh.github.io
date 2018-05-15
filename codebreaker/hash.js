importScripts('biginteger.js');

function write(m,e){
    postMessage(e==1?m.replace(/</g,"&lt;"):m);//plz no inject
};
function hash(text, e, hash){
    var abc="";
    if(e==="e"){
        switch(hash){
            // closure compiler op
            case "sha1":
                var s=text;function d(b,e){var a=(b&65535)+(e&65535);return(b>>16)+(e>>16)+(a>>16)<<16|a&65535}for(var k="",n,p,q=-1,t=s.length;++q<t;)n=s.charCodeAt(q),p=q+1<t?s.charCodeAt(q+1):0,55296<=n&&56319>=n&&56320<=p&&57343>=p&&(n=65536+((n&1023)<<10)+(p&1023),++q),127>=n?k+=String.fromCharCode(n):2047>=n?k+=String.fromCharCode(192|n>>>6&31,128|n&63):65535>=n?k+=String.fromCharCode(224|n>>>12&15,128|n>>>6&63,128|n&63):2097151>=n&&(k+=String.fromCharCode(240|n>>>18&7,128|n>>>12&63,128|n>>>6&63,128|n&63));abc=(function(b){for(var e="",a=0;a<b.length;a++){var c=b.charCodeAt(a);e+="0123456789abcdef".charAt(c>>>4&15)+"0123456789abcdef".charAt(c&15)}return e}(function(b){for(var e=Array(b.length>>2),a=0,c=e.length;a<c;a++)e[a]=0;a=0;for(c=8*b.length;a<c;a+=8)e[a>>5]|=(b.charCodeAt(a/8)&255)<<24-a%32;b=8*b.length;e[b>>5]|=128<<24-b%32;e[(b+64>>9<<4)+15]=b;b=Array(80);a=1732584193;c=-271733879;for(var g=-1732584194,h=271733878,m=-1009589776,r=0,u=e.length;r<u;r+=16){for(var v=a,w=c,x=g,y=h,z=m,f=
0;80>f;f++){if(16>f)var l=e[r+f];else l=b[f-3]^b[f-8]^b[f-14]^b[f-16],l=l<<1|l>>>31;b[f]=l;l=d(d(a<<5|a>>>27,20>f?c&g|~c&h:40>f?c^g^h:60>f?c&g|c&h|g&h:c^g^h),d(d(m,b[f]),20>f?1518500249:40>f?1859775393:60>f?-1894007588:-899497514));m=h;h=g;g=c<<30|c>>>2;c=a;a=l}a=d(a,v);c=d(c,w);g=d(g,x);h=d(h,y);m=d(m,z)}e=[a,c,g,h,m];b="";a=0;for(c=32*e.length;a<c;a+=8)b+=String.fromCharCode(e[a>>5]>>>24-a%32&255);return b}(k)));
            break;
            case "sha256":
                abc=(function n(d){function g(a,b){return a>>>b|a<<32-b}for(var c=Math.pow,m=c(2,32),a,q="",f=[],k=8*d.length,b=n.a=n.a||[],p=n.k=n.k||[],h=p.length,l={},e=2;64>h;e++)if(!l[e]){for(a=0;313>a;a+=e)l[a]=e;b[h]=c(e,.5)*m|0;p[h++]=c(e,1/3)*m|0}for(d+="\u0080";d.length%64-56;)d+="\x00";for(a=0;a<d.length;a++){c=d.charCodeAt(a);if(c>>8)return;f[a>>2]|=c<<(3-a)%4*8}f[f.length]=k/m|0;f[f.length]=k;for(c=0;c<f.length;){d=f.slice(c,c+=16);m=b;b=b.slice(0,8);for(a=0;64>a;a++)h=d[a-15],l=d[a-2],k=b[0],e=b[4],h=b[7]+
(g(e,6)^g(e,11)^g(e,25))+(e&b[5]^~e&b[6])+p[a]+(d[a]=16>a?d[a]:d[a-16]+(g(h,7)^g(h,18)^h>>>3)+d[a-7]+(g(l,17)^g(l,19)^l>>>10)|0),b=[h+((g(k,2)^g(k,13)^g(k,22))+(k&b[1]^k&b[2]^b[1]&b[2]))|0].concat(b),b[4]=b[4]+h|0;for(a=0;8>a;a++)b[a]=b[a]+m[a]|0}for(a=0;8>a;a++)for(c=3;c+1;c--)f=b[a]>>8*c&255,q+=(16>f?0:"")+f.toString(16);return q})(text);
            break;
            case "sha512":
                var da;
if(!(da=b)){var w=Math,z={},B=z.p={},ea=function(){},E=B.s={extend:function(a){ea.prototype=this;var c=new ea;a&&c.F(a);c.z=this;return c},create:function(){var a=this.extend();a.h.apply(a,arguments);return a},h:function(){},F:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},e:function(){return this.z.extend(this)}},F=B.i=E.extend({h:function(a,c){a=this.d=a||[];this.c=void 0!=c?c:4*a.length},toString:function(a){return(a||fa).stringify(this)},
concat:function(a){var c=this.d,e=a.d,d=this.c;a=a.c;this.t();if(d%4)for(var g=0;g<a;g++)c[d+g>>>2]|=(e[g>>>2]>>>24-g%4*8&255)<<24-(d+g)%4*8;else if(65535<e.length)for(g=0;g<a;g+=4)c[d+g>>>2]=e[g>>>2];else c.push.apply(c,e);this.c+=a;return this},t:function(){var a=this.d,c=this.c;a[c>>>2]&=4294967295<<32-c%4*8;a.length=w.ceil(c/4)},e:function(){var a=E.e.call(this);a.d=this.d.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*w.random()|0);return F.create(c,a)}}),ha=
z.O={},fa=ha.K={stringify:function(a){var c=a.d;a=a.c;for(var e=[],d=0;d<a;d++){var g=c[d>>>2]>>>24-d%4*8&255;e.push((g>>>4).toString(16));e.push((g&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],d=0;d<c;d+=2)e[d>>>3]|=parseInt(a.substr(d,2),16)<<24-d%8*4;return F.create(e,c/2)}},ia=ha.M={stringify:function(a){var c=a.d;a=a.c;for(var e=[],d=0;d<a;d++)e.push(String.fromCharCode(c[d>>>2]>>>24-d%4*8&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],d=
0;d<c;d++)e[d>>>2]|=(a.charCodeAt(d)&255)<<24-d%4*8;return F.create(e,c)}},ja=ha.N={stringify:function(a){try{return decodeURIComponent(escape(ia.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return ia.parse(unescape(encodeURIComponent(a)))}},na=B.I=E.extend({reset:function(){this.g=F.create();this.j=0},l:function(a){"string"==typeof a&&(a=ja.parse(a));this.g.concat(a);this.j+=a.c},m:function(a){var c=this.g,e=c.d,d=c.c,g=this.n,v=d/(4*g);v=a?w.ceil(v):w.max((v|
0)-this.r,0);a=v*g;d=w.min(4*a,d);if(a){for(var r=0;r<a;r+=g)this.C(e,r);r=e.splice(0,a);c.c-=d}return F.create(r,d)},e:function(){var a=E.e.call(this);a.g=this.g.e();return a},r:0});B.u=na.extend({h:function(){this.reset()},reset:function(){na.reset.call(this);this.q()},update:function(a){this.l(a);this.m();return this},o:function(a){a&&this.l(a);this.B();return this.f},e:function(){var a=na.e.call(this);a.f=this.f.e();return a},n:16,w:function(a){return function(c,e){return a.create(e).o(c)}},A:function(a){return function(c,
e){return oa.J.create(a,e).o(c)}}});var oa=z.D={};da=z}var b=da,G=b,pa=G.p,qa=pa.s,Aa=pa.i;G=G.H={};G.v=qa.extend({h:function(a,c){this.a=a;this.b=c}});G.i=qa.extend({h:function(a,c){a=this.d=a||[];this.c=void 0!=c?c:8*a.length},G:function(){for(var a=this.d,c=a.length,e=[],d=0;d<c;d++){var g=a[d];e.push(g.a);e.push(g.b)}return Aa.create(e,this.c)},e:function(){for(var a=qa.e.call(this),c=a.d=this.d.slice(0),e=c.length,d=0;d<e;d++)c[d]=c[d].e();return a}});
function N(){return Ba.create.apply(Ba,arguments)}var Ca=b.p.u,O=b.H,Ba=O.v,Da=O.i;O=b.D;
for(var Ea=[N(1116352408,3609767458),N(1899447441,602891725),N(3049323471,3964484399),N(3921009573,2173295548),N(961987163,4081628472),N(1508970993,3053834265),N(2453635748,2937671579),N(2870763221,3664609560),N(3624381080,2734883394),N(310598401,1164996542),N(607225278,1323610764),N(1426881987,3590304994),N(1925078388,4068182383),N(2162078206,991336113),N(2614888103,633803317),N(3248222580,3479774868),N(3835390401,2666613458),N(4022224774,944711139),N(264347078,2341262773),N(604807628,2007800933),
N(770255983,1495990901),N(1249150122,1856431235),N(1555081692,3175218132),N(1996064986,2198950837),N(2554220882,3999719339),N(2821834349,766784016),N(2952996808,2566594879),N(3210313671,3203337956),N(3336571891,1034457026),N(3584528711,2466948901),N(113926993,3758326383),N(338241895,168717936),N(666307205,1188179964),N(773529912,1546045734),N(1294757372,1522805485),N(1396182291,2643833823),N(1695183700,2343527390),N(1986661051,1014477480),N(2177026350,1206759142),N(2456956037,344077627),N(2730485921,
1290863460),N(2820302411,3158454273),N(3259730800,3505952657),N(3345764771,106217008),N(3516065817,3606008344),N(3600352804,1432725776),N(4094571909,1467031594),N(275423344,851169720),N(430227734,3100823752),N(506948616,1363258195),N(659060556,3750685593),N(883997877,3785050280),N(958139571,3318307427),N(1322822218,3812723403),N(1537002063,2003034995),N(1747873779,3602036899),N(1955562222,1575990012),N(2024104815,1125592928),N(2227730452,2716904306),N(2361852424,442776044),N(2428436474,593698344),
N(2756734187,3733110249),N(3204031479,2999351573),N(3329325298,3815920427),N(3391569614,3928383900),N(3515267271,566280711),N(3940187606,3454069534),N(4118630271,4000239992),N(116418474,1914138554),N(174292421,2731055270),N(289380356,3203993006),N(460393269,320620315),N(685471733,587496836),N(852142971,1086792851),N(1017036298,365543100),N(1126000580,2618297676),N(1288033470,3409855158),N(1501505948,4234509866),N(1607167915,987167468),N(1816402316,1246189591)],P=[],Fa=0;80>Fa;Fa++)P[Fa]=N();
O=O.k=Ca.extend({q:function(){this.f=Da.create([N(1779033703,4089235720),N(3144134277,2227873595),N(1013904242,4271175723),N(2773480762,1595750129),N(1359893119,2917565137),N(2600822924,725511199),N(528734635,4215389547),N(1541459225,327033209)])},C:function(a,c){var e=this.f.d,d=e[0],g=e[1],v=e[2],r=e[3],Q=e[4],R=e[5],S=e[6];e=e[7];for(var ra=d.a,T=d.b,sa=g.a,U=g.b,ta=v.a,V=v.b,ua=r.a,W=r.b,va=Q.a,X=Q.b,wa=R.a,Y=R.b,xa=S.a,Z=S.b,ya=e.a,aa=e.b,n=ra,k=T,H=sa,C=U,I=ta,D=V,ka=ua,J=W,p=va,l=X,ba=wa,K=
Y,ca=xa,L=Z,la=ya,M=aa,q=0;80>q;q++){var x=P[q];if(16>q)var m=x.a=a[c+2*q]|0,f=x.b=a[c+2*q+1]|0;else{m=P[q-15];f=m.a;var t=m.b;m=(t<<31|f>>>1)^(t<<24|f>>>8)^f>>>7;t=(f<<31|t>>>1)^(f<<24|t>>>8)^(f<<25|t>>>7);var A=P[q-2];f=A.a;var h=A.b;A=(h<<13|f>>>19)^(f<<3|h>>>29)^f>>>6;h=(f<<13|h>>>19)^(h<<3|f>>>29)^(f<<26|h>>>6);f=P[q-7];var ma=f.a,y=P[q-16],u=y.a;y=y.b;f=t+f.b;m=m+ma+(f>>>0<t>>>0?1:0);f+=h;m=m+A+(f>>>0<h>>>0?1:0);f+=y;m=m+u+(f>>>0<y>>>0?1:0);x.a=m;x.b=f}ma=p&ba^~p&ca;y=l&K^~l&L;x=n&H^n&I^H&I;
var Ga=k&C^k&D^C&D;t=(k<<4|n>>>28)^(n<<30|k>>>2)^(n<<25|k>>>7);A=(n<<4|k>>>28)^(k<<30|n>>>2)^(k<<25|n>>>7);h=Ea[q];var Ha=h.a,za=h.b;h=M+((p<<18|l>>>14)^(p<<14|l>>>18)^(l<<23|p>>>9));u=la+((l<<18|p>>>14)^(l<<14|p>>>18)^(p<<23|l>>>9))+(h>>>0<M>>>0?1:0);h+=y;u=u+ma+(h>>>0<y>>>0?1:0);h+=za;u=u+Ha+(h>>>0<za>>>0?1:0);h+=f;u=u+m+(h>>>0<f>>>0?1:0);f=A+Ga;x=t+x+(f>>>0<A>>>0?1:0);la=ca;M=L;ca=ba;L=K;ba=p;K=l;l=J+h|0;p=ka+u+(l>>>0<J>>>0?1:0)|0;ka=I;J=D;I=H;D=C;H=n;C=k;k=h+f|0;n=u+x+(k>>>0<h>>>0?1:0)|0}T=d.b=
T+k|0;d.a=ra+n+(T>>>0<k>>>0?1:0)|0;U=g.b=U+C|0;g.a=sa+H+(U>>>0<C>>>0?1:0)|0;V=v.b=V+D|0;v.a=ta+I+(V>>>0<D>>>0?1:0)|0;W=r.b=W+J|0;r.a=ua+ka+(W>>>0<J>>>0?1:0)|0;X=Q.b=X+l|0;Q.a=va+p+(X>>>0<l>>>0?1:0)|0;Y=R.b=Y+K|0;R.a=wa+ba+(Y>>>0<K>>>0?1:0)|0;Z=S.b=Z+L|0;S.a=xa+ca+(Z>>>0<L>>>0?1:0)|0;aa=e.b=aa+M|0;e.a=ya+la+(aa>>>0<M>>>0?1:0)|0},B:function(){var a=this.g,c=a.d,e=8*this.j,d=8*a.c;c[d>>>5]|=128<<24-d%32;c[(d+128>>>10<<5)+31]=e;a.c=4*c.length;this.m();this.f=this.f.G()},n:32});b.k=Ca.w(O);b.L=Ca.A(O);
sha512=function(a){return b.k(a)+""};
                abc=sha512(text);
            break;
            default:
                abc = "Hash type not supported."
        }
    }else{
        abc = "'Decryption' of hashes is not supported."
    }
    return abc;
};
onmessage = function(VARS){
    try{
        var vars = VARS.data;
        if(vars.h && vars.e){
            write("Hash: "+hash(vars.c,vars.e,vars.h),1);
            write("END");
        }else{
            write("Please provide a hash type and an encryption/decryption mode!")
            write("END");
        }
    }catch(err){
        write("END");
    }
}

const P=[{n:"Rubber Tree Flowers Honey",t:"Nature's Boosting Gold",d:"Rich, golden and naturally sweet. Collected by beekeepers and packed by MJ's Legacy in a hexagonal glass jar.",c:["#d98a12","#f2c21b"],s:[["250g",260],["300g",320],["500g",430],["1 kg",700]],b:["Boosts red blood cell formation","Powerful liver cleanser","Supports kidney and throat health","Excellent for skin health","Balances body pH","Enhances detox and digestive enzymes","Rich in antioxidants and flavonoids","Lowers oxidative stress","Helps weight management","Improves good sleep","Boosts immunity","Liver detoxification and heart support"]},
{n:"Moringa Tree Flowers Honey",t:"Nature's Power House",d:"Light amber honey from moringa blossoms, known for its vitamin content. Collected by beekeepers and packed by MJ's Legacy in a hexagonal glass jar.",c:["#c9831a","#3ea83a"],s:[["250g",470],["300g",560],["500g",840],["1 kg",1500]],b:["Mild arthritis aid and joint stiffness","Quality sleep improvement","Hormonal balance support","Heart, liver, eye and bone health","Throat and respiratory relief","Mental clarity and digestive support","Vitamin C, B1, B2, B3, B5, B6 and more","Rich in antioxidants","Skin and hair support","Stress reduction","Natural energy booster"]},{n:"Clover Plant Flowers Honey",t:"Nature's Pure Refreshing",d:"Mild, smooth and refreshing honey from clover flowers. Collected by beekeepers and packed by MJ's Legacy in a hexagonal glass jar.",c:["#d48a14","#9a9a9a"],s:[["250g",290],["300g",350],["500g",460],["1 kg",800]],b:["Natural energy booster","Oral health and hydration support","Vitamin C and B (B2, B6, B9)","Heart and liver health, good sleep","Relief from cough and sore throat","Anti-bacterial and anti-microbial","Skin and hair health and healing","Digestive support (gut health)","Rich in antioxidants","Boosts immunity","Regulates metabolism","Copper, minerals, zinc, iron and more"]}];
const IMG=["rubber-honey.jpg","moringa-honey.jpg","clover-honey.jpg"];
let pi=0,sel=0,qty=1,cart=[];
const $=id=>document.getElementById(id),R=n=>"₹"+n.toLocaleString("en-IN");
const jar=c=>`<svg viewBox="0 0 60 80"><rect x="14" y="4" width="32" height="9" rx="2" fill="#222"/><path d="M12 16h36l4 10v44a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V26z" fill="${c[0]}"/><rect x="8" y="36" width="44" height="22" fill="${c[1]}"/><circle cx="30" cy="47" r="8" fill="#fff"/><text x="30" y="50" font-size="7" text-anchor="middle" fill="#8a1f1f" font-weight="700">BENNY</text></svg>`;
function draw(){const p=P[pi];
$("prods").innerHTML=P.map((x,i)=>`<button aria-pressed="${i==pi}" data-pi="${i}">${x.n.replace(" Flowers Honey","")}</button>`).join("");
$("pn").textContent="Benny Honey – "+p.n;$("pd").textContent=p.d;
$("fimg").src=IMG[pi];$("fimg").alt="Benny Honey "+p.n+" jar";$("himg").src=IMG[pi];
$("sizes").innerHTML=p.s.map((s,i)=>`<button aria-pressed="${i==sel}" data-i="${i}">${s[0]}</button>`).join("");
$("pp").textContent=R(p.s[sel][1]);$("q").textContent=qty;
$("gt").textContent=p.n+" – all sizes";
$("grid").innerHTML=p.s.map((s,i)=>`<div class="card"><div class="jar"><img src="${IMG[pi]}" alt="Benny Honey ${p.n} ${s[0]}"></div><h3>Benny Honey</h3><div class="m">${s[0]} · ${p.n.replace(" Flowers Honey","")}</div><div class="price">${R(s[1])}</div><div class="m" style="margin:-8px 0 12px">${R(Math.round(s[1]/(s[0]=="1 kg"?10:parseInt(s[0])/100)))} per 100g</div><button class="btn out" data-a="${i}">Add to Cart</button></div>`).join("");
$("bs").textContent="Why people choose "+p.n;
$("bl").innerHTML=p.b.map(x=>`<li>${x}</li>`).join("");
}
const nm=c=>`Benny Honey ${P[c.p].n.replace(" Flowers Honey","")} ${P[c.p].s[c.i][0]}`,pr=c=>P[c.p].s[c.i][1];
function cartUI(){
const n=cart.reduce((a,c)=>a+c.n,0),t=cart.reduce((a,c)=>a+c.n*pr(c),0);
$("cnt").textContent=n;$("tot").textContent=R(t);
$("items").innerHTML=cart.length?cart.map((c,k)=>`<div class="it"><div><b>${nm(c)}</b><br>${c.n} × ${R(pr(c))}</div><div style="text-align:right">${R(c.n*pr(c))}<br><button data-r="${k}">Remove</button></div></div>`).join(""):"<p>Your cart is empty. Pick a size to get started.</p>";
const msg="Hi, I want to order: "+cart.map(c=>`${nm(c)} x${c.n}`).join(", ")+`. Total ${R(t)}`;
$("wa").href="https://wa.me/919010379552?text="+encodeURIComponent(msg);
$("wa").style.display=cart.length?"block":"none";
}
function add(i,n){const f=cart.find(c=>c.p==pi&&c.i==i);f?f.n+=n:cart.push({p:pi,i,n});cartUI();tog(true)}
function tog(o){$("drawer").classList.toggle("open",o);$("scrim").classList.toggle("open",o)}
document.addEventListener("click",e=>{const t=e.target;
if(t.dataset.pi){pi=+t.dataset.pi;draw()}
if(t.dataset.i){sel=+t.dataset.i;draw()}
if(t.dataset.a)add(+t.dataset.a,1);
if(t.dataset.r){cart.splice(+t.dataset.r,1);cartUI()}});
$("m").onclick=()=>{qty=Math.max(1,qty-1);$("q").textContent=qty};
$("p").onclick=()=>{qty++;$("q").textContent=qty};
$("add").onclick=()=>{add(sel,qty);qty=1;$("q").textContent=1};
$("open").onclick=()=>tog(true);$("close").onclick=$("scrim").onclick=()=>tog(false);
draw();cartUI();

"use strict";!function(){function t(t,i){return null!=t?t:i}function i(t){this.garden=t,this.reset()}function e(t){this.nodes=[],this.container=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="#000000",this.started=!1,1!==s&&(this.canvas.style.transform="scale("+1/s+")",this.canvas.style.transformOrigin="0 0"),this.canvas.id="nodegarden",this.resize(),this.container.appendChild(this.canvas)}i.prototype.reset=function(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=i.x,s=i.y,n=i.vx,h=i.vy,o=i.m;this.x=t(e,Math.random()*this.garden.width),this.y=t(s,Math.random()*this.garden.height),this.vx=t(n,1*Math.random()-.5),this.vy=t(h,1*Math.random()-.5),this.m=t(o,2*Math.random()+1),this.pos=Math.random()>=.5},i.prototype.addForce=function(t,i){this.vx+=t*i.x/this.m,this.vy+=t*i.y/this.m},i.prototype.distanceTo=function(t){var i=t.x-this.x,e=t.y-this.y,s=Math.sqrt(Math.pow(i,2)+Math.pow(e,2));return{x:i,y:e,total:s}},i.prototype.squaredDistanceTo=function(t){return(t.x-this.x)*(t.x-this.x)+(t.y-this.y)*(t.y-this.y)},i.prototype.collideTo=function(t){t.vx=t.m*t.vx/(this.m+t.m)+this.m*this.vx/(this.m+t.m),t.vy=t.m*t.vy/(this.m+t.m)+this.m*this.vy/(this.m+t.m),this.reset()};var s=window.devicePixelRatio;e.prototype.start=function(){this.playing||(this.playing=!0,this.render(!0))},e.prototype.stop=function(){this.playing&&(this.playing=!1)},e.prototype.resize=function(){this.width=window.innerWidth*s,this.height=window.innerHeight*s,this.area=this.width*this.height,this.nodes.length=Math.sqrt(this.area)/25|0,this.canvas.width=this.width,this.canvas.height=this.height;for(var t=0;t<this.nodes.length;t++)this.nodes[t]||(this.nodes[t]=new i(this))},e.prototype.isNightMode=function(){return document.body.classList.contains("nightmode")},e.prototype.toggleNightMode=function(){document.body.classList.toggle("nightmode"),this.isNightMode()?this.ctx.fillStyle="#ffffff":this.ctx.fillStyle="#000000"},e.prototype.render=function(t){var i=this;if(this.playing){t&&requestAnimationFrame(function(){i.render(!0)}),this.ctx.clearRect(0,0,this.width,this.height);for(var e,s,n,h=0;h<this.nodes.length-1;h++){s=this.nodes[h];for(var o=h+1;o<this.nodes.length;o++){n=this.nodes[o];var a=s.squaredDistanceTo(n),r=3*(s.m*n.m)/a,d=100*r;if(!(.05>d))if(a<=(s.m/2+n.m/2)*(s.m/2+n.m/2))s.m<=n.m?s.collideTo(n):n.collideTo(s);else{var c=s.distanceTo(n),l={x:c.x/c.total,y:c.y/c.total},g=s.pos===n.pos?-1:1;this.ctx.beginPath(),1===g?this.ctx.strokeStyle="rgba(191,63,31,"+(1>d?d:1)+")":this.ctx.strokeStyle="rgba(31,63,191,"+(1>d?d:1)+")",this.ctx.moveTo(s.x,s.y),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),s.addForce(r,l),n.addForce(-r,l)}}}for(var h=0;h<this.nodes.length;h++)e=this.nodes[h],this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.m,0,2*Math.PI),this.ctx.fill(),e.x+=e.vx,e.y+=e.vy,(e.x>this.width+25||e.x<-25||e.y>this.height+25||e.y<-25)&&e.reset()}};var n=window.devicePixelRatio,h=document.getElementById("container"),o=document.getElementsByClassName("moon")[0],a=new e(h);a.start();var r=new Date;(r.getHours()>18||r.getHours()<6)&&a.toggleNightMode();var d=-1;h.addEventListener("click",function(t){d++,d>a.nodes.length-1&&(d=0),a.nodes[d].reset({x:t.pageX*n,y:t.pageY*n,vx:0,vy:0})}),o.addEventListener("click",function(){a.toggleNightMode()}),window.addEventListener("resize",function(){a.resize()})}();

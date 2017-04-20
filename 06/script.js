// SEGÉDFÜGGVÉNYEK
function $(s) {
    return document.querySelector(s);
}

let state = {
    ball:{
        x: undefined,
        y: undefined,
        vx: undefined,
        vy: undefined
    },
    p1:{
        y: undefined,
        score: undefined,
        dir: undefined
    },
    p2:{
        y: undefined,
        score: undefined,
        dir: undefined
    }
}

const canvas = $("#_game");
const ctx = canvas.getContext("2d");
const fps = 60;
const dt = (1000/fps);
const width = canvas.width;
const height = canvas.height;
const barWidth = 12;
const barHeight = 125;

function init(restart){
    if(restart){
        state.p1.score = state.p2.score = 0;
    }
    state.p1.dir = 0;
    state.p2.dir = 0;
    state.p1.y = state.p2.y = Math.round(height/2)-Math.round(barHeight/2);
    state.ball.x = Math.round(width/2);
    state.ball.y = Math.round(height/2);
    state.ball.vx = (Math.random() * width / 3) * (Math.random() < 0.5 ? -1 : 1) / fps;
    state.ball.vy = (Math.random() * height / 3) * (Math.random() < 0.5 ? -1 : 1) / fps;
}

function checkEnd(){

}

function step(){
    state.ball.x += state.ball.vx;
    state.ball.y += state.ball.vy;
    state.p1.y += state.p1.dir;
    state.p2.y += state.p2.dir;
    if(state.ball.y >= height || state.ball.y <= 0){
        state.ball.vy *= -1;
    }

    if((state.ball.x >= width - barWidth && state.p2.y <= state.ball.y && state.ball.y <= state.p2.y+barHeight) ||
        (state.ball.x <= barWidth && state.p1.y <= state.ball.y && state.ball.y <= state.p1.y+barHeight)){
        state.ball.vx *= -1;
    }

    if(state.ball.x >= width){
        state.p1.score += 1;
        init(false);
    }
    if(state.ball.x <= 0){
        state.p2.score += 1;
        init(false);
    }
    draw();
    requestAnimationFrame(step);
}

function draw(){
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#aaaaaa';
    //ball
    ctx.beginPath();
    ctx.arc(state.ball.x,state.ball.y,10,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
    //ütők
    ctx.fillRect(0,state.p1.y,barWidth,barHeight);
    ctx.fillRect(width-barWidth,state.p2.y,barWidth,barHeight);

    ctx.font = '40px sans-serif';
    ctx.fillText(state.p1.score,10,60);
    ctx.fillText(state.p2.score, width-30,60)
}

//input
function keyDown(e){
    if(e.key === 'w'){
        console.log("itt");
        state.p1.dir = -1;
    }
    if(e.key === 's'){
        state.p1.dir = 1;
    }
    if(e.key === 'o'){
        state.p2.dir = -1;
    }
    if(e.key === 'l'){
        state.p2.dir = 1;
    }
}
function keyUp(e){
    if(e.key === 'w'){
        state.p1.dir = 0;
    }
    if(e.key === 's'){
        state.p1.dir = 0;
    }
    if(e.key === 'o'){
        state.p2.dir = 0;
    }
    if(e.key === 'l'){
        state.p2.dir = 0;
    }
}
window.addEventListener('keyUp',keyUp,false);
window.addEventListener('keyDown',keyDown,false);
init(true);
draw();
step();
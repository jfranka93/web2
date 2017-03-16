// SEGÉDFÜGGVÉNYEK
function $(s) {
    return document.querySelector(s);
}

function $$(selector){
    return document.querySelectorAll(selector);
}

function delegate(pSel, type, cSel, fn) {
    const p = $(pSel);
    p.addEventListener(type, function (e) {
        let t;
        for (t = e.target;
             t !== p && !t.matches(cSel);
             t = t.parentNode);
        if (t === p) { return; }
        e.delegatedTarget = t;
        fn.call(t, e);
    }, false);
}

//ÁLLAPOTTÉR
let DEBUG = false;
let gameState = 0;
let game = [];
let markedCount = 0;
let minecount = 0;
let maxX;
let maxY;

function init(x, y, count){
    gameState = 0;
    markedCount = 0;
    maxX = x;
    maxY = y;
    minecount = count;
    game = [];
    for(let i=0;i<x;i++){
        game[i] = [];
        for(let j=0;j<y;j++){
            game[i][j] = {
                isMine: false,
                isRevealed: false,
                isMarked: false,
                neighbourCount: 0
            };
        }
    }

    for(let i=0; i<count; i++){
        let xCoord;
        let yCoord;
        do {
            xCoord = Math.floor(Math.random() * x);
            yCoord = Math.floor(Math.random() * y);
        } while(game[xCoord][yCoord].isMine);
        game[xCoord][yCoord].isMine = true;
        for(let a=-1;a<=1;a++){
            for(let b=-1;b<=1;b++){
                if(xCoord+a >= 0 && 
                xCoord+a < x && 
                yCoord+b >=0 && 
                yCoord+b < y && 
                (a || b)){
                    game[xCoord+a][yCoord+b].neighbourCount++;    
                }
            }
        }
    }
}

function gameOver(){
    gameState = -1;
    for(let x of game){
        for(let y of x){
            y.isRevealed = true;
        }
    }
    $('#_game').innerHTML = genTable(game);
    alert("ggwpnorenoobgitgud");
    //Felfedés
}

function checkVictory(){
    // Ha már csak aknák vannak fel nem fedve
    const notRevealed = game.reduce(function(sum,row){
        sum += row.reduce(function(sum,current){
            sum += current.isRevealed ? 1 : 0; 
        }, 0);
    }, 0);
    if(maxX*maxY-minecount === notRevealed){
        gameState = 1;
        for(let x of game){
            for(let y of x){
                y.isRevealed = true;
            }
        }
        $('#_game').innerHTML = genTable(game);
    }
    // Ha minden akna jól meg van jelölve
    
}

function revealNeighbors(x,y){
    game[x][y].isRevealed = true;
    if(game[x][y].neighbourCount === 0){
        for(let a=-1;a<=1;a++){
            for(let b=-1;b<=1;b++){
                if(x+a >= 0 && 
                x+a < maxX && 
                y+b >=0 && 
                y+b < maxY && 
                (a || b) &&
                !game[x+a][y+b].isRevealed){
                    revealNeighbors(x+a, y+b);    
                }
            }
        }
    }
}

//ESEMÉNYKEZELŐK
function clickStart(){
    let x = $("#_X").value;
    let y = $("#_Y").value;
    let count = $("#_minecount").value;
    init(x,y,count);
    $('#_game').innerHTML = genTable(game);
    $('#_remaining').innerHTML = minecount - markedCount;
}

function leftClickCell(e){
    const x = parseInt(e.delegatedTarget.getAttribute('data-x'));
    const y = parseInt(e.delegatedTarget.getAttribute('data-y'));
    if(game[x][y].isRevealed || game[x][y].isMarked){
        return;
    }
    if(game[x][y].isMine){
        gameOver();
    } else{
        revealNeighbors(x,y);
        $('#_game').innerHTML = genTable(game);
    }
}
delegate('#_game','click','button',leftClickCell);
function rightClickCell(e){
    e.preventDefault();
    const x = e.delegatedTarget.getAttribute('data-x');
    const y = e.delegatedTarget.getAttribute('data-y');
    if(gameState !== 0 || game[x][y].isRevealed){
        return;
    }
    markedCount += (game[x][y].isMarked ? -1 : 1);
    game[x][y].isMarked = !game[x][y].isMarked;
    $('#_game').rows[x].cells[y].innerHTML = genCell(game[x][y],x, y);
    $('#_remaining').innerHTML = minecount - markedCount;

}
delegate('#_game','contextmenu','button',rightClickCell);
//HTML GENERÁTOROK
function genTable(table){
    let html='';
    for(let i=0;i<table.length;i++){
        html += `<tr>`;
        for(let j=0;j<table[i].length;j++){
            html += `<td>${genCell(table[i][j], i, j)}</td>`;
        }
        html += `</tr>`;
    }
    return html;
}

function genCell(cell, x, y){
    if(DEBUG){
        return `<button>${cell.isMine ? '¤' : cell.neighbourCount}</button>`
    }else{
        return `<button data-x="${x}" data-y="${y}">${cell.isRevealed ? (cell.isMine ? '¤' : cell.neighbourCount) : (cell.isMarked ? '÷' : '&nbsp;')}</button>`
    }
}
$("#_start").addEventListener("click",clickStart,false);
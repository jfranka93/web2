//Segedfuggvenyek
function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
}
//Adatok, feldolgozok
let history = [];

function calculate(a, b, o){
    a=parseFloat(a);
    b=parseFloat(b);
    switch(o){
        case '+':
            return a+b;
            break;
        case '-':
            return a-b;
            break;
        case '*':
            return a*b;
            break;
        case '/':
            return a/b;
            break;
    }
}
//Esemenykezelok
function clickButtonHandler(){
    //Beolvasas
    let a = $('#_operand1').value;
    let b = $('#_operand2').value;
    let o = $('#_operator').value;
    //Feldolgozas
    let result = calculate(a,b,o);
    history.push({
        operand1: a,
        operand2: b,
        operator: o
    });
    //Kiiras
    $('#_result').innerHTML = result;
    //$('#_history').innerHTML = JSON.stringify(history);
    $('#_history').innerHTML = genTable(history);
}
$('#_submit').addEventListener('click',clickButtonHandler,false);

function clickPlusGen(id){
    return function () {
        $('#'+id).value =  (parseFloat($('#'+id).value) || 0) + 1;
    }
}

function clickMinusGen(id){
    return function () {
        $('#'+id).value =  (parseFloat($('#'+id).value) || 0) - 1;
    }
}
//html generatorok
function genTable(x){
    let html='';
    for(let i=0;i<x.length;i++){
        html+=genRow(history[i]);
    }
    return html;
}
function genRow(xRow){
    return `<tr><td>${xRow.operand1}${xRow.operator}${xRow.operand2}</td></tr>`;
}
function genPlus(id){
    return `<button onclick="clickPlusGen('${id}')()">+</button>`;
}
function genMinus(id){
    return `<button onclick="clickMinusGen('${id}')()">-</button>`;
}
//inicializacio
let inputs = $$('input[type=number]');
for(let i=0;i<inputs.length;i++){
    inputs[i].outerHTML = 
                        genPlus(inputs[i].getAttribute('id'))
                        +inputs[i].outerHTML+
                        genMinus(inputs[i].getAttribute('id'));
}
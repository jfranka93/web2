//SEGÉDFV
function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
}

function delegate(parentSelector, eventType, childSelector, fn){
    const parent = $(parentSelector);//szülőelem DOM object
    
    function handler(event){
        let target = event.target;
        while(target !== parent && !target.matches(childSelector)){
            target = target.parentNode;
        }
        if(target === parent){
            return;
        }
        event.delegatedTarget = target;
        return fn.call(parent, event);
    }
    parent.addEventListener(eventType,handler,false);
}
//Adatok
let o1,o2,op;

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
//KeseményEzelők
function clickButton(event){
    const button = event.delegatedTarget;
    if (!isNaN(parseInt(button.innerHTML))) {
        const number = parseInt(button.innerHTML);
        $('#_screen').innerHTML += button.innerHTML;
    } else if (button.innerHTML === "=") {
        o2 = parseInt($('#_screen').innerHTML);
        let result = calculate(o1,o2,op);
        $('#_screen').innerHTML = result;
        o1 = result;
        o2 = undefined;
        op = undefined;
    } else {
        if(o1 !== undefined){
            o2 = parseInt($('#_screen').innerHTML);    
            let result = calculate(o1,o2,op);
            $('#_screen').innerHTML = result;
            o1 = result;
            o2 = undefined;
            op = button.innerHTML;
        }else{
            op = button.innerHTML;
            o1 = parseInt($('#_screen').innerHTML);
            $('#_screen').innerHTML = "";
        }
    }
}
delegate('#_calculator','click','button',clickButton);
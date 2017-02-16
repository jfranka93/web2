console.log("Blood for the Blood God");
let x;
x = prompt('Gimme a numbah yo');

//function
//---------------------------
function fakt(x){
    let f = 1;
    for(let i = 1; i<=x; i++){
        f *= i;
    }
    return f;
}
//console.log(fakt(x));
//alert(fakt(x));
for(let i=1;i<=6;i++){
    //document.write('<h'+i+'>'+ fakt(x)+'</h'+i+'>');
    document.write(`<h${i}>`+ fakt(x)+`</h${i}>`); //template-string
}
//---------------------------

//tömb+keresés
//---------------------------
let t = [1,2,3];
let result = search(t);
alert(result);

function search(x){
    let i = 0;
    let found = false;
    while(!found && i<t.length){
        if(x[i] === true){
            found = true;
        }
        i++;
    }
    return found;
}
//---------------------------

//Objektum
//---------------------------
let data =[
    {
        szerzo : 'J.R.R.Tolkien',
        cim: 'A gyűrűk ura',
        kiadas: 1954,
        kiado: 'Allen & Unwin'
    },
    {
        szerzo : 'Galaxis Útikalauz Stopposoknak',
        cim: 'Douglas Adams',
        kiadas: undefined,
        kiado: undefined
    }
];
alert(data[0].cim);
//---------------------------
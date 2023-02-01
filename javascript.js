const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('.range-text');
const size=document.querySelector('#size')
const borderChange=document.querySelector('#border-change')

rangeText.innerHTML=size.value+' x '+size.value
//initial grid
makeGrid(size.value,size.value);

//--------functions-------

//generates the grid
function makeGrid(rows,columns){
    for(let i=0; i<rows;i++){
        let row=document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        
        for(let j=0; j<columns; j++){
            let column=document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);
        }
    }
}


//size slider
function sizeChange() {
    container.innerHTML=''
    rangeText.innerHTML=size.value+' '+'x'+' '+size.value;
    makeGrid(size.value,size.value);
    // to check if border is on or off
    if (borderChange.innerHTML.includes('ON')){
        createBorder();
        return;
    }
    removeBorder();
}

//to toggle border
function removeBorder(){
    var column=document.querySelectorAll('.column');
    column.forEach(elem=>elem.style.border='0px');
}

function createBorder(){
    var column=document.querySelectorAll('.column');
    column.forEach(elem=>elem.style.border='1px solid black');
}

function toggleBorder(b){
    if (b.innerHTML.includes('OFF')){
        createBorder();
        b.innerHTML='Border: ON';
        return;
    }

    removeBorder(); 
    b.innerHTML='Border: OFF' ;

}

//------EVENTS-----
borderChange.addEventListener('click',()=>toggleBorder(borderChange))
size.oninput=sizeChange




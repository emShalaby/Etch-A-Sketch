const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('#range-text');
const size=document.querySelector('#size');
const borderChange=document.querySelector('#border-change');
const body=document.querySelector('body');
const darken=document.querySelector('#darken');
const eraser=document.querySelector('#eraser');
const colorBtn=document.querySelector('#color-mode');
const btnArray=[darken,eraser,colorBtn];

//initial range text
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
    if (eraser.classList.contains('ON')) {
        colorable(color='white');
        return;}
    else if(colorBtn.classList.contains('ON')) colorable('black');

    
}

//to make the grid boxes colorable
function colorable(color){
    var columnClass=document.querySelectorAll('.column');
    columnClass.forEach(element=>element.addEventListener('mouseover',()=>coloring(elem=element,color=color)));
}

//function that manages everything when u change the slider value
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

function coloring(elem,color='black'){
    elem.style.backgroundColor=color;
}

function clearContainer(){
    var columnClass=document.querySelectorAll('.column');
    columnClass.forEach(element=>element.style.backgroundColor='white');
}

function darkenEffect(elem){
    
}

//for one time click buttons
function buttonFlash(elem){
    elem.style.backgroundColor='rgb(77, 3, 3)'
    setTimeout(()=>elem.style.backgroundColor='rgb(68, 61, 61)',100);
}

function erasing(){
    if (eraser.classList.contains('ON')){
    var columnClass=document.querySelectorAll('.column');
    columnClass.forEach(element=>element.replaceWith(element.cloneNode(true)));
    colorable('white');
    }
    else colorable('black');
}

function toggleButton(btn){
    btnArray.forEach(elem=>elem.classList.remove('ON'));
    btn.classList.toggle('ON');
}

//for buttons that can be turned off / on without affecting others
function toggleButton2(btn){
    btn.classList.toggle('ON');
}
//------EVENTS-----
eraser.addEventListener('click',()=>toggleButton(eraser));
darken.addEventListener('click',()=>toggleButton(darken));
borderChange.addEventListener('click',()=>toggleButton2(borderChange));
borderChange.addEventListener('click',()=>toggleBorder(borderChange));
colorBtn.addEventListener('click',()=>toggleButton(colorBtn));
size.oninput=sizeChange;
clear.addEventListener('click',clearContainer);
clear.addEventListener('click',()=>buttonFlash(clear));
eraser.addEventListener('click',erasing);
colorBtn.addEventListener('click',()=>colorable(color='black'));





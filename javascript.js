const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('#range-text');
const size=document.querySelector('#size');
const borderChange=document.querySelector('#border-change');
const body=document.querySelector('body');
const eraser=document.querySelector('#eraser');
const colorBtn=document.querySelector('#color-mode');
const rainbowBtn=document.querySelector('#rainbow');
const btnArray=[eraser,colorBtn,rainbowBtn];
const bodyStyles = window.getComputedStyle(body);
const bodyBackgroundColor = bodyStyles.getPropertyValue("background-color");
const canvas = document.getElementById("color-wheel");
const ctx = canvas.getContext("2d");
const image=ctx.createImageData(100,100);//creates an array that will have 4000 indices the first four will be the rgba values for the first pixel ie the mostupperleft pixel and so on..
const data=image.data;
const r=document.querySelector('#red');
const g=document.querySelector('#green');
const b=document.querySelector('#blue');
canvasColor()
function canvasColor(r=255,g=0,b=0,a=255){
    for(let i=0; i<(100*100*4); i+=4){
    data[i]=r;
    data[i+1]=g;
    data[i+2]=b;
    data[i+3]=a;
    }
    ctx.putImageData(image,0,0);
}
//the 0,0 are dx and dy value



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
    else if(rainbowBtn.classList.contains('ON')) rainbow();
    
}

//to make the grid boxes colorable used the help of chatGPT

function colorable(color='black'){
    const columns = document.querySelectorAll('.column');
    
    let mouseDown = false;
    
    columns.forEach(column => {
      
      column.addEventListener('click',()=>{
        column.style.backgroundColor=color;
      })
      
      column.addEventListener('mousedown', () => {
        mouseDown = true;
      });
      column.addEventListener('mouseup', () => {
        mouseDown = false;
      });
      column.addEventListener('mouseenter', () =>{
        if (mouseDown) {
            column.style.backgroundColor=color;
        }
      });
    });
    }

//for the rainbow effect
function rainbow(){
        const columns = document.querySelectorAll('.column');
        
        let mouseDown = false;
        
        columns.forEach(column => {
          
          column.addEventListener('click',()=>{
            column.style.backgroundColor=randomRgb();
          })
          
          column.addEventListener('mousedown', () => {
            mouseDown = true;
          });
          column.addEventListener('mouseup', () => {
            mouseDown = false;
          });
          column.addEventListener('mouseenter', () =>{
            if (mouseDown) {
                column.style.backgroundColor=randomRgb();
            }
          });
        });
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



//for one time click buttons
function buttonFlash(elem){
    elem.style.backgroundColor='rgb(77, 3, 3)'
    setTimeout(()=>elem.style.backgroundColor=bodyBackgroundColor,100);
}

function erasing(){
    if (eraser.classList.contains('ON')){
    var columnClass=document.querySelectorAll('.column');
    columnClass.forEach(element=>element.replaceWith(element.cloneNode(true)));
    colorable('white');
    }
    
}


//if the only that specific button can be on
function toggleButtonAll(btn){
    btnArray.forEach(elem=>elem.classList.remove('ON'));
    btn.classList.toggle('ON');
}
//for other cases


//for buttons that can be turned off / on without affecting others
function toggleButton2(btn){
    btn.classList.toggle('ON');
}


function randomRgb(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

//------EVENTS-----

eraser.addEventListener('click',()=>toggleButtonAll(eraser));
borderChange.addEventListener('click',()=>toggleButton2(borderChange));
borderChange.addEventListener('click',()=>toggleBorder(borderChange));
colorBtn.addEventListener('click',()=>toggleButtonAll(colorBtn));
rainbowBtn.addEventListener('click',()=>toggleButtonAll(rainbowBtn));
rainbowBtn.addEventListener('click',rainbow);
size.oninput=sizeChange;
clear.addEventListener('click',clearContainer);
clear.addEventListener('click',()=>buttonFlash(clear));
eraser.addEventListener('click',erasing);
colorBtn.addEventListener('click',()=>colorable(color='black'));


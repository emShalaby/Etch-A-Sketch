const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('#range-text');
const size=document.querySelector('#size');
const borderChange=document.querySelector('#border-change');
const body=document.querySelector('body');
const eraser=document.querySelector('#eraser');
const colorBtn=document.querySelector('#brush');
const rainbowBtn=document.querySelector('#rainbow');
const bodyStyles = window.getComputedStyle(body);
const bodyBackgroundColor = bodyStyles.getPropertyValue("background-color");
const brush=document.querySelector(".brush");
const canvasColor=document.querySelector("#canvas");
const btnArray=[eraser,brush,rainbowBtn];



//initial range text
rangeText.innerHTML=size.value+' x '+size.value
//initial grid
makeGrid(size.value,size.value);

//--------functions-------
//generates the grid
function makeGrid(rows,columns,canvasCol=canvasColor.value){
    container.innerHTML=''
    for(let i=0; i<rows;i++){
        let row=document.createElement('div');
        row.classList.add('row');
        row.style.backgroundColor=canvasCol;
        container.appendChild(row);
        
        for(let j=0; j<columns; j++){
            let column=document.createElement('div');
            column.classList.add('column');
            column.style.background=canvasCol;
            row.appendChild(column);
        }
    }
    if (eraser.classList.contains('ON')) {
        colorable(color=canvasColor.value);
        return;}
    else if(brush.classList.contains('ON')) colorable(colorBtn.value);
    else if(rainbowBtn.classList.contains('ON')) rainbow();
    
}

//to make the grid boxes colorable used the help of chatGPT

function colorable(color=colorBtn.value){
    const columns = document.querySelectorAll('.column');
    
    let mouseDown = false;
    
    columns.forEach(column => {
      
      column.addEventListener('click',()=>{
     column.style.backgroundColor=color;
        
        if (eraser.classList.contains('ON')){
            column.classList.remove('brushed');

        }
        else column.classList.add('brushed');
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

            if (eraser.classList.contains('ON')){
                column.classList.remove('brushed');
    
            }
            else column.classList.add('brushed');
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
    if (borderChange.classList.contains('ON')){
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

function toggleBorder(btn){
    if (btn.classList.contains('ON')==false) createBorder();
    else removeBorder();
    btn.classList.toggle('ON')
}

function coloring(elem,color='black'){
    elem.style.backgroundColor=color;
}

function clearContainer(){
    var columnClass=document.querySelectorAll('.column');
    columnClass.forEach(element=>{
        element.style.backgroundColor=canvasColor.value;
        element.classList.remove('brushed');
    }
        );
}



//for one time click buttons
function buttonFlash(elem){
    elem.style.backgroundColor=bodyBackgroundColor
    setTimeout(()=>elem.style.backgroundColor='gray',200)
    ;
}

function erasing(){
    if (eraser.classList.contains('ON')){
    var columnClass=document.querySelectorAll('.column');
    columnClass.forEach(element=>{
        element.replaceWith(element.cloneNode(true))
        element.classList.remove('brushed');
    }
        );
    colorable(canvasColor.value);
    }
    
}


//if the only that specific button can be on
function toggleButtonAll(btn){
    btnArray.forEach(elem=>elem.classList.remove('ON'));
    btn.classList.toggle('ON');
}





function randomRgb(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

function canvasChange(){

    const columns = document.querySelectorAll('.column');
    const canvasColor=document.querySelector('#canvas').value;

    columns.forEach(column=>{
        if(column.classList.contains('brushed')!=true){
            column.style.backgroundColor=canvasColor;
        }

    })}


//------EVENTS-----

eraser.addEventListener('click',()=>toggleButtonAll(eraser));
borderChange.addEventListener('click',()=>toggleBorder(borderChange));
brush.addEventListener('click',()=>toggleButtonAll(brush));
rainbowBtn.addEventListener('click',()=>toggleButtonAll(rainbowBtn));
rainbowBtn.addEventListener('click',rainbow);

size.oninput=sizeChange;
clear.addEventListener('click',clearContainer);
clear.addEventListener('click',()=>buttonFlash(clear));
eraser.addEventListener('click',erasing);
brush.addEventListener('click',()=>colorable(colorBtn.value));

colorBtn.addEventListener('input',()=>colorable(colorBtn.value));
canvasColor.addEventListener('input',canvasChange);

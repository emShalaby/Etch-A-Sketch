const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('#range-text');
const size=document.querySelector('#size');
const borderChange=document.querySelector('#border-change');
const body=document.querySelector('body');
const eraser=document.querySelector('#eraser');
const colorBtn=document.querySelector('#brush');
const rainbowBtn=document.querySelector('#rainbow');
const btnArray=[eraser,colorBtn,rainbowBtn];
const bodyStyles = window.getComputedStyle(body);
const bodyBackgroundColor = bodyStyles.getPropertyValue("background-color");
const saveBtn=document.querySelector('#save');
let canvasColor='white';
let brushColor='black';

const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'nano', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: false
        }
    }
});
const pickr2 = Pickr.create({
    el: '.color-picker',
    theme: 'nano', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: false
        }
    }
});
//initial range text
rangeText.innerHTML=size.value+' x '+size.value
//initial grid
makeGrid(size.value,size.value);

//--------functions-------
//generates the grid
function makeGrid(rows,columns,canvasCol=canvasColor){
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
        colorable(color=canvasColor);
        return;}
    else if(colorBtn.classList.contains('ON')) colorable(brushColor);
    else if(rainbowBtn.classList.contains('ON')) rainbow();
    
}

//to make the grid boxes colorable used the help of chatGPT

function colorable(color=brushColor){
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
    columnClass.forEach(element=>element.style.backgroundColor=canvasColor);
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
    colorable(canvasColor);
    }
    
}


//if the only that specific button can be on
function toggleButtonAll(btn){
    btnArray.forEach(elem=>elem.classList.remove('ON'));
    btn.classList.toggle('ON');
}
//for other cases


//for buttons that can be turned off / on without affecting others


function randomRgb(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

//------EVENTS-----

eraser.addEventListener('click',()=>toggleButtonAll(eraser));
borderChange.addEventListener('click',()=>toggleBorder(borderChange));
colorBtn.addEventListener('click',()=>toggleButtonAll(colorBtn));
rainbowBtn.addEventListener('click',()=>toggleButtonAll(rainbowBtn));
rainbowBtn.addEventListener('click',rainbow);
size.oninput=sizeChange;
clear.addEventListener('click',clearContainer);
clear.addEventListener('click',()=>buttonFlash(clear));
eraser.addEventListener('click',erasing);
colorBtn.addEventListener('click',()=>colorable(brushColor));
pickr2.on('change',(...args)=> {
    pickr2.applyColor(silent=true);
    brushColor=args[0].toRGBA();
    colorable(brushColor);    
})
pickr.on('change',(...args)=> {
    pickr.applyColor(silent=true);
    canvasColor=args[0].toRGBA();
    makeGrid(size.value,size.value);
    
})
saveBtn.addEventListener('click',()=>buttonFlash(saveBtn));

saveBtn.addEventListener("click", function() {
    html2canvas(document.querySelector(".container")).then(canvas => {
      var link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });
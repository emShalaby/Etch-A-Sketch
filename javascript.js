const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('.range-text');
const size=document.querySelector('#size')

rangeText.innerHTML=size.value+' '+'x'+' '+size.value

size.oninput=()=>rangeText.innerHTML=size.value+' '+'x'+' '+size.value



for (let i=0; i<256; i++){
    
    container.innerHTML+="<div class='box'></div>";

}

const boxes=document.querySelectorAll('.box');

boxes.forEach(function (box){
    box.addEventListener('mouseover',()=>changeColor(box));
}
)


function changeColor(elem){
elem.style.backgroundColor='black';
}

clear.addEventListener('click',clearBoxes);

function clearBoxes(){
    boxes.forEach(function(box){
        box.style.backgroundColor='white';
    }
    )
}




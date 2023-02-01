const container=document.querySelector('.container');
const clear=document.querySelector('#clear');



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




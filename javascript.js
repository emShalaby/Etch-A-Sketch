const container=document.querySelector('.container');


for (let i=0; i<256; i++){
    
    container.innerHTML+="<div class='box'></div>";

}

const box=document.querySelectorAll('.box');

box.forEach(function (square){
    square.addEventListener('mouseover',function(){
        square.style.backgroundColor='black'
    })
}
)






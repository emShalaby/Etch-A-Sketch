const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('.range-text');
const size=document.querySelector('#size')

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
makeGrid(16,16);


//size slider
rangeText.innerHTML=size.value+' '+'x'+' '+size.value
size.oninput=()=>rangeText.innerHTML=size.value+' '+'x'+' '+size.value



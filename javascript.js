const container=document.querySelector('.container');
const clear=document.querySelector('#clear');
const rangeText=document.querySelector('.range-text');
const size=document.querySelector('#size')

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
//initial grid
makeGrid(size.value,size.value);

//size slider
rangeText.innerHTML=size.value+' x '+size.value
size.oninput=sizeChange
function sizeChange() {
    container.innerHTML=''
    rangeText.innerHTML=size.value+' '+'x'+' '+size.value;
    makeGrid(size.value,size.value);

}



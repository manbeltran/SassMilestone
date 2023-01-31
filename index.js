// defining variables to append elements into HTML
const grid = document.getElementById('grid')
const result = document.getElementById('resultMessage')
const restart = document.getElementById('restart')
//turn 1 will be the starting player, in this case 'X'
let boxes;
let turn1 = true;
let currentCombo;
// all possible winning combinations in grid

let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//gameStart function will run upon loading, will generate the grid, passing empty string to signify game being loaded for the first time

gameStart ();



//for loop that iterates 9 times in order to create a 3x3 grid

function gameStart () {
    let box
    for(let x=0;x<9;x++){

        box = document.createElement('div');
        box.classList.add('box');
        grid.appendChild(box);

        box.addEventListener('click', click, {once : true}); // once a user clicks, one event will be triggered and box will not be clicked twice
    }


}

boxes = document.querySelectorAll('.box') // ties the variable boxes to the individual boxes RETURNS NODE LIST
// this function handles logic for what happens after a click, adds X and O and changes turn, also checks for win condition every time a user selects a square
function click(e) {
    let selectedBox = e.target;

    if (turn1) {
        selectedBox.innerText = 'X';
        turn1 = false;
    } else {
        selectedBox.innerText = 'O'
        turn1 = true;
    }

    let currentBox = selectedBox.innerText // stores current selection in this variable

    let win = checkForWinner(currentBox); // will check if win condition has been met

    if (win){
        over('win', currentBox);
    } else if (draw()){
        over('draw', currentBox)
    }
}



// function to iterate through array of winning combos, and for every array inside of it
// https://www.youtube.com/watch?v=O0tfoMN9Rjo reference for building win condition
////https://www.w3schools.com/jsref/jsref_some.asp reference for learning about .some method
function checkForWinner(currentBox){
    return winningCombinations.some((combo) => {
        
        return combo.every((item) => boxes[item].innerText === currentBox)
    })
}

//game over by win function
function over (type, currentBox){

    if(type==='win') {{
        result.innerText = currentBox + " wins the game!"
    }

    } else {
        result.innerText = "Match is a draw!";
    }
    grid.style.pointerEvents = 'none';
    

}

//game draw function
//https://www.youtube.com/watch?v=O0tfoMN9Rjo reference for building draw conditions
//https://attacomsian.com/blog/javascript-convert-nodelist-to-array#:~:text=In%20modern%20JavaScript%2C%20the%20simplest,an%20array%20const%20divsArr%20%3D%20Array.
//Reference for creating an array from a nodelist ^^

function draw (){
    const boxArray = Array.from(boxes)
    return boxArray.every(
        (box) => box.innerText ==="X" || box.innerText === "O"
    );

}
//restart game event listener on button

document.getElementById('restart').addEventListener('click', function(){
    location.reload();
    return false;
})


const gameInfo = document.querySelector(".game-info");
// const tic-tac-toe = document.querySelector(".tic-tac-toe");
const newgameBtn = document.querySelector(".btn");
const boxes  = document.querySelectorAll(".box");

let boxGrid;
let currentPlayer;

let win = 
[
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6],
];

function initGame()
{
    currentPlayer = "X";
    newgameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    // empty grid 
    boxGrid = ["","","","","","","","","" ];

    // empty ui
    boxes.forEach((box , index) =>
    {
        box.innerText = "";
    })

    // remove win green 
    boxes.forEach((box , index) =>
    {
        boxes[index].classList.remove("win");
    })

    // reset pointer to clickable
    boxes.forEach((box) =>
    {
        box.style.pointerEvents = "all";
    })
}

initGame();

boxes.forEach((box , index) =>
{
    box.addEventListener("click" ,() =>
    {
    setonclink(index);
    })
});

function setonclink(index)
{
    if(boxGrid[index] === "")
    {
        boxGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        switchplayer();

        checkGameOver();
    }
}

function switchplayer()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "0";
    }
    else
    {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver()
{
    let answer = "";
    // console.log(boxGrid);
    win.forEach((position) =>
    {   
        // console.log(boxGrid[position[0]] , boxGrid[position[1]] , boxGrid[position[2]])
        if((boxGrid[position[0]] != "" || boxGrid[position[1]] != "" || boxGrid[position[2]] != "") 
        && (boxGrid[position[0]] === boxGrid[position[1]]) 
        && (boxGrid[position[1]] === boxGrid[position[2]]) 
        && (boxGrid[position[2]] === boxGrid[position[0]]))
        {
            // console.log("win", answer);
            if(boxGrid[position[0]] === "X")
            {
                answer = "X";
            }
            else
            {
                answer = "0";
            }
            // console.log("win", answer);

            // stop taken click once the winner is got 
            boxes.forEach((box) =>
            {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");    
            boxes[position[1]].classList.add("win");    
            boxes[position[2]].classList.add("win");    
            return false;         
            // didnt work for terminate 
        }
    });

    if(answer != "")
    {
        gameInfo.innerText = `winner Player - ${answer}`;
        newgameBtn.classList.add("active");
        return;
    }
    
    let fillCount = 0;
    boxGrid.forEach((box) => 
    {
        if(box != "")
        fillCount++;
    });
    
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied";
        newgameBtn.classList.add("active");
    }
}

newgameBtn.addEventListener('click' , ()=>
{
    initGame();
})

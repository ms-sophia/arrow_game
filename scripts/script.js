let arrowComp = []; 
let arrowUser = [];
let keys= [];
let cnt = 0;
let minutes = 1;
let seconds = 0;
let countPoint = 0;
let numOfArrows = 6;
let arrowOriginalColor = "#c21717"

function createArrow()
{
    console.log(`entered createArrow`);
    console.log(`number of Arrow:${numOfArrows}`);
    var number = 0;
    cnt = 0;
    while (cnt < numOfArrows)
        {
        number = Math.floor(Math.random()*numOfArrows)+1;
        console.log(number)
        switch (number) {
            case 1:
            arrowComp.push('right');
            keys.push('ArrowRight');
            
            // direction = 'right';
            // eventKey = 'ArrowRight';
            break;
            case 2:
            arrowComp.push('down');
            keys.push('ArrowDown');
            // direction = 'down'
            // eventKey = 'ArrowDown';
            break;
            case 3:
            arrowComp.push('left');
            keys.push('ArrowLeft');
            // direction = 'left'
            // eventKey = 'ArrowLeft';
            break;
            case 4:
            arrowComp.push('up');
            keys.push('ArrowUp');
            // direction = 'up'
            // eventKey = 'ArrowUp';
            break;
            default:
            arrowComp.push('right');
            keys.push('ArrowRight');
            // direction = 'right'
            // eventKey = 'ArrowRight';
            break
            
        }
        cnt++;
    }
    
}    

function displayArrow()
{
    console.log(`entered displayArrow`);
    for (let i = 0; i < numOfArrows; i++)
        {
        var icon_i = document.getElementById(`arrow_${i}`);
        icon_i.classList.remove('fa-arrow-right', 'fa-arrow-left', 'fa-arrow-up', 'fa-arrow-down');
        icon_i.classList.add('fa-arrow-'+arrowComp[i]);
    }
}

function startTimer()
{
    console.log(`entered startTimer...`);
    timer = setInterval(updateTimer, 1000);
}

function formatTime(minutes, seconds)
{
    // console.log(`entered formatTime...`);
    return (`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`); 
    
}

function updateTimer()
{
    console.log(`entered updateTimer...`);
    var displayTimer = document.getElementById('timer');
    displayTimer.textContent = formatTime(minutes, seconds);
    
    if (minutes === 0 && seconds === 0)
        {
        clearInterval(timer)
    }
    else
    {
        if (seconds > 0) {
            seconds--;
        }
        else
        {
            seconds = 59;
            minutes--;
        }
        
    }
}

function restartTimer()
{
    console.log(`entered restartTimer...`);
    clearInterval(timer);
    
    var displayTimer = document.getElementById('timer');
    minutes = 1;
    seconds = 0;
    displayTimer.textContent = formatTime(minutes, seconds);
    intialize();
}

function intialize()
{
    console.log(`entered initialize...`);
    cnt = 0;
    arrowComp = [];
    arrowUser = [];
    keys = [];
    
    for (let i = 0; i < numOfArrows; i++){
        document.getElementById( `arrow_${0}`).style.color = arrowOriginalColor;
    }
    
}

async function userInput() {
    console.log(`entered userInput...`);
    return new Promise((resolve) => {
        document.addEventListener('keydown', function onKeyPress(event) {
            arrowUser.push(event.key)
            document.removeEventListener('keydown', onKeyPress);
            resolve(); 
        });
    });
}

async function game() {
    console.log('Game is starting...');
    
    var displayPoints = document.getElementById('counter');
    
    while (true) {
        
        // * create the arrows for user to follow, has also randomizer inside
        arrowComp = createArrow();
        
        // // * display arrow 
        displayArrow();
        
        
        await userInput();
        
        if (keys[cnt] === arrowUser[cnt])
            {
            messageBoard.textContent = 'Correct Arrow';
            countPoint++;
            document.getElementById(`arrow_${String(cnt)}`).style.color = "yellow";
            cnt++;
            if (cnt === 4)
                {
                console.log(`this is entered cnt=4`);
            }
            
        }
        else
        {
            messageBoard.textContent = 'Wrong Arrow';
            
            // * initialize arrays,points and count
            countPoint = 0;    
            intialize(); 
        }
        
        console.log(`Count:${cnt}`);
        displayPoints.textContent = countPoint + " points";

    }
    
    
}

createArrow();
displayArrow();

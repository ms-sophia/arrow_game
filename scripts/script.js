let icons = []; 
let arrowUser = [];
let keys= [];
let cnt = 0;
let minutes = 0o0;
let seconds = 0o0;
let hours = 0o0;
let points = 0;
let numOfArrows = 6;
let arrowOriginalColor = "#c21717"
let arrowCorrectColor = "#fea712"
let IsStop = false;

function createArrow()
{
    console.log(`entered createArrow`);
    // console.log(`number of Arrow:${numOfArrows}`);
    var number = 0;
    var counter = 0;
    while (counter < numOfArrows)
        {
        number = Math.floor(Math.random()*numOfArrows)+1;
        // console.log(number)
        switch (number) {
            case 1:
            // arrowComp.push('right');
            // keys.push('ArrowRight');
            
            direction = 'right';
            eventKey = 'ArrowRight';
            break;
            case 2:
            // arrowComp.push('down');
            // keys.push('ArrowDown');
            direction = 'down'
            eventKey = 'ArrowDown';
            break;
            case 3:
            // arrowComp.push('left');
            // keys.push('ArrowLeft');
            direction = 'left'
            eventKey = 'ArrowLeft';
            break;
            case 4:
            // arrowComp.push('up');
            // keys.push('ArrowUp');
            direction = 'up'
            eventKey = 'ArrowUp';
            break;
            default:
            // arrowComp.push('right');
            // keys.push('ArrowRight');
            direction = 'right'
            eventKey = 'ArrowRight';
            break
            
        }
        icons.push(direction);
        keys.push(eventKey);
        counter++;
        
    }
}    

function displayArrow()
{
    console.log(`entered displayArrow`);
    for (let i = 0; i < numOfArrows; i++)
        {
        var icon_i = document.getElementById(`arrow_${i}`);
        icon_i.classList.remove('fa-circle-arrow-right', 'fa-circle-arrow-left', 'fa-circle-arrow-up', 'fa-circle-arrow-down');
        icon_i.classList.add('fa-circle-arrow-'+icons[i]);
    }
}

function startTimer()
{
    console.log(`entered startTimer...`);
    timer = setInterval(updateTimer, 1000);
}


function updateTimer()
{
    // console.log(`entered updateTimer...`);
    var displayTimer = document.getElementById('timer');
    if (seconds < 60)
        {
        seconds++;
    }
    if (seconds === 60)
        {
        minutes++;
        seconds = 0;
    }
    
    if (minutes === 60)
        {
        hours++;
        minutes = 0;
        seconds = 0;
    }
    
    if (hours === 60)
        {
        minutes = 0;
        seconds = 0;
    }
    
    displayTimer.textContent = formatTime(hours,minutes,seconds);
    
    
}
function formatTime(hours,minutes,seconds)
{
    return (`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`); 
    
}


function restartTimer()
{
    console.log(`entered restartTimer...`);
    clearInterval(timer);
    
    var displayTimer = document.getElementById('timer');
    minutes = 0;
    seconds = 0;
    hours = 0;
    displayTimer.textContent = formatTime(hours,minutes,seconds);
}

function initialize()
{
    console.log(`entered initialize...`);
    cnt = 0;
    icons = [];
    arrowUser = [];
    keys = [];
    for (let i = 0; i < numOfArrows; i++){
        document.getElementById( `arrow_${String(i)}`).style.color = arrowOriginalColor;
    }
    createArrow();
    displayArrow();
}

async function userInput() {
    console.log(`entered userInput...`);
    return new Promise((resolve) => {
        document.addEventListener('keydown', function onKeyPress(event) {
            arrowUser.push(event.key)
            // console.log(`Event key:${arrowUser}`);
            document.removeEventListener('keydown', onKeyPress);
            resolve(); 
        });
    });
}

async function game() {
    console.log('Game is starting...');
    var displayPoints = document.getElementById('counter');
    cnt = 0;
    points = 0;
    createArrow();
    displayArrow();
    console.log(`COUNTING:${cnt}...`);
    arrowUser.pop();
    while (true) {
        
        await userInput();
        console.log(`arrowUser:${arrowUser}`);
        if (arrowUser[cnt] === keys[cnt]) {
            console.log(`CORRECT`);
            displayPoints.textContent = `${++points} points`;
            document.getElementById(`arrow_${cnt}`).style.color = arrowCorrectColor;
            cnt++;
            if (cnt === 6)
                {
                initialize();
            }
        }
        else
        {
            displayPoints.textContent = 'Try again. Please Press Enter';
            restartTimer();
            initialize();
            
        }
        console.log(`arrowUser:${arrowUser}`);
        console.log(`Keys:${keys}`);
        
        displayArrow();
    }
    
    
}

async function main()
{
    console.log(`Main is starting...`);
    
    while (!IsStop){
        document.getElementById('messageBoard').textContent = "Press Enter to Start Game"
        await userInput();
        if (arrowUser[0] === 'Enter') {
            // arrowUser.pop();
            
            console.log(`userInput:${arrowUser}`);
            
            game();
        }
        else {
            IsStop = true;
        }
    }
}

main();
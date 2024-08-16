let icons = []; 
let arrowUser = [];
let keys= [];
let cnt = 0;
let minutes = 0o0;
let seconds = 0o0;
let hours = 0o0;
let numOfArrows = 6;
let arrowOriginalColor = "white"
let arrowCorrectColor = "#fea712"

function createArrow()
{
    console.log(`entered createArrow`);
    var number = 0;
    var counter = 0;
    while (counter < numOfArrows)
        {
        number = Math.floor(Math.random()*numOfArrows)+1;
        // console.log(number)
        switch (number) {
            case 1:
            direction = 'right';
            eventKey = 'ArrowRight';
            break;
            case 2:
            direction = 'down'
            eventKey = 'ArrowDown';
            break;
            case 3:
            direction = 'left'
            eventKey = 'ArrowLeft';
            break;
            case 4:
            direction = 'up'
            eventKey = 'ArrowUp';
            break;
            default:
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

function updateTimer()
{
    console.log(`entered updateTimer...`);
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

function startTimer()
{
    timer = setInterval(updateTimer, 100);
    
}
function restartTimer()
{
    console.log(`entered restartTimer...`);
    var displayTimer = document.getElementById('timer');
    clearInterval(timer); 
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
    
    document.getElementById('messageBoard').textContent = "Welcome to Key Master";
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
            document.removeEventListener('keydown', onKeyPress);
            resolve(); 
        });
    });
}

async function game() {
    console.log('Game is starting...');
    var displayPoints = document.getElementById('counter');
    var points = 0;
    displayPoints.textContent=`${points} points`
    initialize();
    restartTimer();
    startTimer();
    while (true) {
        await userInput();
        displayArrow();
        
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
            document.getElementById('messageBoard').textContent = "Click start to try again";
            clearInterval(timer);
            break;
        }
    }
    
    
}


function startGame()
{
    console.log(`entered startGame...`);
    game();
    return 0;
}
function stopGame()
{
    console.log(`entered stopGame...`);
    clearInterval(timer);
    document.removeEventListener('keydown', onKeyPress);
    return 0;
    
    
}
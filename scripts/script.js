let arrowComp = []; 
let arrrowUser = [];
let keys= [];
let cnt = 0;
let minutes = 1;
let seconds = 0;
let countPoint = 0;



function randomizer() {
    var randNum;
    randNum = Math.floor(Math.random() * 4) + 1;
    // console.log('this is rand:'+randNum);
    return randNum;
}

function createArrow()
{
    var cnt = 0;
    var number = 0;
    var direction;
    var eventKey;
    while (cnt < 4)
        {
        number = randomizer();
        console.log(number)
        switch (number)
        {
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
        
        arrowComp.push(direction);
        keys.push(eventKey);
        cnt++;
        
    }
    
    
    return arrowComp;
}

function displayArrow()
{
    var icon_1 = document.getElementById('arrow_1');
    var icon_2 = document.getElementById('arrow_2');
    var icon_3 = document.getElementById('arrow_3');
    var icon_4 = document.getElementById('arrow_4');
    icon_1.classList.remove('fa-arrow-right', 'fa-arrow-left', 'fa-arrow-up', 'fa-arrow-down');
    icon_2.classList.remove('fa-arrow-right', 'fa-arrow-left', 'fa-arrow-up', 'fa-arrow-down');
    icon_3.classList.remove('fa-arrow-right', 'fa-arrow-left', 'fa-arrow-up', 'fa-arrow-down');
    icon_4.classList.remove('fa-arrow-right', 'fa-arrow-left', 'fa-arrow-up', 'fa-arrow-down');
    icon_1.classList.add('fa-arrow-'+arrowComp[0]);
    icon_2.classList.add('fa-arrow-'+arrowComp[1]);
    icon_3.classList.add('fa-arrow-'+arrowComp[2]);
    icon_4.classList.add('fa-arrow-'+arrowComp[3]);
}

function startTimer()
{
    timer = setInterval(updateTimer, 1000);
}

function formatTime(minutes, seconds)
{
    return (`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`); 
    
}

function updateTimer()
{
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
    clearInterval(timer);
    
    var displayTimer = document.getElementById('timer');
    minutes = 1;
    seconds = 0;
    displayTimer.textContent = formatTime(minutes, seconds);
    
}

function intialize()
{
    cnt = 0;
    arrowComp = [];
    arrrowUser = [];
    keys = [];
    
    // * create the arrows for user to follow, has also randomizer inside
    arrowComp = createArrow();
    // * display arrow 
    displayArrow();
}


async function userInput() {
    return new Promise((resolve) => {
        document.addEventListener('keydown', function onKeyPress(event) {
            arrrowUser.push(event.key)
            document.removeEventListener('keydown', onKeyPress);
            resolve(); 
        });
    });
}


async function main() {
    var messageBoard = document.getElementById('messageBoard');
    var displayPoints = document.getElementById('counter');
    
    // * create the arrows for user to follow, has also randomizer inside
    arrowComp = createArrow();
    
    // * display arrow 
    displayArrow();
    
    messageBoard.textContent = 'Press arrow to start game'
    
    // startTimer()
    while (true) {
        // * Display Message 
        
        // todo: add start and stop for timer
        
        await userInput();
        
        // todo: define how to end of the game or end by timer or by user
        
        
        if (keys[cnt] === arrrowUser[cnt])
            {
            messageBoard.textContent = 'Correct Arrow';
            countPoint++;
            cnt++;
        }
        else
        {
            messageBoard.textContent = 'Wrong Arrow';
            
            // * initialize arrays,points and count
            countPoint = 0;    
            intialize(); 
            
            
        }
        
        if (cnt === 4) {
            messageBoard.textContent = 'New Arrow';
            intialize();
        }
        
        
        displayPoints.textContent = countPoint + " points";
        
        
        
        
        
    }
    
}

main()
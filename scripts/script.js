let arrowComp = []; 
let arrrowUser = [];
let keys= [];
let cnt = 0;

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

async function waitForKeyPress() {
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
    var timer = document.getElementById('timer');
    var counter = document.getElementById('counter');
    
    while (true) {
        // * Display Message 
        messageBoard.textContent = 'Press arrow to start game'
        
        // * create the arrows for user to follow, has also randomizer inside
        arrowComp = createArrow();
        
        // * display arrow 
        displayArrow();
        
        cnt = 0;
        
        
        await waitForKeyPress();
        // console.log('It is pressed');
        // todo: define how to end of the game
        // todo: end by timer or by user
        if (keys[cnt] === arrrowUser[cnt])
            {
            console.log('Korek')
            console.log(keys[cnt]);
            console.log(arrrowUser[cnt]);
        }
        else
        {
            console.log('Rong');
            // todo: improve code
            arrowComp = [];
            // * create the arrows for user to follow, has also randomizer inside
            arrowComp = createArrow();
            
            // * display arrow 
            displayArrow();
            cnt = 0;
        }
        cnt++;
        console.log("COUNTING: " + cnt);
        if (cnt === 4){
            break;
        }
        
    }
    
}

main()
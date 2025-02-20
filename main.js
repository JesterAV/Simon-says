const mainContainer = document.createElement('div');
mainContainer.classList.add('main_container');
document.body.appendChild(mainContainer);

const difficultyLevelContainer = document.createElement('div');
difficultyLevelContainer.classList.add('difficulty_level_container');
mainContainer.appendChild(difficultyLevelContainer);

for (let level = 1; level <= 3; level++) {
    const difficultyLevel = document.createElement('button');
    difficultyLevel.classList.add('difficulty_level');

    if (level === 1) {
        difficultyLevel.innerText = 'easy';
        difficultyLevel.id = 'easy';
        difficultyLevel.classList.add('active');
    } else if (level === 2) {
        difficultyLevel.innerText = 'medium';
        difficultyLevel.id = 'medium';

        const line = document.createElement('span');
        line.classList.add('level_container_line');
        line.innerText = "|";
        difficultyLevelContainer.appendChild(line);
    } else if (level === 3) {
        difficultyLevel.innerText = 'hard';
        difficultyLevel.id = 'hard';

        const line = document.createElement('span');
        line.classList.add('level_container_line');
        line.innerText = "|";
        difficultyLevelContainer.appendChild(line);
    }

    difficultyLevelContainer.appendChild(difficultyLevel);

    difficultyLevel.addEventListener('click', () => {
        const activeLevelButton = document.querySelector('.difficulty_level.active');
        if (activeLevelButton) {
            activeLevelButton.classList.remove('active');
        }
        difficultyLevel.classList.add('active');
    });

    function turnOffLevelButton() {
        const allLevelButtons = document.querySelectorAll('.difficulty_level');
        allLevelButtons.forEach((button) => {
            if(!button.classList.contains('active')) {
            button.disabled = true;
            button.classList.add('disabled');
            }
        })
    }
}

function turnOnLevelButton() {
    const allLevelButtons = document.querySelectorAll('.difficulty_level');
    allLevelButtons.forEach((button) => {
        if(button.classList.contains('disabled')) {
        button.disabled = false;
        button.classList.remove('disabled');
        }
    })
}

const startButton = document.createElement('button');
startButton.classList.add('start_button');
startButton.innerText = 'Start';
mainContainer.appendChild(startButton);

const keyboardAndInputLineContainer = document.createElement('div');
keyboardAndInputLineContainer.classList.add('keyboard_and_input_line_container');
mainContainer.appendChild(keyboardAndInputLineContainer);

const inputLine = document.createElement('input');
inputLine.classList.add('input_line');
keyboardAndInputLineContainer.appendChild(inputLine);

function createEasyLevelKeyboard() {
    inputLine.style.display = 'block';
    startButton.style.visibility = 'hidden';

    turnOffLevelButton();

    const keyboardLine = document.createElement('div');
    keyboardLine.classList.add('keyboard_line');
    keyboardAndInputLineContainer.appendChild(keyboardLine);

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboardAndInputLineContainer.appendChild(keyboard);
    
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    keyboard.appendChild(buttons);

    const randomButtons = [];

    for (let key = 1; key <= 10; key++) {
        const button = document.createElement('button');
        button.classList.add('button');
        
        if (key === 10) {
            button.innerText = '0';
            buttons.appendChild(button);
            randomButtons.push(button);
            break;
        }

        button.innerText = key;
        randomButtons.push(button);
        buttons.appendChild(button);

        button.addEventListener('click', () => {
            inputLine.value += button.innerText;
        })
    }

    inputLine.addEventListener('input', () => {
        inputLine.value = inputLine.value.replace(/[^0-9]/g, '');
    })

    inputLine.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
        }
    })

    inputLine.addEventListener('keydown', (event) => {
        const checkkeyDown = event.key;
        const checkButtons = keyboard.querySelectorAll('button');

        checkButtons.forEach((button) => {
            if(button.innerText == checkkeyDown) {
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                },300)
            }
        })
    })

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons_container');
    keyboard.appendChild(buttonsContainer);

    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new_game_button');
    newGameButton.innerText = 'new game';
    buttonsContainer.appendChild(newGameButton);

    const repeatSequence = document.createElement('button');
    repeatSequence.classList.add('repeat_sequence');
    repeatSequence.innerText = 'repeat sequence';
    buttonsContainer.appendChild(repeatSequence);

    const roundCounter = document.createElement('div');
    roundCounter.classList.add('round_counter');
    roundCounter.innerText = 'Round 1/5';
    keyboardAndInputLineContainer.appendChild(roundCounter);

    const winOrLoss = document.createElement('div');
    winOrLoss.classList.add('win_or_loss');
    keyboardAndInputLineContainer.appendChild(winOrLoss);

    const completedRound = document.createElement('div');
    completedRound.classList.add('round_completed');
    completedRound.innerText = 'Round Completed!';
    keyboardAndInputLineContainer.appendChild(completedRound);

    let round = 2;

    function activeRandomButton() {
        let resultRandomNumber = '';
        winOrLoss.style.display = 'block';

        for (let i = 0; i < round; i++) {
            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const randomNumber = getRandomNumber(0, 9);
            resultRandomNumber += randomNumber.toString();
        }

        randomButtons.forEach(button => {
            button.classList.remove('active');
        })

        const activateButton = (index) => {

            if (index < resultRandomNumber.length) {
                for (let q = 0; q < randomButtons.length; q++) {
                    if (resultRandomNumber[index] == randomButtons[q].innerText) {
                        setTimeout(() => {
                            randomButtons[q].classList.add('active');

                            setTimeout(() => {
                                randomButtons[q].classList.remove('active');

                                activateButton(index + 1);
                            }, 500);
                        }, 500);
                        break;
                    }
                }
            }
        }
        repeatSequence.addEventListener('click', () => {
            activateButton(0);
            repeatSequence.disabled = true;
            repeatSequence.classList.add('disabled');
        });

        activateButton(0);

        let counterTrue = 0;

        console.log(resultRandomNumber);

        inputLine.addEventListener('input', () => {
            let startIndex = inputLine.value.length -1;
            if (startIndex >= 0 && startIndex < resultRandomNumber.length) {
                if (inputLine.value[startIndex] == resultRandomNumber[startIndex]) {
                    counterTrue++;

                    keyboardLine.classList.add('true');

                    setTimeout(() => {
                        keyboardLine.classList.remove('true');
                    }, 300);

                    if (counterTrue == round) {
                        resultRandomNumber = '';
                        inputLine.value = '';
                        winOrLoss.innerText = 'You Win!';
                        inputLine.disabled = true;
                        round += 2;
                        newRound();

                        setTimeout(() => {
                            winOrLoss.innerText = '';
                            inputLine.disabled = false;
                            activeRandomButton();
                        }, 3000)

                        if (round === 10) {
                            inputLine.disabled = true;
                            winOrLoss.innerText = "Хочешь встретиться в воскресенье?)";
                            
                            setTimeout(() => {
                                    buttonsContainer.style.display = 'none';
                                    keyboardLine.style.display = 'none';
                                    keyboard.style.display = 'none';
                                    inputLine.style.display = 'none';
                                    startButton.style.visibility = 'visible';
                                    roundCounter.style.display = 'none';
                                    winOrLoss.innerText = '';
                                    turnOnLevelButton();
                            }, 7000);
                        }
                    }
                } else {
                    keyboardLine.classList.add('false');
                    inputLine.disabled = true;
                    winOrLoss.innerText = 'You Loss(';
                    repeatSequence.disabled = true;
                    repeatSequence.classList.add('disabled');
                }

            }
        });
    }

    activeRandomButton();

    newGameButton.addEventListener('click', () => {
        inputLine.value = '';
        inputLine.disabled = false;
        buttonsContainer.style.display = 'none';
        keyboardLine.style.display = 'none';
        keyboard.style.display = 'none';
        inputLine.style.display = 'none';
        startButton.style.visibility = 'visible';
        roundCounter.style.display = 'none';
        winOrLoss.innerText = '';
        winOrLoss.style.display = 'block';
        repeatSequence.disabled = true;
        repeatSequence.classList.remove('disabled');
        resultRandomNumber = '';
        turnOnLevelButton();
    })

    function newRound() {

        switch (round) {
            case 2:
                roundCounter.innerText = 'Round 1/5';
                break;
            case 4:
                roundCounter.innerText = 'Round 2/5';
                break;
            case 6:
                roundCounter.innerText = 'Round 3/5';
                break;
            case 8:
                roundCounter.innerText = 'Round 4/5';
                break;
            case 10:
                roundCounter.innerText = 'Round 5/5';
                break;
        }
    }
}

const keyboardLetters = 'qwertyuiopasdfghjklzxcvbnm';

function createMediumLevelKeyboard() {
    inputLine.style.display = 'block';
    
    turnOffLevelButton();

    const randomButtons = [];

    const keyboardLine = document.createElement('div');
    keyboardLine.classList.add('keyboard_line');
    keyboardAndInputLineContainer.appendChild(keyboardLine);
    
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboardAndInputLineContainer.appendChild(keyboard);

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    keyboard.appendChild(buttons);

    for (let key = 0; key < keyboardLetters.length; key++) {
        const button = document.createElement('button');
        button.classList.add('button');
        buttons.appendChild(button);

        button.innerText = keyboardLetters[key];
        randomButtons.push(button);

        button.addEventListener('click', () => {
            inputLine.value += button.innerText;
        })
    }

    inputLine.addEventListener('input', () => {
        inputLine.value = inputLine.value.replace(/[^a-zA-z]/g, '');
    })

    inputLine.addEventListener('keydown', (event ) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
        }
    })

    inputLine.addEventListener('keydown', (event) => {
        const checkkeyDown = event.key;
        const checkButtons = keyboard.querySelectorAll('button');

        checkButtons.forEach((button) => {
            if (button.innerText == checkkeyDown) {
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                }, 300)
            }
        })
    })

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons_container');
    keyboard.appendChild(buttonsContainer);

    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new_game_button');
    newGameButton.innerText = 'new game';
    buttonsContainer.appendChild(newGameButton);

    const repeatSequence = document.createElement('button');
    repeatSequence.classList.add('repeat_sequence');
    repeatSequence.innerText = 'repeat sequence';
    buttonsContainer.appendChild(repeatSequence);

    const roundCounter = document.createElement('div');
    roundCounter.classList.add('round_counter');
    roundCounter.innerText = 'Round 1/5';
    keyboardAndInputLineContainer.appendChild(roundCounter);

    const winOrLoss = document.createElement('div');
    winOrLoss.classList.add('win_or_loss');
    keyboardAndInputLineContainer.appendChild(winOrLoss);

    const completedRound = document.createElement('div');
    completedRound.classList.add('round_completed');
    completedRound.innerText = 'Round Completed!';
    keyboardAndInputLineContainer.appendChild(completedRound);

    let round = 2;

    function activateRandomLetterButton() {
        let resultRandomLetter = '';
        winOrLoss.style.display = 'block';

        for(let q = 0; q < round; q++) {
            function getRandomIndex(min, max) {
                return Math.floor(Math.random() * (max- min + 1)) + min;
            }

            const randomLetter = getRandomIndex(0, keyboardLetters.length -1);
            resultRandomLetter += keyboardLetters[randomLetter].toString();
        }

        const activateButton = (index) => {

            if (index < resultRandomLetter.length) {
                for (let a = 0; a < randomButtons.length; a++) {
                    if (resultRandomLetter[index] == randomButtons[a].innerText) {
                        setTimeout(() => {
                            randomButtons[a].classList.add('active');

                            setTimeout(() => {
                                randomButtons[a].classList.remove('active');

                                activateButton(index + 1)
                            }, 300);
                        }, 300);
                        break;
                    }
                }
            }
        }

        repeatSequence.addEventListener('click', () => {
            activateButton(0);
            repeatSequence.disabled = true;
            repeatSequence.classList.add('disabled');
        });

        activateButton(0);

        let counterTrue = 0;

        inputLine.addEventListener('input', () => {
            let startIndex = inputLine.value.length -1;
            if (startIndex >= 0 && startIndex < resultRandomLetter.length) {
                if (inputLine.value[startIndex] == resultRandomLetter[startIndex]) {
                    counterTrue++;

                    keyboardLine.classList.add('true');

                    setTimeout(() => {
                        keyboardLine.classList.remove('true');
                    }, 300);

                    if (counterTrue == round) {
                        resultRandomLetter = '';
                        inputLine.value = '';
                        winOrLoss.innerText = 'You Win!';
                        inputLine.disabled = true;
                        round += 2;
                        newRound();

                        setTimeout(() => {
                            winOrLoss.innerText = '';
                            inputLine.disabled = false;
                            activateRandomLetterButton();
                        }, 3000)

                        if (round === 10) {
                            inputLine.disabled = true;
                            winOrLoss.innerText = "Medium level passed";
                            
                            setTimeout(() => {
                                    buttonsContainer.style.display = 'none';
                                    keyboardLine.style.display = 'none';
                                    keyboard.style.display = 'none';
                                    inputLine.style.display = 'none';
                                    startButton.style.visibility = 'visible';
                                    roundCounter.style.display = 'none';
                                    winOrLoss.innerText = '';
                                    turnOnLevelButton();
                            }, 3000);
                        }
                    }
                } else {
                    keyboardLine.classList.add('false');
                    inputLine.disabled = true;
                    winOrLoss.innerText = 'You Loss(';
                    repeatSequence.disabled = true;
                    repeatSequence.classList.add('disabled');
                }

            }
        });
    }

    activateRandomLetterButton();

    newGameButton.addEventListener('click', () => {
        inputLine.value = '';
        inputLine.disabled = false;
        buttonsContainer.style.display = 'none';
        keyboardLine.style.display = 'none';
        keyboard.style.display = 'none';
        inputLine.style.display = 'none';
        startButton.style.visibility = 'visible';
        roundCounter.style.display = 'none';
        winOrLoss.innerText = '';
        winOrLoss.style.display = 'none';
        repeatSequence.disabled = true;
        repeatSequence.classList.remove('disabled');
        resultRandomLetter = '';
        turnOnLevelButton();
    });

    function newRound() {

        switch (round) {
            case 2:
                roundCounter.innerText = 'Round 1/5';
                break;
            case 4:
                roundCounter.innerText = 'Round 2/5';
                break;
            case 6:
                roundCounter.innerText = 'Round 3/5';
                break;
            case 8:
                roundCounter.innerText = 'Round 4/5';
                break;
            case 10:
                roundCounter.innerText = 'Round 5/5';
                break;
        }
    }
}

function createHardLevelKeyboard() {
    inputLine.style.display = 'block';

    let randomButtonsList = '';
    
    turnOffLevelButton();

    const randomButtons = [];

    const keyboardLine = document.createElement('div');
    keyboardLine.classList.add('keyboard_line');
    keyboardAndInputLineContainer.appendChild(keyboardLine);

    const hardKeyboard = document.createElement('div');
    hardKeyboard.classList.add('hard_keyboard');
    keyboardAndInputLineContainer.appendChild(hardKeyboard);

    const numberKeyboard = document.createElement('div');
        numberKeyboard.classList.add('number_keyboard');
        hardKeyboard.appendChild(numberKeyboard);

    for (let numberKey = 1; numberKey <= 10; numberKey++) {
        const numberButton = document.createElement('button');
        numberButton.classList.add('number_button');

        if (numberKey === 10) {
            numberButton.innerText = '0';
            numberKeyboard.appendChild(numberButton);
            randomButtons.push(numberButton);
            randomButtonsList += 0;
            break;
        }

        numberButton.innerText = numberKey;
        numberKeyboard.appendChild(numberButton);
        randomButtonsList += numberButton.innerText;
        randomButtons.push(numberButton);

        numberButton.addEventListener('click', () => {
            inputLine.value += numberButton.innerText;
        })
    }

    const letterKeyboard = document.createElement('div');
    letterKeyboard.classList.add('letter_keyboard');
    hardKeyboard.appendChild(letterKeyboard);

    for (let letterKey = 0; letterKey < keyboardLetters.length; letterKey++) {
        const letterButton = document.createElement('button');
        letterButton.classList.add('letter_button');

        letterButton.innerText = keyboardLetters[letterKey];
        
        letterKeyboard.appendChild(letterButton);
        randomButtons.push(letterButton);

        randomButtonsList += letterButton.innerText;

        letterButton.addEventListener('click', () => {
            inputLine.value += letterButton.innerText;
        });

    }

    inputLine.addEventListener('input', () => {
        inputLine.value = inputLine.value.replace(/[^a-z0-9]/g, '');
    });

    inputLine.addEventListener('keydown', (event ) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
        }
    })

    inputLine.addEventListener('keydown', (event) => {
        const checkkeyDown = event.key;
        const checkNumberButton = numberKeyboard.querySelectorAll('button');
        const checkLetterButton = letterKeyboard.querySelectorAll('button');

        checkNumberButton.forEach((buttonNumber) => {
            if (buttonNumber.innerText == checkkeyDown) {
                buttonNumber.classList.add('active');
                
                setTimeout(() => {
                    buttonNumber.classList.remove('active');
                }, 300)
            }
        })

        checkLetterButton.forEach((buttonLetter) => {
            if (buttonLetter.innerText == checkkeyDown) {
                buttonLetter.classList.add('active');

                setTimeout(() => {
                    buttonLetter.classList.remove('active');
                }, 300);
            }
        })
    })

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons_container');
    hardKeyboard.appendChild(buttonsContainer);

    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new_game_button');
    newGameButton.innerText = 'new game';
    buttonsContainer.appendChild(newGameButton);

    const repeatSequence = document.createElement('button');
    repeatSequence.classList.add('repeat_sequence');
    repeatSequence.innerText = 'repeat sequence';
    buttonsContainer.appendChild(repeatSequence);

    const roundCounter = document.createElement('div');
    roundCounter.classList.add('round_counter');
    roundCounter.innerText = 'Round 1/5';
    hardKeyboard.appendChild(roundCounter);

    const winOrLoss = document.createElement('div');
    winOrLoss.classList.add('win_or_loss');
    hardKeyboard.appendChild(winOrLoss);

    const completedRound = document.createElement('div');
    completedRound.classList.add('round_completed');
    completedRound.innerText = 'Round Completed!';
    hardKeyboard.appendChild(completedRound);

    let round = 2;

    function activeRandomButton() {
        let resultRandomButton = '';
        winOrLoss.style.display = 'block';

        for(let i = 0; i < round; i++) {
            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const randomIndex = getRandomNumber(0, randomButtonsList.length -1);
            resultRandomButton += randomButtonsList[randomIndex].toString();
        }

        const activateButton = (index) => {

            if (index < resultRandomButton.length) {
                for (let a = 0; a < randomButtons.length; a ++) {
                    if (resultRandomButton[index] == randomButtons[a].innerText) {
                        setTimeout(() => {
                            randomButtons[a].classList.add('active');

                            setTimeout(() => {
                                randomButtons[a].classList.remove('active');

                                activateButton(index + 1)
                            }, 300);
                        }, 300);
                        break;
                    }
                }
            }
        }

        repeatSequence.addEventListener('click', () => {
            activateButton(0);
            repeatSequence.disabled = true;
            repeatSequence.classList.add('disabled');
        });

        activateButton(0);

        let counterTrue = 0;

        inputLine.addEventListener('input', () => {
            let startIndex = inputLine.value.length -1;
            if (startIndex >= 0 && startIndex < resultRandomButton.length) {
                if (inputLine.value[startIndex] == resultRandomButton[startIndex]) {
                    counterTrue++;

                    keyboardLine.classList.add('true');

                    setTimeout(() => {
                        keyboardLine.classList.remove('true');
                    }, 300);

                    if (counterTrue == round) {
                        resultRandomButton = '';
                        inputLine.value = '';
                        winOrLoss.innerText = 'You Win!';
                        inputLine.disabled = true;
                        round += 2;
                        newRound();

                        setTimeout(() => {
                            winOrLoss.innerText = '';
                            inputLine.disabled = false;
                            activeRandomButton();
                        }, 3000)

                        if (round === 10) {
                            inputLine.disabled = true;
                            winOrLoss.innerText = "Hard level passed";
                            
                            setTimeout(() => {
                                    buttonsContainer.style.display = 'none';
                                    keyboardLine.style.display = 'none';
                                    hardKeyboard.style.display = 'none';
                                    inputLine.style.display = 'none';
                                    startButton.style.visibility = 'visible';
                                    roundCounter.style.display = 'none';
                                    winOrLoss.innerText = '';
                                    resultRandomButton = '';
                                    turnOnLevelButton();
                            }, 3000);
                        }
                    }
                } else {
                    keyboardLine.classList.add('false');
                    inputLine.disabled = true;
                    winOrLoss.innerText = 'You Loss(';
                    repeatSequence.disabled = true;
                    repeatSequence.classList.add('disabled');
                }

            }
        });
    }

    activeRandomButton();

    newGameButton.addEventListener('click', () => {
        inputLine.value = '';
        inputLine.disabled = false;
        buttonsContainer.style.display = 'none';
        keyboardLine.style.display = 'none';
        keyboard.style.display = 'none';
        inputLine.style.display = 'none';
        startButton.style.visibility = 'visible';
        roundCounter.style.display = 'none';
        winOrLoss.innerText = '';
        winOrLoss.style.display = 'none';
        repeatSequence.disabled = true;
        repeatSequence.classList.remove('disabled');
        resultRandomButton = '';
        turnOnLevelButton();
    });

    function newRound() {

        switch (round) {
            case 2:
                roundCounter.innerText = 'Round 1/5';
                break;
            case 4:
                roundCounter.innerText = 'Round 2/5';
                break;
            case 6:
                roundCounter.innerText = 'Round 3/5';
                break;
            case 8:
                roundCounter.innerText = 'Round 4/5';
                break;
            case 10:
                roundCounter.innerText = 'Round 5/5';
                break;
        }
    }
}

startButton.addEventListener('click', () => {
    const activeLevelButton = document.querySelector('.difficulty_level.active');

    if(activeLevelButton.id == 'easy') {
        createEasyLevelKeyboard();
    } else if (activeLevelButton.id == 'medium') {
        createMediumLevelKeyboard();
    } else if (activeLevelButton.id == 'hard') {
        createHardLevelKeyboard();
    }
})
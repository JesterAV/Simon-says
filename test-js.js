function createHardLevelKeyboard() {
    inputLine.style.display = 'block';
    startButton.style.visibility = 'hidden';

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
        });
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
        });

        checkLetterButton.forEach((buttonLetter) => {
            if (buttonLetter.innerText == checkkeyDown) {
                buttonLetter.classList.add('active');

                setTimeout(() => {
                    buttonLetter.classList.remove('active');
                }, 300);
            }
        })
    });

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

        for (let i = 0; i < round; i++) {
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

                    if (round == 10 && counterTrue == 10) {
                        inputLine.disabled = true;
                        winOrLoss.innerText = 'Medium level passed';
                        inputLine.value = '';

                        setTimeout(() => {
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
                            startButton.style.visibility = 'visible';
                            turnOnLevelButton();
                        }, 10000);

                        return;
                    }

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
    }

    activeRandomButton();

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
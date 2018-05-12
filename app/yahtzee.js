Yahtzee = {
	currentRound : 1,
	currentRoll : 1,
	init : function() {

		//Adding functionality when keeping
		for (i = 1; i <= 13; i++) {
			str = 'button-keep-' + i;
			if (i < 7) {
				document.getElementById(str).addEventListener('click', function(e) {
					e.preventDefault();
					Yahtzee.keep(this.getAttribute('dice-number'), this.id);
				});
			} else {
				document.getElementById(str).addEventListener('click', function(e) {
					e.preventDefault();
					Yahtzee.keep(0, this.id);
				});
			}
		}

	},
	createHtml : function(dice, diceNum) {
		var diceBoard = document.getElementById('dice-board');
		
		diceBoard.innerHTML = '';

		for (var i = 1; i <= dice.length; i++) {
			if (i <= diceNum) {
				diceClass = 'dice';
			} else {
				diceClass = 'dice active';
			}
			diceBoard.insertAdjacentHTML('beforeend', '<img id="' + (i - 1) + '" class="' + diceClass + '" diceNumber="' + dice[i - 1] + '" src="images/dice-' + dice[i - 1] + '.png"/>');
			// Add the event listeners for each element of the list.
			document.getElementById(i - 1).addEventListener('click', function (e) {
				this.classList.toggle('active');
			});
		}		
	},
	getActiveDice : function() {
		var getActiveDice = document.getElementsByClassName('active'),
			currentDice = [];


		if (getActiveDice) {
			for (var i = 0; i < getActiveDice.length; i++) {
				currentDice.push(getActiveDice[i].getAttribute('diceNumber'));
			}
			return currentDice;
		} else {
			return currentDice;
		}
	},
	getCurrentDice : function() {
		var getCurrentDice = document.getElementsByClassName('dice');
		return getCurrentDice;
	},
	shuffle : function() {
		
		newRoll = Yahtzee.currentRoll++;
		document.getElementById('current-roll').innerHTML = newRoll;

		var newDice = [],
			selectedDice = Yahtzee.getActiveDice();

		//Get 
		diceNum = 5 - selectedDice.length;

		//Create New Dice
		for (var i = 1; i <= diceNum; i++) {
			var diceNumber = Math.round(5 * Math.random()) + 1;
			newDice.push(diceNumber);
		}

		//Merge Array
		newDice = newDice.concat(selectedDice);

		//Create HTML
		Yahtzee.createHtml(newDice, diceNum);

	},
	keep : function(number, diceId) {
		selectedDice = Yahtzee.getActiveDice();
		currentDice = Yahtzee.getCurrentDice();
		var kept = false;

		if (selectedDice.includes(number)) {
			kept = true;
			document.getElementById('keep-' + number ).innerHTML = calculateArray(selectedDice, number);
		}

		//Three of a kind
		if (diceId == 'button-keep-7') {
			if (count(currentDice, 1) >= 3 || count(currentDice, 2) >= 3 || count(currentDice, 3) >= 3 || count(currentDice, 4) >= 3 || count(currentDice, 5) >= 3 || count(currentDice, 6) >= 3) {
				kept = true;
				document.getElementById('keep-7').innerHTML = total(currentDice);
			}
		}

		//Four of a kind
		if (diceId == 'button-keep-8') {
			if(count(currentDice, 1) >= 4 || count(currentDice, 2) >= 4 || count(currentDice, 3) >= 4 || count(currentDice, 4) >= 4 || count(currentDice, 5) >= 4 || count(currentDice, 6) >= 4) {
				kept = true;
				document.getElementById('keep-8').innerHTML = total(currentDice);
			}
		}

		//Full House
		if (diceId == 'button-keep-9') {
			if((count(currentDice, 1) == 3 || count(currentDice, 2) == 3 || count(currentDice, 3) == 3 || count(currentDice, 4) == 3 || count(currentDice, 5) == 3 || count(currentDice, 6) == 3) && (count(currentDice, 1) == 2 || count(currentDice, 2) == 2 || count(currentDice, 3) == 2 || count(currentDice, 4) == 2 || count(currentDice, 5) == 2 || count(currentDice, 6) == 2)) {
				kept = true;
				document.getElementById('keep-9').innerHTML = 25;
			}
		}

		//Small Straight 
		if (diceId == 'button-keep-10') {
			if (checkStraight(selectedDice.sort())) {
				kept = true;
				document.getElementById('keep-10').innerHTML = 25;
			}
		}

		//Large Straight 
		if (diceId == 'button-keep-11') {
			if (checkLargeStraight(selectedDice.sort())) {
				kept = true;
				document.getElementById('keep-11').innerHTML = 35;
			}
		}

		//Yahtzee
		if (diceId == 'button-keep-12') {
			if (!currentDice.length) {
				return alert('nice try');
			}
			var sameDice = [];
			for(i = 0; i < currentDice.length; i++) {
				if (currentDice[0] === currentDice[i]) {
					sameDice.push(currentDice[i]);
				}
			}
			if (currentDice.length === sameDice.length) {
				kept = true;
				alert('YAHTZEE!');
				document.getElementById('keep-12').innerHTML = 50;
			}
		}

		//Chance
		if (diceId == 'button-keep-13') {
			kept = true;
			document.getElementById('keep-13').innerHTML = total(currentDice);
		}

		if (kept === true) {
			//Save Changes
			Yahtzee.update();

			//Reset for next round
			Yahtzee.reset();
		}

	},
	reset : function() {
		document.getElementById('current-round').innerHTML = Yahtzee.currentRound;
		document.getElementById('button-shuffle').innerHTML = 'Shuffle';
		document.getElementById('dice-board').innerHTML = '';
		Yahtzee.currentRoll = 1;
		Yahtzee.currentDice = [];
		Yahtzee.selectedDice = [];
		document.getElementById('current-roll').innerHTML = 0;
		document.getElementById('button-shuffle').classList.remove('isDisabled');
	},
	update : function() {
		var upperElements = document.getElementsByClassName('dice-keep-upper'),
			lowerElements = document.getElementsByClassName('dice-keep-lower'),
			upperTotal = document.getElementById('total-upper'),
			lowerTotal = document.getElementById('total-lower'),
			finalTotal = document.getElementById('final-total');

		x = totalLower(upperElements);
		upperTotal.innerHTML = x;
		Total = x;

		y = totalLower(lowerElements);
		lowerTotal.innerHTML = y;

		finalTotal.innerHTML = Total + y;
	}
}

//Lib
function checkStraight(array) {
	count = 0;
	if (parseInt(array[0]) === 1) {
		smallStraight = [1,2,3,4];
	} else if(parseInt(array[0]) === 2) {
		smallStraight = [2,3,4,5];
	} else {
		smallStraight = [3,4,5,6];
	}
	
	for(i=0;i<array.length;i++) {
		if (parseInt(array[i]) === parseInt(smallStraight[i])) {
			count++;
			console.log(count);
		}
	}

	if (count === 4) {
		return true;
	} else {
		return false;
	}
}
function checkLargeStraight(array) {
	count = 0;
	if (array[0] === 1) {
		largeStraight = [1,2,3,4,5];
	} else {
		largeStraight = [2,3,4,5,6];
	}

	for(i=0;i<array.length;i++) {
		if (parseInt(array[i]) === parseInt(largeStraight[i])) {
			count++;
			console.log(count);
		}
	}

	if (count === 5) {
		return true;
	} else {
		return false;
	}
}
function total(array) {
	x = 0;
	for(i=0;i<array.length;i++) {
		number = parseInt(array[i].getAttribute('dicenumber'));
		x = x + number;
	}
	return x;
}
function totalLower(array) {
	x = 0;
	for(i=0;i<array.length;i++) {
		if (isNumeric(array[i].innerHTML)) {
			number = parseInt(array[i].innerHTML);
			x = x + number;
			console.log(x);
		}
	}
	return x;
}
function count(array, value) {
	var counter = 0;
	for(var i=0;i<array.length;i++)
	{
		if (parseInt(array[i].getAttribute('dicenumber')) === value)
		{
			counter++;
		}
	}
	return counter;
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function calculateArray(selectedDice, numberCheck) {
	var x = 0; 
	for (var i = 1; i <= selectedDice.length; i++) {
		if (parseInt(selectedDice[i - 1]) == numberCheck) {
			x++;
		}
	}
	x = x * numberCheck;
	return x;
}

Yahtzee = {
	currentRound : 1,
	currentRoll : 1,
	init : function() {

		//Adding functionality when keeping
		for (i = 1; i <= 12; i++) {
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

		if (selectedDice.includes(number)) {
			document.getElementById('keep-' + number ).innerHTML = calculateArray(selectedDice, number);
		}

		//Three of a kind
		if (diceId == 'button-keep-7') {
			if (count(currentDice, 1) >= 3 || count(currentDice, 2) >= 3 || count(currentDice, 3) >= 3 || count(currentDice, 4) >= 3 || count(currentDice, 5) >= 3 || count(currentDice, 6) >= 3) {
				document.getElementById('keep-7').innerHTML = total(currentDice);
			}
		}

		//Four of a kind
		if (diceId == 'button-keep-8') {
			if(count(currentDice, 1) >= 4 || count(currentDice, 2) >= 4 || count(currentDice, 3) >= 4 || count(currentDice, 4) >= 4 || count(currentDice, 5) >= 4 || count(currentDice, 6) >= 4) {
				document.getElementById('keep-8').innerHTML = total(currentDice);
			}
		}

		//Full House
		if (diceId == 'button-keep-9') {
			if((count(currentDice, 1) == 3 || count(currentDice, 2) == 3 || count(currentDice, 3) == 3 || count(currentDice, 4) == 3 || count(currentDice, 5) == 3 || count(currentDice, 6) == 3) && (count(currentDice, 1) == 2 || count(currentDice, 2) == 2 || count(currentDice, 3) == 2 || count(currentDice, 4) == 2 || count(currentDice, 5) == 2 || count(currentDice, 6) == 2)) {
				document.getElementById('keep-9').innerHTML = 25;
			}
		}

		//Check Yahtzee
		if (diceId == 'button-keep-12') {
			var sameDice = [];
			for(i = 0; i < currentDice.length; i++) {
				if (currentDice[0] === currentDice[i]) {
					sameDice.push(currentDice[i]);
				}
			}
			if (currentDice.length === sameDice.length) {
				alert('YAHTZEE!');
				document.getElementById('keep-12').innerHTML = 50;
			}
		}

		Yahtzee.update();
		Yahtzee.reset();

	},
	reset : function() {
		document.getElementById('current-round').innerHTML = Yahtzee.currentRound;
		document.getElementById('button-shuffle').innerHTML = 'Shuffle';
		document.getElementById('dice-board').innerHTML = '';
		Yahtzee.currentRoll = 1;
		Yahtzee.currentDice = [];
		Yahtzee.selectedDice = [];
		document.getElementById('current-roll').innerHTML = 0;
	},
	update : function() {
		var elements = document.getElementsByClassName('dice-keep'),
			x = 0;

		for (i = 0; i <= 5; i++) {
			console.log(isNumeric(elements[i].innerHTML));
			if (isNumeric((elements[i].innerHTML))) {
				x = x + parseInt(elements[i].innerHTML);
				console.log(x);
			}
		}
		document.getElementById('total').innerHTML = x;
	}
}

//Lib
function total(array) {
	x = 0;
	for(i=0;i<array.length;i++) {
		number = parseInt(array[i].getAttribute('dicenumber'));
		x = x + number;
		console.log(x);
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

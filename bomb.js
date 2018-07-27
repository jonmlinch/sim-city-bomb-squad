var time = 30;
var interval;

document.addEventListener('DOMContentLoaded', function(){

	document.getElementById('reset').addEventListener('click', start);
});

function start(){

	clearInterval(interval);

	time = 30

	interval = setInterval(tick, 1000);

	this.textContent = 'Try Again';

	addWireListeners();

	document.getElementsByTagName('body')[0].classList.remove('exploded');
	document.getElementsByTagName('body')[0].classList.add('unexploded');

	document.getElementById('message').textContent = "";
	document.getElementById('timer').style.color = 'chartreuse';

	siren = document.getElementById('siren');
	siren.play();

}

function tick(){
	time -= 1;
	document.getElementById('timer').textContent = time;
//This turns numbers red when time is in last 3 sec
	if(time <= 3){
		document.getElementById('timer').style.color = "red";
	}
	if(time <= 0){
		loseGame();
	}
};

function addWireListeners(){
	var wireImages = document.querySelectorAll('#box img');
	console.log(wireImages);

	for(var i = 0; i < wireImages.length; i++){
		wireImages[i].src = './img/uncut-' + wireImages[i].id + '-wire.png';
		//This decides what wires to cut
		wireImages[i].setAttribute('data-cut', (Math.random() > 0.5).toString());
		console.log(wireImages[i]);
		wireImages[i].addEventListener('click', clickWire);
	}

	if (checkWin()){
		start();
	}
};


function removeWireListeners(){
	//This resets the game to the original starting condition
	var wireImages = document.querySelectorAll('#box img');
	for(var i = 0; i < wireImages.length; i++){
		wireImages[i].removeEventListener('click', clickWire);
		console.log('reset the list')
	}

}

function clickWire(){
	//This determines what happens when you click on the wire
	this.src = './img/cut-' + this.id + '-wire.png'
	this.removeEventListener('click', clickWire);

	if(this.getAttribute('data-cut') === 'true'){
		this.setAttribute('data-cut', 'false');
		document.getElementById('buzz').play();
		if(checkWin()){
			winGame();
		}
	}
	else {
		loseGame();
	}
}

function checkWin(){
	var wireImages = document.querySelectorAll('#box img');
	for(var i = 0; i < wireImages.length; i++){
		//no entirely sure what this does, I'm told it turns a wire false after it's clicked but not sure why we would want to do that
		if(wireImages[i].getAttribute('data-cut') === "true"){
			return false;
		}
	}
	return true;
}

function stopGame(message){
	clearInterval(interval);
	removeWireListeners();
	siren.pause();
	document.getElementById('message').textContent = message;
}

function winGame(){
	stopGame("Did you ever know that you're my hero?");
	var cheerSound = document.getElementById('cheer');
	cheerSound.addEventListener('ended', function(){
		document.getElementById('success').play();
	});
	cheer.play();
}

function loseGame(){
	stopGame('You have failed this city!');

	document.getElementsByTagName('body')[0].classList.remove('unexploded');
	document.getElementsByTagName('body')[0].classList.add('exploded');

	document.getElementById('explode').play();

};
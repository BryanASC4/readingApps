//To do:
//Generate questions in beginning so only those images are preloaded DONE
//Remove/Add Gifs? -> remove DONE
//Better voice upon completion
//Automate choosing the first letter, last letter, and correct letter NOT POSSIBLE BC OF EXPANSION
//Need to call voice on drop, so that the audio will be played DONE

/*======================================================
========================================================
Generating Drag and Drop Questions
========================================================
======================================================*/

var programIsOver = false;

/*Number of problems to display*/
var totalNumberOfProblems = 8;

/*possible letters to use*/
var lettersToUse = ["a","i"];

/*========================================================
Initial sets (display these before randomely sorting): 
========================================================*/
//var initialSets = [bat, bit, hat, hit];

var bat = {name: "bat", correctChoice:"a", firstLetter: "b", lastLetter: "t"};
var bit = {name: "bit", correctChoice:"i", firstLetter: "b", lastLetter: "t"};
var hat = {name: "hat", correctChoice:"a", firstLetter: "h", lastLetter: "t"};
var hit = {name: "hit", correctChoice:"i", firstLetter: "h", lastLetter: "t"};
/*========================================================
Sets to choose from (random): 
========================================================*/


var fan = {name: "fan", correctChoice:"a", firstLetter: "f", lastLetter: "n"};
var lid = {name: "lid", correctChoice:"i", firstLetter: "l", lastLetter: "d"};
var rat = {name: "rat", correctChoice:"a", firstLetter: "r", lastLetter: "t"};
var pig = {name: "pig", correctChoice:"i", firstLetter: "p", lastLetter: "g"};
var setsToUse = [bat, bit, hat, hit]; //initialized with the sets to be displayed in order first
var possibleSets = [fan, lid, rat, pig]; //sets to randomely choose from
var usedSets = [];
/*========================================================
Preload images: 
========================================================*/
var images = new Array()
function preloadMyImages() 
{
    
    for(var i = 0; i < setsToUse.length; i++ ) 
    {
        images[i] = new Image();
        images[i].src = "images/" + setsToUse[i] + ".png";
        console.log("images/" + setsToUse[i].name + ".png has been loaded");
    }
    console.log("Images have been loaded");
}



/*========================================================
Current set name and current dragged choice:
========================================================*/
var currentSet;
var currentChoice;

/*========================================================
Enter the program on click
========================================================*/
function enterProgram(){
	document.getElementById("initialDisplay").style.display = "none";
	document.getElementById("mainContainer").style.display = "initial";
	beginGeneration();

}


/*Handles changing the start icon */
/*
function changeButton(){
var buttonStartIcon = document.getElementById("playSymbol"); //represents the start symbol on opening page
	buttonStartIcon.src = "images/playSymbolWhite.png";
}

function changeButtonBack(){
var buttonStartIcon2 = document.getElementById("playSymbol"); //represents the start symbol on opening page
	buttonStartIcon2.src = "images/playSymbol.png";
}
*/
/*========================================================
Begin generation on page load
========================================================*/
if(window.addEventListener) window.addEventListener("load", setUpProblems, true);
else window.onload = setUpProblems;

var randomNumber = Math.floor((Math.random() * possibleSets.length) + 0); //random number in the range of possible options

function setUpProblems(){
	
	console.log("Object to add:" + possibleSets[randomNumber].name)
	console.log("setsToUse length:" + setsToUse.length);
	while(setsToUse.length < totalNumberOfProblems){ //will only fill the array up to 8 spots
		while(setsToUse.indexOf(possibleSets[randomNumber]) != -1)
			randomNumber = Math.floor((Math.random() * possibleSets.length) + 0);
		console.log("add" + randomNumber)
		setsToUse.push(possibleSets[randomNumber]);    
		randomNumber = Math.floor((Math.random() * possibleSets.length) + 0);                                                                                                                             
	}
	console.log("setsToUse:" + setsToUse);
	preloadMyImages();
	

}	

/*Keeps track of the number of problems shown*/
var problemNumber = 0;
function beginGeneration(){
	/********CHOOSE WHAT THE CHOICE LETTERS ARE:************/
	document.getElementById("choice1").innerHTML = "a";
	document.getElementById("choice2").innerHTML = "i";
	/*document.getElementById("choice3").innerHTML = "u"; */
	/* Go through the first four problems in this order */
	if(problemNumber + 1 <= totalNumberOfProblems){
		console.log("currentSet: " + setsToUse[0]);
		currentSet = setsToUse[problemNumber];
		outputData(currentSet);
		problemNumber ++;
	}else{
		endProgram();
	}
	console.log("Problem Number: " + problemNumber);
	/*Calls function to say name of object*/
	setTimeout(function(){speak(); }, 500);
}

/*========================================================
Reads name of object after 500 delay
========================================================*/

function speak(){
	if(!programIsOver){
	var readObject = new SpeechSynthesisUtterance(currentSet.name);
        speechSynthesis.speak(readObject);
        console.log("object was read aloud");
    }

}
/*========================================================
Prints out data
========================================================*/
function outputData(setName){
		document.getElementById("letter1").innerHTML = setName.firstLetter;
		document.getElementById("letter3").innerHTML = setName.lastLetter;
		var mainImageStill = document.getElementById("answerImage"); //represents the main image on the page
		mainImageStill.src = "images/" + setName.name + ".png";
		
}

/*=============================================================================
Allows choices to be dragged
=============================================================================*/
function beginDrag(ev){
	currentChoice = ev.target.id;
	console.log("Current choice is:" + currentChoice);
	drag(ev);
}

/*=============================================================================
Handles checking if the answer dragged is correct or not. 
=============================================================================*/
function checkIfAnswer(ev){
		if(document.getElementById(currentChoice).textContent == currentSet.correctChoice)
			allowDrop(event);
}

function reset(){
	/* Resets the appearance */
	console.log("reset");
	document.getElementById("leftColumn").style.display = "initial";
	document.getElementById("leftColumn").style.marginRight = "10%";
    document.getElementById("rightColumn").style.width = "80%";
	document.getElementById("dropHere").innerHTML = "";
    document.getElementById("dropHere").style.border = "none";
    document.getElementById("dropHere").style.backgroundColor = "white";
   
    beginGeneration();
	//document.getElementById("choice1").appendChild(document.getElementById("currentChoice"));
	
}


/*=============================================================================
Ends the program
=============================================================================*/
function endProgram(){
	console.log("Program Over");
	document.getElementById("dropHere").innerHTML = currentSet.correctChoice;
    document.getElementById("dropHere").style.border = "1px solid black";
    document.getElementById("dropHere").style.backgroundColor = "blue";
    //document.getElementById(data).style.marginBottom = "0px";
     /*document.getElementById(data).style.backgroundColor = "#00ff99";*/
    document.getElementById("leftColumn").style.display = "none";
    document.getElementById("rightColumn").style.width = "100%";
    document.getElementById("rightColumn").style.margin = "1%";
    /*document.getElementById("rightColumn").style.backgroundColor = "#00ff99";*/
    document.getElementById("answerImage").style.display = "none";
    document.getElementById("speaker").style.display = "none";
	document.getElementById("dropHere").style.minHeight = "0%";
    /*Reset problem after 500 milliseconds*/
    /*
    var endCongrats = new SpeechSynthesisUtterance("You did great! You've finished!");
        speechSynthesis.speak(endCongrats);
    setTimeout(function(){reset(); }, 1000);
	*/
	document.getElementById("wordBar").innerHTML = "You finished! Great job!";
	document.getElementById("wordBar").style.fontSize = "4vw";
	document.getElementById("wordBar").style.color = "white";
}





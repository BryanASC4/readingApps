/* ============================================
Calling Drag and Drop for IOS
=============================================*/
/* ============================================
Resize submit area on page load and page resize
=============================================*/
function resize(ev){
	var heightOfChoices = document.getElementById("choice1").offsetHeight;
	document.getElementById("dropHere").style.minHeight = heightOfChoices;
}

/* ============================================
Drag and Drop Functions
=============================================*/
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    if(document.getElementById(currentChoice).textContent == currentSet.correctChoice){ //if it is the correct answer
        if(problemNumber < 8){ //program will only run to 7 problems
            //ev.preventDefault();
            document.getElementById("dropHere").innerHTML = currentSet.correctChoice;
            document.getElementById("dropHere").style.border = "1px solid black";
            document.getElementById("dropHere").style.backgroundColor = "blue";
            //document.getElementById(data).style.marginBottom = "0px";
             /*document.getElementById(data).style.backgroundColor = "#00ff99";*/
            document.getElementById("leftColumn").style.display = "none";
            document.getElementById("rightColumn").style.width = "100%";
            document.getElementById("rightColumn").style.margin = "1%";
            /*document.getElementById("rightColumn").style.backgroundColor = "#00ff99";*/
        	document.getElementById("dropHere").style.minHeight = "0%";
            /*Reset problem after 500 milliseconds*/
            var greatJob = new SpeechSynthesisUtterance("Great job!");
                speechSynthesis.speak(greatJob);
            setTimeout(function(){reset(); }, 1000);
        }else{
            programIsOver = true;
            var endCongrats = new SpeechSynthesisUtterance("You finished! Great job!");
                speechSynthesis.speak(endCongrats);   

                endProgram();
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();

}
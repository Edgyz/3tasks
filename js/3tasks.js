
var tasksarray = ['','','','','']
var nextTask = 0;
var editable = false;
//is the backlog editable
var backlogDiv = 'tests';
//name of the backlog div for later functions

//Should I turn the tasks into objects? What would the parameters be?
var car = {type:"Fiat", model:"500", color:"white"};

//Gets the text written in the Textarea input
function getTaskListFromInput(){

  var lines = document.getElementById("editabletext").value.replace(/\r\n/g, "\n").split("\n");

  for (var i = 1; i < 11; i++) {
    var valuefrominputtext = lines[i-1];
    console.log(valuefrominputtext);
    if (valuefrominputtext == null ) {
      valuefrominputtext = '(no task left!)';
    }
      tasksarray[i-1] = valuefrominputtext;

  }

  updateTaskText();

}


function updateTaskText() {
  nextTask = 0;
  //load first 3 tasks from the list
  for (var i = 1; i < 4; i++) {

  textReplace(i,i-1);

  }
  hidePopin();
}


//hide / show popin
function showPopin() {
    document.getElementById("popin").style.display = "initial";
}

function hidePopin() {
    document.getElementById("popin").style.display = "none";
}


//call to replace a task text, use label's id - 1 for the intro
// and use "nextTask" to fetch the next
function textReplace(labelid, arrayid){
    document.getElementById("labelinp"+labelid).innerHTML =
  tasksarray[arrayid];


    nextTask +=1;
  console.log(nextTask);
}

// call when the checkbox is triggered (strike text, grey color)
function checkboxTrigger(x){

  //check current status of the input (invisible)
  var ischecked = document.getElementById("taskinp"+x).checked;


    //add checkmark if checked
    if(ischecked==true){
      document.getElementById("button"+x).innerHTML =
    '<i class="fa-2x fa fa-check"></i>';
    document.getElementById("labelinp"+x).className = "done";
    showPopin();
    textReplace(x,nextTask);
    document.getElementById("button"+x).innerHTML = "";
    document.getElementById("labelinp"+x).className = "";
    }
    //or remove checkmark
    else{  document.getElementById("button"+x).innerHTML =
    '';

    document.getElementById("labelinp"+x).className = "";
    }
}

// when the button is used, manually changes the checkbox's checked property,
// and then send that to the above function for strike through & text effects
function buttonTrigger(x){

    //slightly different when pressing the button
    //switch the state
    document.getElementById("taskinp"+x).checked =
     !document.getElementById("taskinp"+x).checked;

    //launch the other function for display
    checkboxTrigger(x);

  }


function makeEditable() {
  if ( editable == false ) {
    document.getElementById("editbtn").innerHTML="I'm done editing!";
    document.getElementById(backlogDiv).setAttribute("contenteditable", "true");
    editable = true;
  } else {
document.getElementById(backlogDiv).setAttribute("contenteditable", "false");
  document.getElementById("editbtn").innerHTML="Edit Backlog";
editable = false;
  }

}

function blockingTab() {
  if ( editable == true ) {
    document.getElementById(backlogDiv).focus();
  }
}

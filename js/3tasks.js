
var tasksarray = ['task 1','task 2','task 3','task 4','task 5']
var nextTask = 0;



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function updateTaskList(){
  for (var i = 1; i < 11; i++) {
    var valuefrominputtext = document.getElementById("listitem" + i).value
    tasksarray[i-1] = valuefrominputtext;
  }
  console.log("whatssupman");
  initialize();

}


function initialize() {
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

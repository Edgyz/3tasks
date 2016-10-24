var editable = false;
//is the backlog editable
  var nextTask = 0;
var taskbacklog = [];
var activetasks = [];
var backlogDiv = 'tests';
//name of the backlog editable div for later functions

function refreshData(){

  function updateDisplayedTasks(){
  for (var i = 0; i < 3; i++) {
    var j = i+1;
    if (typeof activetasks[i] !== 'undefined') {
      var x = activetasks[i].txt;
      console.log(i);
    } else { x = "No tasks left! woah!"; }

    document.getElementById("labelinp"+j).innerHTML =
    x;
  }
}
getBacklogFromLocalStorage();
if(document.getElementById('tasks') !== null){
  updateDisplayedTasks();
}
}

function updateTaskText(tasknumber) {

  document.getElementById("labelinp"+tasknumber).innerHTML =
  activetasks[0].txt;
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
function textReplace(labelid){
  console.log("replacing text" + labelid);
    document.getElementById("labelinp"+labelid).innerHTML =
  activetasks[labelid+1].txt;


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
    checkTask(x);
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
  //Making it editable
  if ( editable == false ) {
    fetchText(texts.editbtn_0,'editbtn_0');
    document.getElementById(backlogDiv).setAttribute("contenteditable", "true");
    document.getElementById(backlogDiv).setAttribute("class", "editable");
    editable = true;
  } else {
    //Disabling edition
    document.getElementById(backlogDiv).setAttribute("contenteditable", "false");
  fetchText(texts.editbtn_1,'editbtn_0');
  document.getElementById(backlogDiv).setAttribute("class", "");
  editable = false;
  saveCurrentBacklog();
  refreshData();

  }

}


function saveCurrentBacklog() {
  InputArrayToBacklog(cleanBacklogHTML());
  saveBacklogToLocalStorage();

}


function cleanBacklogHTML() {

  var htmlinput = document.getElementById(backlogDiv).innerHTML;
  //remove HTML tags and save each line as...an obj?

  //removing ul, li tags, id and class elements
  htmlinput = htmlinput.replace(/<ul>|<\/ul>|<\/li>/g,'');
  htmlinput = htmlinput.replace(/ id="sampletask_.+" class="fetchtxt"/g,'');

  //adding '|' to separate each line
  htmlinput = htmlinput.replace(/<li>/g,'|');

  //removing white spaces
  htmlinput = htmlinput.replace(/\r?\n|\r/g,'');
  htmlinput = htmlinput.replace(/ +(?= )/g,'');

  //splitting with '|'
  var newtaskarray = htmlinput.split('|');
  console.log(newtaskarray);

  //Removing empty lines or white spaces from array
  for (var i = 0; i < newtaskarray.length; i++) {


        //if the line is empty....
        if ((newtaskarray[i] === "")||(newtaskarray[i] === " "))
        {

          console.log("whitespace"+i);

          // and it's the first one: shift & set i back to 0
              if( i == 0 )
              {
                newtaskarray.shift();
                i=-1;
              }

            // if it's the last one then we pop
              else if (i==newtaskarray.length-1)
              {
                  newtaskarray.pop();
                  console.log("poping");
              }
              // in every other case we splice
              else
              {
                newtaskarray.splice(i,1);
                console.log("splicing");
                i--;
              }
        } else {
          newtaskarray[i] = newtaskarray[i].trim();
        }

    } //end of for loop

  return newtaskarray;
}


function InputArrayToBacklog(inputarray) {
  for (var i = 0; i < inputarray.length; i++) {
    var task =
    {
      tid : i,
      txt : inputarray[i],
      done : false,
    };

    taskbacklog[i] = task;
  }

}

function saveBacklogToLocalStorage(){
  localStorage["numberoftasks"] =  taskbacklog.length;
  for (var i = 0; i < taskbacklog.length; i++) {

      localStorage["backlogtask." + i + ".tid"] = taskbacklog[i].tid;
      localStorage["backlogtask." + i + ".txt"] = taskbacklog[i].txt;
      localStorage["backlogtask." + i + ".done"] = taskbacklog[i].done;
    }
  }

function getBacklogFromLocalStorage(){
    if (typeof localStorage["numberoftasks"] !== 'undefined'){

      for (var i = 0; i < localStorage["numberoftasks"]; i++)
      {
        taskbacklog[i] =
          {
          tid: localStorage["backlogtask." + i + ".tid"],
          txt: localStorage["backlogtask." + i + ".txt"],
          done: localStorage["backlogtask." + i + ".done"]
          }
      }

        console.log(taskbacklog);
        makeActiveTaskList();
      } else { console.log("no stored data found");}

      fillBacklogHTMLwithData();
    }

    function makeActiveTaskList(){
      var j = 0;
      for (var i = 0; i < taskbacklog.length; i++)
      {
        if(taskbacklog[i].done == "false"){
          activetasks[j] =
            {
            tid: localStorage["backlogtask." + i + ".tid"],
            txt: localStorage["backlogtask." + i + ".txt"],
            done: localStorage["backlogtask." + i + ".done"]
            }
          j++;
        }
      }
console.log(activetasks);
    }

function fillBacklogHTMLwithData(){
  var HTMLcontent='';

  for (var i = 0; i < taskbacklog.length; i++)
  {
    if (taskbacklog[i].done == 'true') {

      HTMLcontent = HTMLcontent + '<li class="done">' + taskbacklog[i].txt +"</li>";

    } else
    HTMLcontent = HTMLcontent + "<li>" + taskbacklog[i].txt +"</li>";

  }
  document.getElementById(backlogDiv).innerHTML=
  "<ul>"+ HTMLcontent + "</ul>" ;
}



function blockingTab() {
  if ( editable == true ) {
    document.getElementById(backlogDiv).focus();
  }
}

function hideShowBacklog() {
  var x = document.getElementById("backlog");
  if ( x.getAttribute("class") == "visible" ) {
    x.setAttribute("class","invisible");
    document.getElementById("caretspot").setAttribute("class","fa fa-caret-right");
  } else {
  x.setAttribute("class","visible");
  document.getElementById("caretspot").setAttribute("class","fa fa-caret-down");
  }
}


function toMainPage(){
  saveCurrentBacklog();
  window.location.href = window.location.href.replace("/index.html","/main.html");

}

function checkTask(checkboxNumber){
  //checkboxNumber: 1, 2 or 3
  //first look in the activetasks array and find the task id
  //that matches the text for this checkbox
  var tasktext = document.getElementById('labelinp'+checkboxNumber).innerHTML;
  for (var i = 0; i < activetasks.length; i++) {
    if (tasktext == activetasks[i].txt) {
      console.log("that's the one "+i);
      //if it's a match the task is marked "done" in the backlog var
      taskbacklog[i].done = true;
      activetasks.splice(i,1);
      saveBacklogToLocalStorage();
      refreshData();
    } else { console.log("couldn't find");}
  }
}

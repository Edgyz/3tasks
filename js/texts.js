
var texts =
  {
  title_0: "it's only 3 tasks!",
  intro_0: "Maybe this tool can help you with overwhelm & procrastination. Maybe not. IDK."
            +"<br><br>First, let's write everything down. Don't worry about the order of the tasks, "
            +"or how long it would take. "
            +"Simply fill the list below with any task that's on your mind.",
  reviewintro_1: "Let's review your tasks.",
  editbtn_0: "Edit backlog",
  editbtn_1: "I'm done editing!",
  nextbtn_0: "OK, I'm done!",
  processchckbox_0: "Let's review those first",
  sampletask_0: "Noter tout ce que j'ai à faire",
  sampletask_1: "Appuyer sur entrée après chaque tâche",
  sampletask_2: "Prends ton temps, la liste est infinie...",
  reviewquestion_0: "Would you say that",
  question_0: "is doable in...",
  questionA_0: "< 5mn",
  questionB_0: "< 25mn",
  questionC_0: "< 45mn",
  questionD_0: "1h +"

  };

function fetchText(whichtext,whichdiv){
  //this injects the specified text (whichtext) into the designated div (whichdiv)
  if (document.getElementById(whichdiv) !== null && typeof whichtext !== 'undefined') {
    document.getElementById(whichdiv).innerHTML = whichtext;
    console.log("Placed text " +whichtext+ " in " +whichdiv);
  }
  else
    {
    console.log("Error; Couldn't find div "+whichdiv+" or text"+whichtext);
    }

}




function fetchWholePageTexts(nameofclass)
{
//This is what the html looks like :
// <h1 id="title_0" class="nameofclass">

  //the class is used to identify html content that needs text
  var x = document.getElementsByClassName(nameofclass);

  //then we loop through those and get the right text & div
  for (var i = 0; i < x.length; i++)
  {

    //get the id
    var elmtid = x[i].id;
    //get corresponding text from texts global var
    var textvar = texts[elmtid];

    if (typeof textvar !== 'undefined') //if the text is found
    {
    fetchText(textvar,elmtid); //inject into page
    }
    else //error message
    { console.log("something went wrong placing the next for "+elmtid);
    }
  }
}

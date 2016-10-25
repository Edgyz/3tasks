
var texts =
  {
  title_0: "it's only 3 tasks!",
  intro_0: "Write down eeeeverything that you have to do. It's ok. Everything you can think of.",
  editbtn_0: "Edit backlog",
  editbtn_1: "I'm done editing!",
  nextbtn_0: "OK, I'm done!",
  sampletask_0: "Noter tout ce que j'ai à faire",
  sampletask_1: "Appuyer sur entrée après chaque tâche",
  sampletask_2: "Prends ton temps, la liste est infinie..."

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

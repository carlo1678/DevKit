function Card(term, definition) {
  this.term = term;
  this.definition = definition;
}
let newDeck = [];
let newCard;
let front = document.getElementById("front");
let back = document.getElementById("back");
let flip = document.getElementById("flip");
let submit = document.getElementById("submit");
let clearDeck = document.getElementById("clearDeck");
let formFront, formBack;

function slideIn(){
  $('#importExport').animate({'left':'10px'},500);
        
    };
function slideOut(){
        $('#importExport').animate({'left':'-610px'},500);
    };
const card1 = new Card(
  "Question 1",
  "Answer 1",
  "General"
);
const card2 = new Card(
  "Question 2",
  "Answer 2",
  "General"
);

let myCards = [card1, card2];
let cardIndex = 0;
front.innerHTML = card1.term;
back.innerHTML = card1.definition;
back.style.visibility = "hidden";
function flash() {
  if (front.style.visibility != "hidden") {
    front.style.visibility = "hidden";
    back.style.visibility = "visible";
  } else {
    front.style.visibility = "visible";
    back.style.visibility = "hidden";
  }
}
function cardAdd(formFront, formBack) {
  function clearForm() {
    document.getElementById("newTerm").value = "";
    document.getElementById("newDef").value = "";
    document.getElementById("cardForm").reset();
  }
  function updatePlaceholder() {
    document.getElementById("newTerm").placeholder =
      "Add another term?";
    document.getElementById("newDef").placeholder =
      "Add another definition?";
  }

  formFront = document.getElementById("newTerm");
  formBack = document.getElementById("newDef");
  if (
    formFront.value !== formBack.value &&
    formFront.value != "" &&
    formBack.value != ""
  ) {
    let newCard = new Card();
    newCard.term = formFront.value;
    newCard.definition = formBack.value;
    myCards.push(newCard);
    cardIndex = myCards.length - 1;
    clearForm();
    updatePlaceholder();
    front.innerHTML = myCards[cardIndex].term;
    back.innerHTML = myCards[cardIndex].definition;
  } else if (formFront.value == formBack.value) {
    alert('kinda defeats the purpose of a "flash" card doesn`t it?');
  } else if (
    (formFront.value == null || formFront.value == "", formBack.value == null ||
      formBack.value == "", formFront.value == null ||
      formBack.value == null ||
      formFront.value == "" ||
      formBack.value == "")
  ) {
    alert("Fill out both sides of the card, ya dringus!");
  }
  document.getElementById("newTerm").focus();
}
function nextCard() {
  cardIndex = (cardIndex + 1) % myCards.length;
  front.innerHTML = myCards[cardIndex].term;
  back.innerHTML = myCards[cardIndex].definition;
}
function prevCard() {
  if (cardIndex > 0)
    cardIndex = (cardIndex - 1);
  else if (cardIndex == 0) cardIndex = myCards.length-1;
  front.innerHTML = myCards[cardIndex].term;
  back.innerHTML = myCards[cardIndex].definition;
}
function emptyDeck() {
  let confirmation = confirm("Are you sure you want to delete this deck?");
  if (confirmation) {
  myCards.splice(0, myCards.length);
  cardIndex = 0;
  front.innerHTML = "&nbsp;";
  back.innerHTML = "&nbsp;";
  }
  document.getElementById("newTerm").focus();
}
    document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 37 ) {
        prevCard();
    }
    if (event.keyCode == 39 ) {
        nextCard();
    }
    if (event.keyCode == 38 || event.keyCode == 40) {
      flash();
    }
    if (event.keyCode == 46) {
      emptyDeck();
    }
});
function cardSelect(myCards, cardIndex) {
  let selectCards = document.getElementById("selectCards");
  let options = selectCards.appendElement("")
  options.map(myCards.keys);
}
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function updateDeck() {
  document.getElementById("front").innerHTML = myCards[cardIndex].term;
  document.getElementById("back").innerHTML = myCards[cardIndex].definition;
}

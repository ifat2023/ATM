const cust = [
  {
    name: "AVI COHEN",
    pin: 1234,
    amount: 1000,
  },
  {
    name: "ETAY ELGART",
    pin: 8520,
    amount: 4000,
  },
  {
    name: "IFAT SHTIVI",
    pin: 1312,
    amount: 50000,
  },
];

let state = "start";

let selectedUser = null;


function welcome() {
  content.innerHTML =
    '<form onsubmit="nameSelected()"><h2>WELCOME, <br> PLEASE ENTER YOUR FULL NAME.</h2><input id="fullName" type="text">';
}


function nameSelected() {
  const fullName = document.querySelector("#fullName").value;

  for (let i = 0; i < cust.length; i++) {
    if (cust[i].name.toLowerCase() == fullName.toLowerCase()) {
      selectedUser = cust[i];
    }
  }

  if (selectedUser == null) {
    alert("not found");
    return;
  }

  content.innerHTML =
    '<form onsubmit="pinSelected()"><h2>WELCOME, ' +
    selectedUser.name +
    '<br> PLEASE ENTER YOUR PIN.</h2><input id="number" type=number max="9999">';
}

function pinSelected() {
  const pin = document.querySelector("#number").value;

  if (pin == selectedUser.pin) {
    atmMenu();
  } else {
    alert("The pin code is incorrect ,please try again");
    content.innerHTML =
    '<form onsubmit="pinSelected()"><h2>WELCOME, ' +
    selectedUser.name +
    '<br> PLEASE ENTER YOUR PIN.</h2><input id="number" type=number max="9999">';
    return;
  }
}

welcome();


function atmMenu() {
 
  state = "menu";
  content.innerHTML =
  '<form onsubmit="atmMenu()"><h2>ATM MENU, ' + 
  '<br><br><br> Press button D to Deposite Money <br><br> Press button W to Withdraw Money <br><br> Press button C to Check your Balance <br><br> Press button Q to Quit Press button';

  
}


function dClicked(){

  if(selectedUser == null){
    return;
  }
content.innerHTML =
'<form onsubmit="deposite()"><h2>How much would you like to Deposite? </h2>' + '<input id="dnumber" type=number max="9999">' ;
  
}


function deposite(){
  
    const amount =  document.querySelector("#dnumber").value;
    const balance = selectedUser.amount + Number(amount)

 if (amount % 20 == 0 || amount % 50 == 0 || amount % 100 == 0 ){
  selectedUser.amount = balance;
 alert ( "You have just made a deposit  " + amount + "NIS" + " You can check your account ")
  atmMenu() ;
 }
 else{
    alert("This amount cannot be deposited");
    atmMenu() ;
return;
 }
}

function wClicked(){
  if(selectedUser == null){
    return;
  }
    content.innerHTML =
    '<form onsubmit=""><h2>How much would you like to Withdraw? <br><br> 1 - 50 , 2 - 100 , 3 - 150, 4 - 300, 5 - other </h2>'
       state = "withdraw";  
}

function btn(val1){

  if(state == "withdraw"){
    
    const val = val1-1;
    const money = [50, 100, 150, 300, "other"];
    

   if (money[val] == "other") {
        const otherAmount = Number(prompt("How much would you like to withdraw?"));
       
        if (selectedUser.amount - otherAmount < 0){
          alert ( "sorry, You don't have enough money in your account,");
          atmMenu() ;
          return;
        }
    
        selectedUser.amount = selectedUser.amount -  Number(otherAmount);
        alert ( "You just went on " + otherAmount + " NIS  " +  "You can check your account");
        atmMenu() ;
   }
 
   else if( selectedUser.amount - Number(money[val]) < 0 ){
    alert ( "sorry, You don't have enough money in your account,");
    atmMenu() ;
  }
  
  else if (money[val] == 50 || money[val] == 100 || money[val] == 150 || money[val] == 300 ){
    selectedUser.amount = selectedUser.amount - Number(money[val]);
    alert ("You just went on " +  money[val] + " NIS " + "You can check your account");
    atmMenu() ;
  }
}
}


function cClicked(){
  if(selectedUser == null){
    return;
  }

  content.innerHTML =
    '<form ><h2>Your current Balance is   ' + selectedUser.amount + ' NIS</h2><button onclick="cNextClicked()">close</button>'
}

function cNextClicked(){
  atmMenu() ;
  
}



function qClicked(){
  state = "qClicked"
  
    content.innerHTML =
    '<h2>GOOD BY ,<br> HAVE A NICE DAY :) </h2>';
     
}



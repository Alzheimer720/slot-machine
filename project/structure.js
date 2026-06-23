
let balance = 0; 
const balanceDisplay = document.getElementById("balance-display");
const depositInput = document.getElementById("deposit-input");
const depositBtn = document.getElementById("deposit-btn");
const depositMsg = document.getElementById("deposit-msg");
const linesInput = document.getElementById("lines-input");
const betInput = document.getElementById("bet-input");
const spinBtn = document.getElementById("spin-btn");
const resultMsg = document.getElementById("result-msg");
const slotGrid = document.getElementById("slot-grid");
depositBtn.addEventListener("click", () => {
    const amount = parseFloat(depositInput.value);
    if (isNaN(amount)||amount<=0){
        depositMsg.innerText = "Invalid amount. Please try again.";
    } else {
        balance += amount;
        balanceDisplay.innerText = balance;
        depositInput.value = ""; 
        depositMsg.innerText = "";
        resultMsg.innerText = "Money loaded. Ready to spin!";
    }
});
spinBtn.addEventListener("click", () => {
    const NumberofLines = parseFloat(linesInput.value);
    const Bet = parseFloat(betInput.value);
    if (NumberofLines>3||NumberofLines<1||isNaN(NumberofLines)){
        resultMsg.innerText = "Invalid number of lines, Please try again";
        return;
    }
    if (isNaN(Bet)||Bet<=0||Bet>(balance/NumberofLines)){
        resultMsg.innerText = "Invalid bet, try again.";
        return;
    }
    balance -= (Bet*NumberofLines);
    balanceDisplay.innerText = balance;

    const reels = Spin();
    const rows = transpose(reels);
    
    slotGrid.innerHTML = ""; 
    for (const row of rows){
        for (const symbol of row){
            const div = document.createElement("div");
            div.classList.add("slot-item");
            div.innerText = symbol;
            slotGrid.appendChild(div);
        }
    }

    const winnings=getWinnings(rows, Bet, NumberofLines);
    balance += winnings;
    balanceDisplay.innerText = balance;
    if (winnings>0){
        resultMsg.innerText = "You won, ₹" + winnings;
        resultMsg.className = "win-text";
    }else{
        resultMsg.innerText = "You won ₹0. Try again!";
        resultMsg.className = "";
    }
});
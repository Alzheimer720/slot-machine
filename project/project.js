// 1-> deposit some money
// 2-> determine the number of lines to bet on
// 3-> collect the bet amount
// 4-> spin the slot machine
// 5-> check if the user won
// 6-> give the user their winnings
// 7-> play again
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
const prompt=require("prompt-sync")();

const ROWS=3;
const COLS=3;
const SYMBOLS_Count={
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit=()=>{
    while(true){
    const depositAmount=prompt("Enter a deposit amount: ")
    const numberDepositAmount=parseFloat(depositAmount)
    if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
        console.log("Invalid amount . Please try again")
    }
    else{
    return numberDepositAmount;
}
}
};

const getNumberOflines=()=>{
    while(true){
        const No_lines=prompt("Enter the number of lines to bet on (1-3) : ")
    const lines=parseFloat(No_lines)
        if(lines>3 || lines <1 || isNaN(lines)){
            console.log("Invalid number of lines, Please try again")
        }
        else{
            return lines;
        }
    }
}

const getBet=(balance,lines)=>{
    while(true){
        const bet=prompt("Enter the bet per line : ");
        const Nbet=parseFloat(bet);
        if(isNaN(Nbet) || Nbet<=0 || Nbet>(balance/lines)){
            console.log("Invalid bet, try again.")
        }
        else{
            return Nbet
        }
    }
};

const Spin=()=>{
    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_Count)){
        for( let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels=[];
for(let i=0;i<COLS;i++){
    reels.push([]);
    const reelSymbols=[...symbols];
    for(let j=0;j<ROWS;j++){
        const randomIndex=Math.floor(Math.random()*reelSymbols.length);
        const selectedSymbol=reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);
    }
}
return reels;
};
const transpose=(reels)=>{
    const rows=[];
    for(let i =0;i<ROWS;i++){
        rows.push([]);
        for( let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows
}
const printRows=(rows)=>{
for(const row of rows){
    let rowString="";
    for(const[i,symbol] of row.entries()){
        rowString+=symbol;
        if(i!=row.length-1){
            rowString+=" | "
        }
    } 
    console.log(rowString) 
}
}
const getWinnings=(rows,bet,NumberofLines)=>{
    let winnings=0;
    for(let i=0;i<NumberofLines;i++){
        const symbols=rows[i];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winnings+=bet*SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
};
const Game=()=>{
    let balance=deposit()
   while(true){ 
console.log(`You have a balance of ${balance}`)
const NumberofLines=getNumberOflines()
const Bet=getBet(balance,NumberofLines)
balance-=Bet*NumberofLines;
const reels=Spin();
const rows=transpose(reels);
printRows(rows);
const winnings=getWinnings(rows,Bet,NumberofLines)
console.log("You won, ₹" + winnings.toString())
if(balance<0){
    console.log("YOU RAN OUT OF MONEY!")
    break 
}
    const PlayAgain=prompt("Do you want to play again? (y/n)")
    if(PlayAgain!="y") break
   } 
}
Game();
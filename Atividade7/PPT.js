alert("Escolha: Pedra, Papel ou Tesoura (escreva exatamente do jeito demonstrado");
let escolha;
escolha = prompt("Escolha: ");

let escolhacpu = Math.random();
let cpuppt; 

if(escolhacpu < 0.33){
    cpuppt = "Pedra";
} else if(escolhacpu > 0.66){
    cpuppt = "Papel";
} else {
    cpuppt = "Tesoura";
}

if (cpuppt == "Pedra" && escolha == "Pedra"){
    alert("Empate: " + escolha + " e " + cpuppt);
}
if (cpuppt == "Pedra" && escolha == "Papel"){
    alert("Ganhou: " + escolha + " e " + cpuppt);
}
if (cpuppt == "Pedra" && escolha == "Tesoura"){
    alert("Perdeu: " + escolha + " e " + cpuppt);
}

if (cpuppt == "Papel" && escolha == "Papel"){
    alert("Empate: " + escolha + " e " + cpuppt);
}
if (cpuppt == "Papel" && escolha == "Pedra"){
    alert("Perdeu: " + escolha + " e " + cpuppt);
}
if (cpuppt == "Papel" && escolha == "Tesoura"){
    alert("Ganhou: " + escolha + " e " + cpuppt);
}

if (cpuppt == "Tesoura" && escolha == "Tesoura"){
    alert("Empate: " + escolha + " e " + cpuppt);
}
if (cpuppt == "Tesoura" && escolha == "Papel"){
    alert("Perdeu: " + escolha + " e " + cpuppt);
}
if (cpuppt == "Tesoura" && escolha == "Pedra"){
    alert("Ganhou: " + escolha + " e " + cpuppt);
}

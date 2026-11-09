function pergunta1(){
    let Valores = [3];
    let maiorVal = 0;
    for(let i = 0; i < 3; i++){
        Valores[i] = Number(prompt("Digite o "+ (i+1) +"° numero:"));
        if (Valores[i] > maiorVal) {
            maiorVal = Valores[i];
    }
}
    return(maiorVal);
}
alert("resposta 1: " + pergunta1());

function pergunta2(){
        let Valores2 = [3]
        for(let i = 0; i < 3; i++){
        Valores2[i] = Number(prompt("Digite o "+ (i+1) +"° numero:"));
    }
    return (Valores2.sort((a, b) => a - b));
}
alert("resposta 2: " + pergunta2());

function pergunta3(){
    let palavra = prompt("Digite uma palavra: ");
    
    let invertida = palavra.split('').reverse().join('');
    
    let limpaOriginal = palavra.toLowerCase().replace(/\s+/g, '');
    let limpaInvertida = invertida.toLowerCase().replace(/\s+/g, '');

    if (limpaOriginal === limpaInvertida) {
        return(`"${palavra}" é um palindromo!`);
    } else {
        return(`"${palavra}" não é um palindromo.`);
    }
}
alert("resposta 3: " + pergunta3());

function pergunta4(){
    let palavra1 = prompt("digite a primeira palavra: ");
    let palavra2 = prompt("digite a segunda palavra: ");

    if (palavra1 == "" || palavra2 == "" || palavra1 == undefined || palavra2 == undefined){
        return("erro");
    } else if (palavra1.includes(palavra2)){
        return("é um subconjunto")
    } else {
        return("não é um subconjunto")
    }
}
alert("resposta 4: " + pergunta4());

function pergunta5(){
    let data = new Date (prompt("digite uma data (mês-dia-ano):"));
    

    let diasDaSemana = [
        "Domingo", 
        "Segunda-feira", 
        "Terça-feira", 
        "Quarta-feira", 
        "Quinta-feira", 
        "Sexta-feira", 
        "Sábado"
    ];

    let numeroDia = data.getDay();
    
    return diasDaSemana[numeroDia];
}
alert("resposta 5: " + pergunta5());
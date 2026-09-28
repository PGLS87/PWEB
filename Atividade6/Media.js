    alert("Digita o nome do aluno")
    let nome;
    nome = prompt("nome: ");
    alert("Nome digitado: "+ nome);

    alert("Digite as notas do aluno");
    nota1 = parseFloat(prompt("nota 3: "));
    alert("Nota 1: "+ nota1);
    nota2 = parseFloat(prompt("nota 3: "));
    alert("Nota 2: "+ nota2);
    nota3 = parseFloat(prompt("nota 3: "));
    alert("Nota 3: "+ nota3);
    nota4 = parseFloat(prompt("nota 4: "));
    alert("Nota 4: "+ nota4);
    let media = (nota1+nota2+nota3+nota4)/4;
    alert("Média: "+ media.toFixed(2));
    
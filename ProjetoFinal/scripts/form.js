const inputFoto = document.getElementById("foto");
const imgPerfil = document.querySelector(".foto-perfil");
const fotoPadrao =
  "https://img.magnific.com/vetores-premium/icone-de-usuario-em-icone-cinza-redondo_1076610-44912.jpg?semt=ais_hybrid&w=740&q=80";

inputFoto.addEventListener("input", () => {
  const url = inputFoto.value.trim();
  imgPerfil.src = url || fotoPadrao;
});

// para ver se é editar ou cadastrar
const urlParams = new URLSearchParams(window.location.search);
const modo = urlParams.get("modo"); // Retorna 'novo' ou 'editar'
const idMedico = urlParams.get("id"); // Retorna o id do médico

if (modo === "editar" && idMedico) {
  document.querySelector(".titulo-pagina h1").textContent = "Editar médico";
  document.title = "Edição de médico - SICA";

  // busca o médico na lista do localStorage
  const lista = JSON.parse(localStorage.getItem("medicos")) || [];
  const medico = lista.find((m) => m.id == idMedico);

  if (medico) {
    // preenche os campos de texto
    document.getElementById("nome").value = medico.nome;
    document.getElementById("sobre").value = medico.sobre;
    document.getElementById("crm").value = medico.crm;
    document.getElementById("especialidade").value = medico.especialidade;
    document.getElementById("valor").value = medico.valorConsulta;
    document.getElementById("email").value = medico.email;
    document.getElementById("telefone").value = medico.telefone;
    document.getElementById("foto").value = medico.foto;
    document.getElementById("manha-inicio").value = medico.manhaInicio;
    document.getElementById("manha-fim").value = medico.manhaFim;
    document.getElementById("tarde-inicio").value = medico.tardeInicio;
    document.getElementById("tarde-fim").value = medico.tardeFim;
    document.getElementById("intervalo").value = medico.intervalo;

    if (medico.foto) {
      imgPerfil.src = medico.foto;
    }

    // MArca os checkboxes dos dias que ele atende
    const checkboxes = document.querySelectorAll('input[name="dias"]');
    checkboxes.forEach((cb) => {
      if (medico.dias.includes(cb.value)) {
        cb.checked = true;
      }
    });
  }
}

const formulario = document.getElementById("form-medico");

formulario.addEventListener("submit", (e) => {
  limparErros();
  e.preventDefault();

  let nome = document.getElementById("nome");
  let sobre = document.getElementById("sobre");
  let crm = document.getElementById("crm");
  let especialidade = document.getElementById("especialidade");
  let valorConsulta = document.getElementById("valor");

  let email = document.getElementById("email");
  let telefone = document.getElementById("telefone");

  let foto = document.getElementById("foto").value;
  let diasSelecionados = document.querySelectorAll(
    'input[name="dias"]:checked',
  );
  let dias = Array.from(diasSelecionados).map((dia) => dia.value);

  let manhaInicio = document.getElementById("manha-inicio");
  let manhaFim = document.getElementById("manha-fim");
  let tardeInicio = document.getElementById("tarde-inicio");
  let tardeFim = document.getElementById("tarde-fim");
  let intervalo = document.getElementById("intervalo");

  let temErro = false;

  // validacao

  // validação nome
  if (nome.value.trim().length < 2) {
    mostrarErro(nome, "Nome obrigatório!");
    temErro = true;
  }

  // validação crm
  const regexCRM = /^\d{4,7}\s*[-/]?\s*[A-Za-z]{2}$/;
  if (!regexCRM.test(crm.value.trim())) {
    mostrarErro(crm, "CRM Inválido!");
    temErro = true;
  }

  // especialidade
  if (especialidade.value.trim().length < 2) {
    mostrarErro(especialidade, "Especialidade Obrigatória!");
    temErro = true;
  }

  // valor consulta
  if (
    valorConsulta.value === "" ||
    valorConsulta.value === null ||
    valorConsulta.value === undefined
  ) {
    mostrarErro(valorConsulta, "Valor da consulta obrigatório!");
    temErro = true;
  } else if (valorConsulta.value <= 0) {
    mostrarErro(valorConsulta, "Valor da consulta deve ser maior que 0!");
    temErro = true;
  } else if (isNaN(valorConsulta.value)) {
    mostrarErro(valorConsulta, "Valor da consulta obrigatório!");
    temErro = true;
  }

  // email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value.trim())) {
    mostrarErro(email, "Email inválido!");
    temErro = true;
  }

  // telefone
  if (telefone.value.replace(/\D/g, "").length < 10) {
    mostrarErro(telefone, "Telefone inválido");
    temErro = true;
  }

  if (!foto) {
    foto =
      "https://img.magnific.com/vetores-premium/icone-de-usuario-em-icone-cinza-redondo_1076610-44912.jpg?semt=ais_hybrid&;w=740&;q=80";
  }

  // valida se selecionou pelo menos um dia
  const divSemana = document.getElementById("dias-semana");
  if (dias.length === 0) {
    mostrarErro(divSemana, "Selecione pelo menos um dia!");
    temErro = true;
  }

  // valida os horarios
  // ve se nenhum campo foi preenchido
  if (
    !manhaInicio.value &&
    !manhaFim.value &&
    !tardeInicio.value &&
    !tardeFim.value
  ) {
    mostrarErro(manhaInicio, "Preencha ao menos um período (manhã ou tarde)!");
    temErro = true;
  }

  // validação da MANHÃ
  // verifica se preencheu só o início ou so o término
  if (manhaInicio.value && !manhaFim.value) {
    mostrarErro(manhaFim, "Preencha o término da manhã!");
    temErro = true;
  } else if (!manhaInicio.value && manhaFim.value) {
    mostrarErro(manhaInicio, "Preencha o início da manhã!");
    temErro = true;
  }

  // verifica que é horário da manhã, até  as 12:00
  if (manhaInicio.value && manhaInicio.value > "12:00") {
    mostrarErro(manhaInicio, "Horário da manhã deve ser até 12:00!");
    temErro = true;
  }
  if (manhaFim.value && manhaFim.value > "12:00") {
    mostrarErro(manhaFim, "Horário da manhã deve ser até 12:00!");
    temErro = true;
  }

  // termino deve ser depois do início
  if (
    manhaInicio.value &&
    manhaFim.value &&
    manhaInicio.value >= manhaFim.value
  ) {
    mostrarErro(manhaFim, "O término da manhã deve ser depois do início!");
    temErro = true;
  }

  // validação da TARDE
  // Se preencheu só o início ou só o término
  if (tardeInicio.value && !tardeFim.value) {
    mostrarErro(tardeFim, "Preencha o término da tarde!");
    temErro = true;
  } else if (!tardeInicio.value && tardeFim.value) {
    mostrarErro(tardeInicio, "Preencha o início da tarde!");
    temErro = true;
  }

  // verifica que é horário da tarde a partir das 12:00
  if (tardeInicio.value && tardeInicio.value < "12:00") {
    mostrarErro(tardeInicio, "Horário da tarde deve ser a partir de 12:00!");
    temErro = true;
  }
  if (tardeFim.value && tardeFim.value < "12:00") {
    mostrarErro(tardeFim, "Horário da tarde deve ser a partir de 12:00!");
    temErro = true;
  }

  // Término deve ser depois do início
  if (
    tardeInicio.value &&
    tardeFim.value &&
    tardeInicio.value >= tardeFim.value
  ) {
    mostrarErro(tardeFim, "O término da tarde deve ser depois do início!");
    temErro = true;
  }

  // valida intervalo
  if (!intervalo.value || Number(intervalo.value) < 5) {
    mostrarErro(intervalo, "Informe um intervalo de no mínimo 5 minutos!");
    temErro = true;
  }

  // Se houver qualquer erro, encerra aqui e não salva
  // o médico
  if (temErro) {
    return;
  }

  let lista = JSON.parse(localStorage.getItem("medicos")) || [];

  if (modo === "editar" && idMedico) {
    const index = lista.findIndex((m) => m.id == idMedico);
    if (index !== -1) {
      lista[index] = {
        id: Number(idMedico),
        foto: foto,
        nome: nome.value,
        sobre: sobre.value,
        crm: crm.value,
        especialidade: especialidade.value,
        valorConsulta: valorConsulta.value,
        email: email.value,
        telefone: telefone.value,
        dias: dias,
        manhaInicio: manhaInicio.value,
        manhaFim: manhaFim.value,
        tardeInicio: tardeInicio.value,
        tardeFim: tardeFim.value,
        intervalo: intervalo.value,
      };
    }
  } else {
    lista.push({
      id: Date.now(),
      foto: foto,
      nome: nome.value,
      sobre: sobre.value,
      crm: crm.value,
      especialidade: especialidade.value,
      valorConsulta: valorConsulta.value,
      email: email.value,
      telefone: telefone.value,
      dias: dias,
      manhaInicio: manhaInicio.value,
      manhaFim: manhaFim.value,
      tardeInicio: tardeInicio.value,
      tardeFim: tardeFim.value,
      intervalo: intervalo.value,
    });
  }

  localStorage.setItem("medicos", JSON.stringify(lista));

  alert(
    modo === "editar"
      ? "Médico atualizado com sucesso!"
      : "Médico cadastrado com sucesso!",
  );
  window.location.href = "diretorio.html";
});

// remove todas as mensagem de erros
function limparErros() {
  const mensagens = document.querySelectorAll(".mensagem-erro");
  mensagens.forEach((msg) => msg.remove());

  const inputsInvalidos = document.querySelectorAll(".input-erro");
  inputsInvalidos.forEach((input) => input.classList.remove("input-erro"));
}

// cria um texto embaixo do input mostrando uma mensa
//de erro e realça de vermelho o input
function mostrarErro(elemento, mensagem) {
  elemento.classList.add("input-erro");

  const spanErro = document.createElement("span");
  spanErro.className = "mensagem-erro";
  spanErro.textContent = mensagem;

  elemento.after(spanErro);
}

// formata o telefona conforme o usuario
// digita no input do telefone
function formatarTelefone(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = v;
}

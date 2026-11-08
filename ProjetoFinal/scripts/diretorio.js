document.addEventListener("DOMContentLoaded", () => {
  carregarMedicos();

  const inputPesquisa = document.getElementById("pesquisa");
  inputPesquisa.addEventListener("input", (e) => {
    carregarMedicos(e.target.value);
  });
});

function carregarMedicos(filtro = "") {
  const tbody = document.getElementById("tabela-medicos-corpo");
  const contador = document.querySelector(".subtitulo");
  const lista = JSON.parse(localStorage.getItem("medicos")) || [];

  // Filtrar médicos por nome ou CRM
  const termo = filtro.toLowerCase().trim();
  const medicosFiltrados = lista.filter(
    (m) =>
      m.nome.toLowerCase().includes(termo) ||
      m.crm.toLowerCase().includes(termo)
  );

  // Atualizar contador de médicos no topo da tela
  const total = medicosFiltrados.length;
  contador.textContent =
    total === 1 ? "1 médico cadastrado" : `${total} médicos cadastrados`;

  tbody.innerHTML = "";

  if (total === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 24px; color: #666;">
          Nenhum médico encontrado.
        </td>
      </tr>
    `;
    return;
  }

  // Filtro da pesquisa por médicos
  medicosFiltrados.forEach((medico) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="medico-tabela">
          <img src="${medico.foto}" alt="Foto de perfil de ${medico.nome}">
          <span>${medico.nome}</span>
        </div>
      </td>
      <td>
        <strong>${medico.especialidade}</strong>
        <span class="texto-secundario bloco">CRM ${medico.crm}</span>
      </td>
      <td>
        <div class="acoes-tabela">
          <a class="button btn-pequeno btn-cinza" href="criar_editar.html?modo=editar&id=${medico.id}">Editar</a>
          <button class="button btn-pequeno btn-excluir" type="button" data-id="${medico.id}">Excluir</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Associa os eventos de clique aos botões de exclusão criados dinamicamente
  const botoesExcluir = tbody.querySelectorAll(".btn-excluir");
  botoesExcluir.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      excluirMedico(id);
    });
  });
}

// função para excluir médico
function excluirMedico(id) {
  if (confirm("Tem certeza que deseja excluir este médico?")) {
    let lista = JSON.parse(localStorage.getItem("medicos")) || [];
    lista = lista.filter((m) => m.id !== id);
    localStorage.setItem("medicos", JSON.stringify(lista));

    // Recarrega a tabela mantendo a consulta atual do campo de pesquisa
    const termoBusca = document.getElementById("pesquisa").value;
    carregarMedicos(termoBusca);
  }
}
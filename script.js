const cadastros = recuperar() === null ? [] : recuperar();
const APARTAMENTOS = [
  "101",
  "102",
  "103",
  "201",
  "202",
  "203",
  "301",
  "302",
  "303",
];

const BLOCOS = ["A", "B", "C", "D", "E"];

const vagas = [];

const formulario = document.querySelector("form");
const formData = new FormData(formulario);

const spans = document.querySelectorAll("span");

const botao = document.querySelector("button");

const ul = document.querySelector("ul[class='vagas']");

const sectionCadastro = document.querySelector("section[id='cadastro']");
const sectionCadastradas = document.querySelector("section[id='cadastradas']");

const linkHome = document.querySelector("a[id='link-home']");
const linkVagas = document.querySelector("a[id='link-lista-de-vagas']");

const nome = document.getElementById("nome");
const apartamento = document.querySelector("select[name='apartamento']");
const modal = document.querySelector("aside[class='modal']");
const bloco = document.querySelector("select[name='bloco']");
const vaga = document.querySelector("select[name='vaga']");
const modelo = document.getElementById("modelo");
const placa = document.getElementById("placa");
const cor = document.getElementById("cor");

function popularApartamento() {
  APARTAMENTOS.forEach((ap) => {
    const optionAp = document.createElement("option");
    optionAp.text = ap;
    apartamento.add(optionAp);
  });
}

function popularBloco() {
  BLOCOS.forEach((b) => {
    const optionBloco = document.createElement("option");
    optionBloco.text = b;
    bloco.add(optionBloco);
  });
}

function popularVagas() {
  for (let index = 1; index <= 50; index++) {
    vagasCadastradas = cadastros.map((cadastro) => Number(cadastro.vaga));
    if (!vagasCadastradas.find((i) => i === index)) {
      const optionVaga = document.createElement("option");
      optionVaga.text = index.toString();
      vaga.add(optionVaga);
    }
  }
}

function criarVagas() {
  for (let index = 1; index <= 50; index++) {
    const li = document.createElement("li");
    li.id = index;
    const pVaga = document.createElement("p");
    pVaga.innerHTML = "Vaga: " + index;
    li.appendChild(pVaga);
    ul.appendChild(li);
    cadastros.forEach((cadastro) => {
      if (Number(cadastro.vaga) === index) {
        const pFechar = document.createElement("p");
        pFechar.innerHTML = "x";
        pFechar.className = "fechar";
        li.appendChild(pFechar);
        const pApartamento = document.createElement("p");
        pApartamento.innerHTML = "Apartamento: " + cadastro.apartamento;
        const pBloco = document.createElement("p");
        pBloco.innerHTML = "Bloco: " + cadastro.bloco;
        li.appendChild(pApartamento);
        li.appendChild(pBloco);
        li.style = "background-color: #3a89c9";
      }
    });
  }
}

function armazenar(cadastros) {
  window.localStorage.setItem("cadastros", JSON.stringify(cadastros));
}

function recuperar() {
  const cadastros = JSON.parse(window.localStorage.getItem("cadastros"));
  return cadastros;
}

function validarEntradas() {
  let erros = true;

  if (nome.value.length < 3)
    spans.forEach((span) => {
      if (span.id === "nome") {
        span.innerText = "O nome precisa conter mais de 2 caracteres";
        erros = false;
      }
    });

  if (apartamento.value.length < 1)
    spans.forEach((span) => {
      if (span.id === "apartamento") {
        span.innerText = "O apartamento precisa ser preenchido";
        erros = false;
      }
    });

  if (bloco.value.length < 1)
    spans.forEach((span) => {
      if (span.id === "bloco") {
        span.innerText = "O bloco precisa ser preenchido";
        erros = false;
      }
    });

  if (vaga.value.length < 1)
    spans.forEach((span) => {
      if (span.id === "vaga") {
        span.innerText = "A vaga precisa ser preenchida";
        erros = false;
      }
    });

  if (modelo.value.length < 1)
    spans.forEach((span) => {
      if (span.id === "modelo") {
        span.innerText = "O modelo precisa ser preenchido";
        erros = false;
      }
    });

  if (placa.value.length < 1)
    spans.forEach((span) => {
      if (span.id === "placa") {
        span.innerText = "A placa precisa ser preenchida";
        erros = false;
      }
    });

  if (cor.value.length < 1)
    spans.forEach((span) => {
      if (span.id === "cor") {
        span.innerText = "A cor precisa ser preenchida";
        erros = false;
      }
    });

  return erros;
}

function removerCadastro() {
  const fechar = document.querySelectorAll(".fechar");
  fechar.forEach((el) => {
    el.addEventListener("click", (event) => {
      console.log("aqui");
      const elSelecionado = event.target;
      const ulList = elSelecionado.parentNode;
      ulList.removeChild(ulList.childNodes[1]);
      ulList.removeChild(ulList.childNodes[1]);
      ulList.removeChild(ulList.childNodes[1]);
      ulList.style = "backgrou-color: white";
      const cadastrosFiltrados = cadastros.filter(
        (cadastro) => cadastro.vaga !== ulList.id
      );
      armazenar(cadastrosFiltrados);
      window.alert("Cadastro removido");
      setInterval(() => {
        location.reload();
      }, 500);
    });
  });
}

function popularFormulario() {
  formData.set("nome", nome.value);
  formData.set("apartamento", apartamento.value);
  formData.set("bloco", bloco.value);
  formData.set("vaga", vaga.value);
  formData.set("modelo", modelo.value);
  formData.set("placa", placa.value);
  formData.set("cor", cor.value);
}

popularApartamento();
popularBloco();
popularVagas();
criarVagas();
removerCadastro();

formulario.addEventListener("submit", (event) => {
  if (validarEntradas()) {
    popularFormulario();
    cadastros.push(Object.fromEntries(formData.entries()));
    armazenar(cadastros);
    window.alert("Cadastro realizado com sucesso!");
  }
});

linkHome.addEventListener("click", () => {
  sectionCadastradas.style.display = "none";
  sectionCadastro.style.display = "block";
});

linkVagas.addEventListener("click", () => {
  sectionCadastradas.style.display = "block";
  sectionCadastro.style.display = "none";
});

const form = document.getElementById("form");
const erro = document.getElementById("erro");
const botao = form.querySelector("button");
const campoPessoas = document.getElementById("campo-pessoas");

// Esconde "quantas pessoas" quando a pessoa marca que não vai.
form.addEventListener("change", (e) => {
  if (e.target.name === "presenca") {
    campoPessoas.hidden = e.target.value === "Não";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  erro.textContent = "";

  const dados = new FormData(form);
  const nome = (dados.get("nome") || "").trim();
  const presenca = dados.get("presenca");

  if (!nome) return mostrarErro("Por favor, escreva seu nome.");
  if (!presenca) return mostrarErro("Conte pra gente se você vai.");

  dados.set("nome", nome);
  if (presenca === "Não") dados.set("pessoas", "0");

  botao.disabled = true;
  botao.textContent = "Enviando…";

  try {
    if (window.RSVP_URL) {
      // no-cors: o Google salva normalmente, só não deixa ler a resposta.
      await fetch(window.RSVP_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(dados),
      });
    } else {
      console.warn("RSVP_URL vazia em config.js — modo teste, nada foi salvo.", Object.fromEntries(dados));
    }
    agradecer(nome, presenca);
  } catch (err) {
    mostrarErro("Não conseguimos enviar. Verifique sua internet e tente de novo.");
    botao.disabled = false;
    botao.textContent = "Confirmar";
  }
});

function mostrarErro(msg) {
  erro.textContent = msg;
}

function agradecer(nome, presenca) {
  const primeiroNome = nome.split(" ")[0];
  form.hidden = true;
  document.getElementById("obrigado").hidden = false;
  document.getElementById("obrigado-titulo").textContent =
    presenca === "Sim" ? `Oba, ${primeiroNome}!` : `Obrigado, ${primeiroNome}!`;
  document.getElementById("obrigado-texto").textContent =
    presenca === "Sim"
      ? "Sua presença está confirmada. Te esperamos no dia 21 às 17h!"
      : "Que pena! Vamos sentir sua falta. Seu recado vai chegar até Socorro.";
}

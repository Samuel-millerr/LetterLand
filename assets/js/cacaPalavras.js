const iniciarCaca = document.querySelector("#sortearPalavras");
const textoCaca = document.querySelector("#textoCacaP");

iniciarCaca.addEventListener("click", sortWords);

function sortWords() {
  iniciarCaca.textContent = "Reiniciar";

  const texto = textoCaca.textContent;
  const textoSeparado = texto.split(" ");
  const palavrasSorteadas = [];

  while (palavrasSorteadas.length < 6) {
    const indiceAleatorio = Math.floor(Math.random() * textoSeparado.length);
    const palavraAleatoria = textoSeparado[indiceAleatorio];
    if (palavraAleatoria !== "" && palavraAleatoria.length > 4) {
      if (!palavrasSorteadas.includes(palavraAleatoria)) {
        palavrasSorteadas.push(palavraAleatoria);
      }
    }
  }

  console.log(palavrasSorteadas);
  encontrarPalavras(palavrasSorteadas, textoSeparado);
  mostrarPalavras(palavrasSorteadas);
}

function encontrarPalavras(palavrasSorteadas, textoSeparado) {
  textoCaca.innerHTML = "";

  textoSeparado.forEach(palavra => {
    if (palavrasSorteadas.includes(palavra)) {
      const span = document.createElement("span");
      span.textContent = " " + palavra;
      textoCaca.appendChild(span);
    } else {
      textoCaca.append(" " + palavra);
    }
  });
}

function mostrarPalavras(palavrasSorteadas) {
  const conteinerPalavrasSorteadas = document.getElementById("conteinerPalavrasSorteadas");
  conteinerPalavrasSorteadas.innerHTML = "";

  palavrasSorteadas.forEach(palavra => {
    const p = document.createElement("p");
    p.textContent = palavra.replace(/[^a-zA-ZÀ-ÿ]+/g, "");
    conteinerPalavrasSorteadas.appendChild(p);
  });

  const spans = textoCaca.querySelectorAll("span");
  let qtdPalavrasAcertadas = 0;
  const palavrasAcertadas = [];

    spans.forEach(span => {
    span.addEventListener("click", () => {
        const palavraClicada = span.textContent.replace(/[^a-zA-ZÀ-ÿ]+/g, "");
        const palavrasMostradas = conteinerPalavrasSorteadas.querySelectorAll("p");

        palavrasMostradas.forEach(palavra => {
        const palavraMostrada = palavra.textContent.replace(/[^a-zA-ZÀ-ÿ]+/g, "");
        if (palavraMostrada === palavraClicada) {
            palavra.classList.add("palavraAcertada"); // aplica no <p>
            span.classList.add("palavraAcertada");    // aplica no <span> do texto

            if (!palavrasAcertadas.includes(palavraClicada)) {
            qtdPalavrasAcertadas++;
            palavrasAcertadas.push(palavraClicada);
            }
        }
        });

        if (qtdPalavrasAcertadas >= palavrasSorteadas.length) {
        alert("Parabéns você acertou todas as palavras!!");
        }
    });
    });
}
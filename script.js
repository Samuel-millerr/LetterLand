gsap.registerPlugin(ScrollToPlugin);    // Plugin para animar a rolagem da página (scroll)

const paginas = document.querySelectorAll('.pagina');
const navLinks = document.querySelectorAll('.navLinks a');
let indicePaginaAtual = 0;
let animando = false;    // Evita que o usuário faça várias animações de scroll ao mesmo tempo

function irParaPagina(index) {
                    // Impede que o índice saia do intrvalo indicado
    if (animando || index < 0 || index >= paginas.length) {
        return;
    }

    animando = true;
    
    // Remove a classe 'visible' da página antiga antes de animar
    if(paginas[indicePaginaAtual]){
        paginas[indicePaginaAtual].classList.remove('visible');
    }

    // Atualizaçãodo índice para a página atual que está sendo exibida
    indicePaginaAtual = index;

    // Animação do scroll 
    gsap.to(window, {
        duration: 1.2,
        scrollTo: paginas[index],    // Faz o scroll até a posição da página que está no índice
        ease: 'power2.inOut',    // Suavidade da animação
        onComplete: () => {
            animando = false;
            // Adiciona a classe 'visible' na nova página quando a animação termina
            paginas[index].classList.add('visible');

            const navbar = document.querySelector('.navbar');
            const navLinksContainer = document.querySelector('.navLinks');

            // remove classes de página antigas
            navbar.classList.remove(...Array.from(navbar.classList).filter(c => c.startsWith("pagina")));
            navLinksContainer.classList.remove(...Array.from(navLinksContainer.classList).filter(c => c.startsWith("pagina")));

            // adiciona a classe da página atual
            navbar.classList.add(`pagina${index + 1}`);
            navLinksContainer.classList.add(`pagina${index + 1}`);
        }
    });

    // Atualização dos links da navbar
    navLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });
}

// Detecta o movimento do scroll do mouse (wheel)
window.addEventListener('wheel', (event) => {
    // Rolagem para baixo
    if (event.deltaY > 0) {
        irParaPagina(indicePaginaAtual + 1);
    } 
    // Rolagem para cima
    else {
        irParaPagina(indicePaginaAtual - 1);
    }
});

// Detecta o movimento das setas do teclado (keydown)
window.addEventListener('keydown', (event) => {
    // Para baixo
    if (event.key === "ArrowDown") {
        irParaPagina(indicePaginaAtual + 1); // seta para baixo
    } 
    // Para cima
    else if (event.key === "ArrowUp") {
        irParaPagina(indicePaginaAtual - 1); // seta para cima
    }
});

// Detecta os cliques nos links da navbar
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        irParaPagina(index);
    });
});


// Configuração inicial da primeira página
function init() {
    irParaPagina(0);
    // Adiciona a classe 'visible' na primeira página manualmente no início
    setTimeout(() => {
        paginas[0].classList.add('visible');
    }, 100);    // Timeout que garante que a página esteja carregada
}


// Cards 
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os cards
  const cards = document.querySelectorAll(".card");

  // Para cada card encontrado
  cards.forEach(card => {
    const btnFechar = card.querySelector(".fechar");

    // Ao clicar no card → ativa o estado expandido
    card.addEventListener("click", (e) => {
      // Evita abrir o card ao clicar no botão de fechar
      if (e.target.classList.contains("fechar")) return;

      // Fecha outros cards antes de abrir este (opcional)
      cards.forEach(c => c.classList.remove("ativo"));

      // Abre o card clicado
      card.classList.add("ativo");
    });

    // Ao clicar no botão de fechar → volta ao estado normal
    btnFechar.addEventListener("click", (e) => {
      e.stopPropagation(); // impede que o clique feche e reabra
      card.classList.remove("ativo");
    });
  });
});

init();
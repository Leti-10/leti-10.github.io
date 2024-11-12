const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%¨&*()_/><{}?1234567890";

document.addEventListener('DOMContentLoaded', event => {
  const elements = document.querySelectorAll("span");

  // Função para iniciar o efeito de digitação aleatória
  const startEffect = (hElement) => {
    let iteration = 0;
    let interval = null;

    // Armazenar o texto original no atributo data-value
    hElement.dataset.value = hElement.innerText;

    // Limpar o intervalo anterior
    clearInterval(interval);
    iteration = 0;

    interval = setInterval(() => {
      hElement.innerText = hElement.dataset.value
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return hElement.dataset.value[index];  // Mostrar letra original
          }
          return letters[Math.floor(Math.random() * letters.length)];  // Letra aleatória
        })
        .join("");

      if (iteration >= hElement.dataset.value.length) {
        clearInterval(interval);  // Para o efeito após exibir o texto completo
      }

      iteration += 1 / 3;
    }, 50);
  };

  // Função para o Intersection Observer
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // Verifica se a seção está visível
        const hElement = entry.target;
        startEffect(hElement); // Inicia o efeito de digitação para o elemento
        observer.unobserve(hElement); // Parar de observar o elemento após o efeito ser iniciado
      }
    });
  };

  // Criar um IntersectionObserver
  const observer = new IntersectionObserver(observerCallback, {
    root: null,         // Usando o viewport como referência
    rootMargin: '0px',  // Sem margem adicional
    threshold: 0.5      // Quando 50% do elemento estiver visível
  });

  // Observar todos os elementos span
  elements.forEach(hElement => {
    observer.observe(hElement);  // Adiciona o span para ser observado

    // Adicionar o evento de mouseover para reativar o efeito
    hElement.addEventListener('mouseover', () => startEffect(hElement));
  });
});


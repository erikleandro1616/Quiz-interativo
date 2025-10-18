
/*-----------------------as questões selecionadas para o quiz----------------------------------*/

// a ordem e 0,1,2,3 para as alternativas, não 1,2,3,4 

const questions = [
  { question: "Qual é a função da tag <head> em um documento HTML?", 
  options: ["Exibir o conteúdo principal da página", "Armazenar metadados e links de estilos/scripts",
   "Criar cabeçalhos visíveis na página", "Inserir imagens e vídeos"], answer: 1},

  { question: "Qual atributo é usado na tag <img> para definir o endereço de imagem?", 
  options: ["Alt", "Src", "Href", "Link"], answer: 1},

  { question: "Qual das opções cria um link clicável corretamente?", 
  options: ["<a src= “pagina.html”>Clique aqui</a>", "<link href= “pagina.html”>Clique aqui</link>",
   "<a href= “pagina.html”>Clique aqui</a>", "<a>pagina.html</a>"], answer: 2},

  { question: "Qual tag é usada para criar uma lista numerada?",
   options: ["<ul>", "<li>", "<ol>", "<dl>"], answer: 2},

  { question: "Qual é o significado da sigla HTML?", 
  options: ["Hyper Transfer Markup Language", "Hyperlinks and Text Markup Language", 
    "Hyper Text Makeup Language","Hyper Text Markup Language"], answer: 3},

  { question: "Qual propriedade CSS é usada para alterar a cor do texto?", 
  options: ["text-color", "color", "font-color", "background-color"], answer: 1},

  { question: "Como aplicar um estilo a todos os parágrafos de uma página?", 
  options: ["#p { ... }", ".p { ... }", "p { ... }", "<p> { ... }"], answer: 2},

  { question: "Qual propriedade define o espaço interno de um elemento (entre o conteúdo e a borda)?", 
  options: ["margin", "padding", "border", "gap"], answer: 1},

  { question: "Qual valor da propriedade position faz o elemento se mover de acordo com a rolagem da página?", 
  options: ["static", "absolute", "fixed ", "relative"], answer: 2},

  { question: "Qual é a maneira correta de importar um arquivo CSS externo?", 
  options: ["<style src= “style.css”>", "<css href= “style.css”>", 
    "<link rel= “stylesheet” href= “style.css”>", "<stylesheet src= “style.css”>"], answer: 2},

  { question: "Qual das opções exibe uma mensagem de alerta na tela?", 
  options: ["alertBox(“Olá!”)", "alert(“Olá!”)", "msg(“Olá!”)", "window.message(“Olá!”)"], answer: 1},

  { question: "Qual é a maneira correta de declarar uma variável?", 
  options: ["variable nome = “Erik”", "let nome = “Erik”", "var: nome = “Erik”", "const: nome “Erik”"], answer: 1},

  { question: "O que o código document.getElementById(“titulo”) faz?", 
  options: ["Cria um novo elemento HTML chamado “titulo”", "Busca o elemento com id “titulo” no documento",
   "Muda o título da página automaticamente", "Adiciona um id “titulo” ao documento"], answer: 1},

  { question: "Qual operador é usado para comparar valores e tipos?", 
  options: ["==", "=", "===", "!="], answer: 2},

  { question: "O que o comando console.log(“Olá Mundo”) faz?",
   options: ["Exibe um alerta na tela", "Mostra “Olá Mundo” no console do navegador",
    "Cria um parágrafo com o texto “Olá Mundo”", "Envia o texto para o servidor"], answer: 1},
];



let currentQuestionIndex = 0;
let score = 0;
let userName = "";


/*-------------------função de iniciar--------------------*/


function startQuiz() {
  userName = document.getElementById("username").value.trim();
  if (!userName) {
    alert("Por favor, digite seu nome!");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  showQuestion();
}


/*----------------função das questões(selecionar, passar pra próxima e etc)----------------*/


function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById("question-text").innerText = `(${currentQuestionIndex + 1}) ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => selectOption(div, idx);
    optionsDiv.appendChild(div);
  });

  document.getElementById("next-btn").disabled = true;
}

function selectOption(element, selectedIndex) {
  document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");
  element.dataset.selected = selectedIndex;
  document.getElementById("next-btn").disabled = false;
}



function nextQuestion() {
  const selected = document.querySelector(".option.selected");
  const selectedIndex = parseInt(selected.dataset.selected);


  if (selectedIndex === questions[currentQuestionIndex].answer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

/*----------------função de pontos, resultado geral----------------*/

function finishQuiz() {
  const total = questions.length;
  const correct = score;
  const wrong = total - score;
  const percent = Math.round((correct / total) * 100);


  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";


  document.getElementById("user-result-name").innerText = userName;
  document.getElementById("correct-count").innerText = correct;
  document.getElementById("wrong-count").innerText = wrong;
  document.getElementById("percentage").innerText = percent;

  let feedback = "";
  if (percent >= 80) feedback = "Excelente!";
  else if (percent >= 50) feedback = "Bom desempenho";
  else feedback = "Precisa melhorar";

  document.getElementById("feedback-message").innerText = feedback;
  renderChart(correct, wrong);
}

/*-------------------função do gráfico pizza-------------------*/ 

function renderChart(correct, wrong) {
  const ctx = document.getElementById('resultChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Acertos', 'Erros'],
      datasets: [{
        data: [correct, wrong],
        backgroundColor: ['#4CAF50', '#F44336'],
      }]
    }
  });
}

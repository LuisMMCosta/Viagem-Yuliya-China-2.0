// IDs que correspondem a resultados finais e seus nomes amigáveis
const resultNames = {
  dp5_chengdu: "Chengdu, Cidade dos Pandas 🐼",
  dp5_zhangjiajie: "Zhangjiajie, Montanhas Avatar ⛰️",
  dp5_suzhou: "Suzhou 🌸",
  dp5_hangzhou: "Hangzhou & Qiandao Lake 🌄",
  dp5_nanjing: "Nanjing, Antiga Capital 🏯",
  dp5_moganshan: "Moganshan, Refúgio de Montanha 🌲",
  dp5_zhujiajiao: "Zhujiajiao, Cidade dos Canais 🚤",
  dp5_chongming: "Chongming Island, Reserva Natural 🌿",
  dp5_hongcun: "Hongcun & Xidi, Aldeias UNESCO 🏡",
  dp5_yangzhou: "Yangzhou, Green Lake 🚣",
  dp5_wanxiang: "Wanxiang Valley, Aldeia na Encosta 🏞️",
  dp5_huangshan: "Huangshan, Montanhas Icónicas ⛰️",
  dp4_wuyuan: "Wuyuan, Aldeia Pitoresca 🌻",
  dp4_anji: "Anji, Chá e Bamboo 🎋",
  dp4_putuoshan: "Putuo Shan, Ilha Budista 🕉️",
  dp3_taicang: "Taicang Alps Resort, Snowboard ❄️",
  dp5_fakemarket: "Fake Market, Bargaining 💸",
  dp5_nopressure: "Explorar sem Pressão 😌",
  dp5_luxo: "Luxo & Spas em Xangai ✨"
};

let chosenResult = null;
let historyStack = []; // guarda o histórico de blocos

// Lista de resultados finais (IDs)
const resultIds = Object.keys(resultNames);

function startQuiz() {
    const audio = document.getElementById("bgm");
    if (audio) {
        audio.volume = 0.07;
        audio.play();
    }
    next('dp1'); // transição para o primeiro bloco
}

function next(id) {
    // esconder todos os blocos
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));

    // mostrar apenas o bloco escolhido
    const nextDiv = document.getElementById(id);
    if (nextDiv) {
        nextDiv.classList.add('active');
    }

    // guardar histórico
    historyStack.push(id);

    // se for resultado final, guardar e mostrar
    if (resultNames[id]) {
    chosenResult = id;
    // Mostra o texto dentro do próprio bloco
    const resultText = document.getElementById("resultText");
    if (resultText) {
        resultText.innerText = "Destino final: " + resultNames[id];
    }
    }
}

// Função para regressar atrás
function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop(); // remove o atual
        const previousId = historyStack[historyStack.length - 1]; // obtém o anterior
        document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
        document.getElementById(previousId).classList.add('active');
    } else {
        restartQuiz(); // se não houver histórico, volta ao início
    }
}

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytVideo', {
    events: { 'onReady': onPlayerReady }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(30); // volume inicial a 30%
}

// Função randomizer
function randomResult() {
  const randomIndex = Math.floor(Math.random() * resultIds.length);
  const chosenId = resultIds[randomIndex];
  next(chosenId);
}

function copyResult() {
    if (chosenResult) {
        const text = "Destino final: " + resultNames[chosenResult];
        navigator.clipboard.writeText(text);
        alert("Resultado copiado: " + text);
    }
}

function restartQuiz() {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById('landing').classList.add('active');

    const audio = document.getElementById("bgm");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    historyStack = []; // limpa histórico
}

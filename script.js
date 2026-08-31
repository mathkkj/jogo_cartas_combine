// variaveis base

let rodada = 1;
let tempo = 45;
let intervalo = null;
let pausado = true;

let jogadores = [
    { nome: "Jogador 1", pontos: 0 },
    { nome: "Jogador 2", pontos: 0 }
];


// timer

function iniciarTempo() {
    if (intervalo) return;

    pausado = false;

    intervalo = setInterval(() => {
        tempo--;

        atualizarTimer();

        // comecar piscar
        if (tempo <= 10 && tempo > 0) {
            document.querySelector(".timer").classList.add("alerta");
        }

        // tempo acabou
        if (tempo <= 0) {
            clearInterval(intervalo);
            intervalo = null;

            document.querySelector(".timer").classList.remove("alerta");

            tocarAlarme();
            tremerTela();

            document.getElementById("tempo").textContent = "Fim!";
        }

    }, 1000);
}


function pausarTempo() {
    clearInterval(intervalo);
    intervalo = null;
    pausado = true;
}


function voltarTempo() {
    tempo += 5;

    if (tempo > 45) {
        tempo = 45;
    }

    atualizarTimer();

    if (tempo > 10) {
        document.querySelector(".timer").classList.remove("alerta");
    }
}


function atualizarTimer() {
    document.getElementById("tempo").textContent = tempo;
}


// alarmes e efeitos

function tocarAlarme() {
    const alarme = document.getElementById("alarme");

    alarme.pause();
    alarme.currentTime = 0;
    alarme.play();
}


function tremerTela() {
    document.body.classList.remove("tremendo");

    void document.body.offsetWidth;

    document.body.classList.add("tremendo");
}


// rodada

function proximaRodada() {
    clearInterval(intervalo);
    intervalo = null;

    rodada++;

    document.getElementById("rodada").textContent = rodada;

    tempo = 45;

    atualizarTimer();

    document.querySelector(".timer").classList.remove("alerta");

    const alarme = document.getElementById("alarme");
    alarme.pause();
    alarme.currentTime = 0;

    renderizar();
}


// jogadores

function renderizar() {

    const lista = document.getElementById("listaJogadores");
    const controles = document.getElementById("controlesJogadores");

    lista.innerHTML = "";
    controles.innerHTML = "";

    jogadores.forEach((jogador, index) => {

        // bloco do jogador

        const bloco = document.createElement("div");

        bloco.className = "bloco-jogador";

        bloco.innerHTML = `
            <span class="posicao">
                ${index + 1}º jogador
            </span>

            <span class="nome-jogador">
                ${jogador.nome}
            </span>

            <strong class="pontos-jogador">
                ${jogador.pontos} pts
            </strong>
        `;

        lista.appendChild(bloco);


        // controle de pontos

        const controle = document.createElement("div");

        controle.className = "controle-jogador";

        controle.innerHTML = `
            <span
                class="controle-nome"
                contenteditable="true"
                onblur="alterarNome(${index}, this.innerText)"
            >
                ${jogador.nome}
            </span>

            <div class="botoes-pontos">
                <button onclick="alterarPontos(${index}, -1)">
                    −
                </button>

                <button onclick="alterarPontos(${index}, 1)">
                    +
                </button>
            </div>
        `;

        controles.appendChild(controle);
    });

    document.getElementById("quantidadeJogadores").textContent =
        jogadores.length + " jogadores";
}


// nome

function alterarNome(index, nome) {

    nome = nome.trim();

    if (nome === "") {
        nome = "Jogador " + (index + 1);
    }

    jogadores[index].nome = nome;

    renderizar();
}


// pontos

function alterarPontos(index, valor) {

    jogadores[index].pontos += valor;

    if (jogadores[index].pontos < 0) {
        jogadores[index].pontos = 0;
    }

    renderizar();
}


// quantidade de jogadores

function adicionarJogador() {

    // limite de 4 jogadores
    if (jogadores.length >= 4) {
        return;
    }

    jogadores.push({
        nome: "Jogador " + (jogadores.length + 1),
        pontos: 0
    });

    renderizar();
}


function removerJogador() {

    // minimo de 2 jogadores
    if (jogadores.length <= 2) {
        return;
    }

    jogadores.pop();

    renderizar();
}


// reset

function resetarJogo() {

    clearInterval(intervalo);
    intervalo = null;

    const alarme = document.getElementById("alarme");

    alarme.pause();
    alarme.currentTime = 0;

    rodada = 1;
    tempo = 45;

    // volta para 2 jogadores
    jogadores = [
        { nome: "Jogador 1", pontos: 0 },
        { nome: "Jogador 2", pontos: 0 }
    ];

    document.getElementById("rodada").textContent = rodada;

    atualizarTimer();

    document.querySelector(".timer").classList.remove("alerta");
    document.body.classList.remove("tremendo");

    renderizar();
}


// fechar regras

function fecharRegras() {
    document.getElementById("regras").style.display = "none";
}


// início

renderizar();
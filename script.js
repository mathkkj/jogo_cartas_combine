let rodada = 1;
let tempo = 45;
let intervalo;

let pontos = [0, 0, 0, 0];

function iniciarTempo() {
    clearInterval(intervalo);

    tempo = 45;
    document.getElementById("tempo").textContent = tempo;

    intervalo = setInterval(() => {
        tempo--;

        document.getElementById("tempo").textContent = tempo;

        if (tempo <= 0) {
            clearInterval(intervalo);
            document.getElementById("tempo").textContent = "Fim!";
        }
    }, 1000);
}

function proximaRodada() {
    rodada++;

    document.getElementById("rodada").textContent = rodada;

    iniciarTempo();
}

function alterarPontos(jogador, valor) {
    pontos[jogador - 1] += valor;

    if (pontos[jogador - 1] < 0) {
        pontos[jogador - 1] = 0;
    }

    document.getElementById("pontos" + jogador).textContent =
        pontos[jogador - 1] + " pts";
}

function resetarJogo() {
    clearInterval(intervalo);

    rodada = 1;
    tempo = 45;

    pontos = [0, 0, 0, 0];

    document.getElementById("rodada").textContent = rodada;
    document.getElementById("tempo").textContent = tempo;

    for (let i = 1; i <= 4; i++) {
        document.getElementById("pontos" + i).textContent =
            pontos[i - 1] + " pts";
    }
}

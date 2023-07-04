let musicas = [
    {titulo:'If looks could kill', artista:'Destroy Lonely', src:'musicas/destroy.mp3', img:'imagens/destroy.jpeg'},
    {titulo:'Mask Off', artista:'Future', src:'musicas/future.mp3', img:'imagens/future.jpeg'},
    {titulo:'Fraction', artista:'Kankan', src:'musicas/kankan.mp3', img:'imagens/kankan.jpeg'}
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', moverBarra);

musica.addEventListener('loadeddata', duracao);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0){
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
    tocarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = convercaoMinutos(Math.floor(musica.duration));

        musica.currentTime = 0;
        let barra = document.querySelector('progress');
        barra.style.width = '0%';
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function moverBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = (musica.currentTime / musica.duration) * 100 + '%';
    let tempoDecorido = document.querySelector('.inicio');
    tempoDecorido.textContent = convercaoMinutos(Math.floor(musica.currentTime));
}


function convercaoMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}

function duracao(){
    let duracaoMusica = document.querySelector('.fim');

    duracaoMusica.textContent = convercaoMinutos(Math.floor(musica.duration));
}
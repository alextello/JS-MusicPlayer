const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Títulos de canciones
const songs = ['BrainDamage'];

let songIndex = 0;

// Canción inicial
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Reproducir cancion
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pausar cancion
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Canción previa

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Siguiente canción

function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Actualizar progreso de la barra
function setProgress(e) {
    const width = this.clientWidth;
    // La posición donde se hizo click en la barra
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Actualizar barra de progreso
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progresoPorcentaje = (currentTime / duration) * 100;
    progress.style.width = `${progresoPorcentaje}%`
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Cambiar canción
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Actualiza tiempo de canción

audio.addEventListener('timeupdate', updateProgress);

// Click en la barra de progreso

progressContainer.addEventListener('click', setProgress);

// Cuando termina la canción

audio.addEventListener('ended', nextSong);
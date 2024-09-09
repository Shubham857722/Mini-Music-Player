const songsList = [
    {
        name: "Jazz In Paris",
        artist: "Media Right Productions",
        src: "Music Player_assets_1.mp3",
        cover: "1.jpg"
    },

    {
        name: "Aa Aa Aashiqui Mein",
        artist: "	Himesh Reshammiya",
        src: "Aa Aa Aashiqui Mein Teri(PagalWorld.com.so).mp3",
        cover: "aashiq.jpg"
    },
    {
        name: "Deva Shree Ganesha ",
        artist: "	Ajay Gogavale,Shubham yadav	",
        src: "	Deva Shree Ganesha_64(PagalWorld.com.sb).mp3",
        cover: "Deva.jpg"
    }

    
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');
const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.volume-icon');


let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        song.volume = volume;

        // Change the volume icon based on the volume level
        if (volume === 0) {
            volumeIcon.textContent = '🔇'; // Mute icon
        } else if (volume <= 0.5) {
            volumeIcon.textContent = '🔉'; // Low volume icon
        } else {
            volumeIcon.textContent = '🔊'; // High volume icon
        }
    });

    // Mute/unmute when clicking on the volume icon
    volumeIcon.addEventListener('click', () => {
        if (song.volume > 0) {
            song.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.textContent = '🔇'; // Mute icon
        } else {
            song.volume = 0.5; // Restore to a default value (50%)
            volumeSlider.value = 50;
            volumeIcon.textContent = '🔉'; // Low volume icon
        }
    });
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
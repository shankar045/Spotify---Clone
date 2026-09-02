/* Initialise variables */
let songIndex = 1;
let targeId, songListPlay;
let audioElement = new Audio(`./songs/${songIndex}.mp3`);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    { songName: "Warriyo Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "03:49" },
    { songName: "Otilia - Bilionera", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "03:05" },
    { songName: "DEAF KEV - Invicible ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "04:33" },
    { songName: "Where-Are-You", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "02:30" },
    { songName: "Rosa Linn - Snap", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "03:04" },
    { songName: "Unholy - Sam Smith", filePath: "songs/2.mp3", coverPath: "covers/6.jpg", duration: "02:37" },
    { songName: "Yeh Ratein Yeh Mausum", filePath: "songs/2.mp3", coverPath: "covers/7.jpg", duration: "03:39" },
    { songName: "Kabhi Kabhi Aditi Zindagi", filePath: "songs/2.mp3", coverPath: "covers/8.jpg", duration: "03:56" },
    { songName: "Sound-of-Salaar", filePath: "songs/2.mp3", coverPath: "covers/9.jpg", duration: "02:56" },
    { songName: "Jawan-Prevue-Theme", filePath: "songs/4.mp3", coverPath: "covers/10.jpg", duration: "02:07" },
]

songItems.forEach((element, i) => {
    // element = div.songItem           i = 0,1,....10
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].duration;
})

// audioElement.play();

/* Hanlde play/pause click */
masterPlay.addEventListener('click', () => {
    songListPlay = document.getElementById(`${songIndex}`);
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songListPlay.classList.remove("fa-play-circle");
        songListPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        songListPlay.classList.remove("fa-pause-circle");
        songListPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    /* update seek bar */
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    if (audioElement.currentTime >= audioElement.duration) {
        makeAllPlays();
        songIndex = (songIndex % 10) + 1;
        songListPlay = document.getElementById(`${songIndex}`);

        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songListPlay.classList.remove('fa-play-circle');
        songListPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

let allSongs = document.getElementsByClassName("songItemContainer")[0];
let playSong = Array.from(allSongs.getElementsByTagName("i"));

const makeAllPlays = () => {
    playSong.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

playSong.forEach((element) => {
    element.addEventListener('click', (e) => {
        targeId = parseInt(e.target.id);
        if (songIndex != targeId) {
            makeAllPlays();         // Make all play except the clicked song
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            songIndex = targeId;
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            masterSongName.innerText = songs[songIndex-1].songName;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
            else {
                audioElement.pause();
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        }
    })
})



/* Previous and Next */
document.getElementById("previous").addEventListener('click', () => {
    makeAllPlays();
    if(songIndex==1){
        songIndex=10;
    }
    else{
        songIndex -= 1;
    }

    songListPlay = document.getElementById(`${songIndex}`);
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songListPlay.classList.remove('fa-play-circle');
    songListPlay.classList.add('fa-pause-circle');

    gif.style.opacity = 1;
})

document.getElementById("next").addEventListener('click', () => {
    makeAllPlays();
    songIndex = (songIndex % 10) + 1;
    songListPlay = document.getElementById(`${songIndex}`);

    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songListPlay.classList.remove('fa-play-circle');
    songListPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

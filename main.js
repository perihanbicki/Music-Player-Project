const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//index şarkı için, şarkı sırası
let index

// döngü durumu
let loop = true

//şarkı listesi
const songList = [
    {
        name: "Cheap Thrills",
        link: "assets/sia-cheap-thrills.mp3",
        artist: "Sia",
        image: "assets/sia.jfif"
    },
    {
        name: "Work",
        link: "assets/rihanna-work.mp3",
        artist: "Rihanna",
        image: "assets/rihanna.jfif"
    },
    {
        name: "Closer",
        link: "assets/the-chainsmokers.mp3",
        artist: "The Chainsmokers",
        image: "assets/the.jfif"
    },
    {
        name: "Lush Life",
        link: "assets/zara-lush-life.mp3",
        artist: "Zara Larsson",
        image: "assets/zara.jfif"
    },
    {
        name: "Shangai",
        link: "assets/nicki-minaj.mp3",
        artist: "Nicki Minaj",
        image: "assets/nicki.jfif"
    },
]

// zaman formatı ayarlama
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}
//şarkıyı çalma

const playAudio = () => {
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

//şarkı atama
const setSong = (arrayIndex) => {
    let { name, link, artist, image } = songList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playListContainer.classList.add("hide")
    playAudio()
}
//setSong(2)

//sıradakini çal
const nextSong = () => {
    if (loop) {
        if (index == (songList.length - 1)) {
            index = 0
        } else {
            index++ //ya da index+=1 yani kendi değerini bir arttır
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songList.length)
        setSong(randIndex)
    }
}

playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click', () =>{
    playListContainer.classList.add('hide')
})

const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))* 100 + "%"
}, 1000);

progressBar.addEventListener("click",(event) =>{
    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX
    let progress = (coordEnd-coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progressBar * 100 + "%"

    audio.currentTime = progress * audio.duration
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')

})

const previousSong = () => {
    if (index > 0) {
        index -= 1
    } else {
        index = songList.length - 1
    }
    setSong(index)
}

repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('tekrar kapatıldı')
    } else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar acildi')

    }
})

shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.loop = true
        console.log('karistirici kapatıldı')
    } else {
        shuffleButton.classList.add('active')
        audio.loop = false
        console.log('karistirici acildi')

    }
})

const initializePlaylist = () => {
    for (let i in songsList)
        playListSongs.innerHTML += `<i class="playlistSong" 
    onclick="setSong(${i})">
    <div class="playlist-image-container">
        <img src="${songsList[i].image}">
    </div>
    <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songsList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songsList[i].artist}
        </span>
    </div>
        </li>`
}

//Tıklama yakalaama

nextButton.addEventListener('click', nextSong)

pauseButton.addEventListener('click', pauseAudio)

playButton.addEventListener('click', playAudio)

prevButton.addEventListener('click', previousSong)

//şarkı bitiişini yakalama

audio.onended = () => {
    nextSong()
}

audio.addEventListener('timeupdate', ()=>{
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
})
//ekran ilk açıldığında
window.onload = () => {
    index = 0
    setSong(index)
    //durdur ve şarkı listesi oluştur dicez
    pauseAudio()
    initializePlaylist()
}
let songContainer = document.querySelector(".songContainer");
let Data = document.querySelector(".songs");


for (s of songs) {
    child = document.createElement("div");
    child.classList.add("songBanner");
    child.innerHTML = `<div class="songImg"><img src="${s.coverPath}" alt="${s.songName}"></div>
                    <div class="songInfo">
                        <p class="songName">${s.songName}</p>
                        <p class="artistName">${s.artistName}</p>
                    </div>
                    <i class="fa-solid fa-play"></i>`;
    songContainer.appendChild(child);
    child.id = `${s.artistName}`;
}

// song container

let songBanner = document.querySelectorAll(".songBanner");
let playbtn = document.getElementById("play");
let songPlayer = document.querySelector(".songPlayer");
let time = document.querySelector(".songTime");
let pathLength = document.querySelector(".path");
let circle = document.querySelector(".bulb");
let mainImg = document.getElementById("songImg");
let mainImgForPhone = document.getElementById("songImage");
let mainSongName = document.querySelector(".name");
let mainArtistName = document.querySelector(".artist");

// playlist container

let playListSongs = document.querySelector(".playListSongs");
let playlist = document.querySelector(".playLists");
let playListImg = document.querySelector(".playListImg");
let playListName = document.querySelector(".songList");
let backToMain = document.querySelector("#back");
let next = document.querySelector("#foreward");
let previous = document.querySelector("#backward");


let audioElement = new Audio();

function playBtn() {
    if (audioElement.paused && audioElement.src != "") {
        audioElement.play();
        playbtn.classList.remove("fa-circle-play");
        playbtn.classList.add("fa-circle-pause");
    } else {
        audioElement.pause();
        playbtn.classList.remove("fa-circle-pause");
        playbtn.classList.add("fa-circle-play");
    }
}

function convertSecondsIntoMinutes(sec) {
    const totalMinutes = Math.floor(sec / 60);
    const remainingSeconds = Math.floor(sec % 60);
    // Format the seconds to always show two digits
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${totalMinutes}:${formattedSeconds}`;
}

let currentindex = 0;

//function to play the song
function playClickedSong(index) {
    currentindex = index;
    let currentSong = member[currentindex];
    // handling errors
    if (!currentSong || !(currentSong instanceof HTMLElement)) {
        console.error("Invalid currentSong:", currentSong);
        return;
    }

    let name = currentSong.querySelector(".memberSongName").innerText;
    let description = currentSong.querySelector(".memberName").innerText;

    mainSongName.innerText = name;
    mainArtistName.innerText = description;
    mainImg.src = currentSong.querySelector("img").src;
    mainImgForPhone.src = currentSong.querySelector("img").src;
    // console.log(`songName = ${name}, artist = ${id}`);
    let audioPlay = `songFile/${name}.mp3`;
    audioElement.src = audioPlay;
    playBtn();
}

//function to play the next song
function playnextSong() {
    // handling errors
    if (!member || member.length === 0) {
        console.error("No songs in the member list.");
        return;
    }

    let nextIndex = (currentindex + 1) % member.length;
    playClickedSong(nextIndex);
}

//function to play the perivious song
function playpreviousSong() {
    let previousIndex = (currentindex - 1) < 0 ? (member.length - 1) : (currentindex - 1);
    playClickedSong(previousIndex);
}

playbtn.addEventListener("click", playBtn);
let id = " ";
let member = " ";
let memberNumber = 0;

songBanner.forEach((div) => {
    div.addEventListener("click", () => {
        playlist.classList.add("addPlayList");
        Data.classList.add("removeSongData");
        playListSongs.innerHTML = "";
        let mainPlayListName = div.querySelector(".songName").innerText;

        id = div.getAttribute("id");
        let songs = songData[id];
        for (s of songs) {
            childMember = document.createElement("div");
            childMember.classList.add("member");
            childMember.innerHTML = ` <div class="memberInfo">
                            <div class="memberImg"><img src="${s.coverPath}" alt="${s.artistName}h-${s.songName}"></div>
                            <div class="memberInfoName">
                                <p class="memberSongName">${s.songName}</p>
                                <p class="memberName">${s.artistName}-${mainPlayListName}</p>
                            </div>
                        </div>
                        <i class="fa-regular fa-circle-play" id="play"></i>`;
            playListSongs.appendChild(childMember);
            childMember.id = id;
            memberNumber += 1;
        }
        playListName.querySelector("h2").textContent = div.querySelector(".songName").textContent;
        playListName.querySelector("p").textContent = div.querySelector(".artistName").textContent;
        playListImg.querySelector("img").src = `${div.querySelector("img").src}`;
        member = document.querySelectorAll(".member");
        // console.log(memberNumber);
        attachMemberListeners();
    })
});

backToMain.addEventListener("click", () => {
    playlist.classList.remove("addPlayList")
    Data.classList.remove("removeSongData");
    memberNumber = 0;
});

let number;

// Attach listeners to all '.member' elements
function attachMemberListeners() {
    member.forEach((ele, index) => {
        ele.addEventListener("click", () => {
            playClickedSong(index);
        });
    });
    next.addEventListener("click", playnextSong);
    previous.addEventListener("click", playpreviousSong);
}

audioElement.addEventListener("timeupdate", () => {
    time.innerText = `${convertSecondsIntoMinutes(audioElement.currentTime)} / ${convertSecondsIntoMinutes(audioElement.duration)}`;
    circle.style.left = (audioElement.currentTime / audioElement.duration) * 100 + "%";
    if (audioElement.currentTime === audioElement.duration) {
        if (memberNumber > 0) {
            playnextSong();
        }
        circle.style.left = "0%";
        time.innerText = `00:00 / ${convertSecondsIntoMinutes(audioElement.duration)}`;
    }
});

let percentage;

pathLength.addEventListener("click", (e) => {
    const circleWidth = circle.offsetWidth / 2;
    let percentage = ((e.offsetX - circleWidth) / e.target.getBoundingClientRect().width) * 100;
    percentage = Math.max(0, Math.min(percentage, 100));
    circle.style.left = percentage + "%";
    audioElement.currentTime = (audioElement.duration * percentage) / 100;
})



// for all songs to play
let individualSongContainer = document.querySelector(".AllSongs");

// add all songs to the library
for (s of AllSongs) {
    let childSong = document.createElement("div");
    childSong.classList.add("IndividualSongs");
    childSong.innerHTML = `
                    <div class="IndividualSongImg"><img src="${s.coverPath}" alt="${s.songName}"></div>
                    <div class="IndividualSongInfo">
                        <p class="songName">${s.songName}</p>
                        <p class="artistName">${s.artistName}</p>
                    </div>
                    <i class="fa-solid fa-play"></i>
                    `;
    individualSongContainer.appendChild(childSong);
    childSong.id = `${s.artistName}`;
}

let songList = document.querySelectorAll(".IndividualSongs");

songList.forEach((songs) => {
    songs.addEventListener("click", () => {
        let name = songs.querySelector(".songName").innerText;
        let description = songs.querySelector(".artistName").innerText;

        //adding the song details into yourplaylist section
        mainSongName.innerText = name;
        mainArtistName.innerText = description;
        mainImg.src = songs.querySelector("img").src;
        mainImgForPhone.src = songs.querySelector("img").src;

        //playing the song;
        let audioPlay = `songFile/${name}.mp3`;
        audioElement.src = audioPlay;
        playBtn();
    });
})




// creating a search bar to search songs 

const input = document.querySelector('#mySearch');
const resultBox = document.querySelector('.searchResults');


function searchResult() {
    let query = input.value.toLowerCase();
    resultBox.innerHTML = "";
    // console.log(resultBox.style.height);

    if (query === ""){
        resultBox.classList.remove("maxHeight");    
        return
    } else {
        // Set to desired max height
        resultBox.classList.add("maxHeight");
    }

    let filteredArray = AllSongs.filter(song =>
        song.songName.toLowerCase().includes(query) || song.artistName.toLowerCase().includes(query)
    );

    filteredArray.forEach(e => {
        const songElement = document.createElement('div');
        songElement.classList.add('results');
        songElement.innerHTML = `
                <div class="resultImg"><img src="${e.coverPath}" alt="${e.songName}"></div>
                    <div class="resultInfoName">
                        <p class="resultSongName">${e.songName}</p>
                        <p class="resultArtistName">${e.artistName}</p>
                    </div>
            `;
        songElement.addEventListener("click",() => {
            playSongFromSearch(e);
            resultBox.innerHTML = "";
            input.value = "";
            resultBox.classList.remove("maxHeight");    
        })

        resultBox.appendChild(songElement);
    });

    if (filteredArray.length === 0) {
        resultBox.innerHTML = '<p id="noResult">No songs found.</p>';
    };
}

input.addEventListener("input", searchResult);

function playSongFromSearch(song) {
    mainSongName.innerText = `${song.songName}`;
    mainArtistName.innerText = `${song.artistName}`;
    mainImg.src = `${song.coverPath}`;
    mainImgForPhone.src = `${song.coverPath}`;

    let audioPlay = `songFile/${song.songName}.mp3`;
    audioElement.src = audioPlay;
    playBtn();
}

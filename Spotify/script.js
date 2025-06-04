console.log("Welcome to Spotify");
//Initialize the variables
let songIndex=0;
let audioElement=new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById("masterSongName");
console.log(masterSongName);
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Blue Eyes", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Desi kalakar", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "LoveDose", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Dheere Dheere", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Isekehte Hip Hop", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Char bottle vodka", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Mere Maheboob Qayamat hogi", filePath:"songs/7.mp3", coverPath: "covers/11.jpg"},
    {songName: "Party All night", filePath:"songs/8.mp3", coverPath: "covers/7.jpg"},
    {songName: "Raat Dashan Ji", filePath:"songs/9.mp3", coverPath: "covers/8.jpg"},
    {songName: "One Bottle Down", filePath:"songs/10.mp3", coverPath: "covers/9.jpg"},

]
document.querySelector('.container').style.backgroundImage = `url('${songs[0].coverPath}')`;

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
// let audioElement = new Audio('1.mp3');

// audioElement.play();
// Handle play pause
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        // let firstSongPlayBtn = document.getElementById('0'); // assuming id='0' for first song play btn
        // let currentSongPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
        let firstSongPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
        if (firstSongPlayBtn) {
            firstSongPlayBtn.classList.remove('fa-circle-play');
            firstSongPlayBtn.classList.add('fa-circle-pause');
        }
        document.querySelector('.container').style.backgroundImage = `url('${songs[songIndex].coverPath}')`;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        // let firstSongPlayBtn = document.getElementById('0');
        // let currentSongPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
        let firstSongPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
        if (firstSongPlayBtn) {
            firstSongPlayBtn.classList.remove('fa-circle-pause');
            firstSongPlayBtn.classList.add('fa-circle-play');
        }

    }
});
//listen to events
audioElement.addEventListener('timeupdate',()=> {
    // console.log('timeupdate');
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;

});
myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})
const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.getAttribute("data-index"));
        console.log(songIndex);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=> {
    if(songIndex>=9) {
        songIndex=0;
    }
    else {
        songIndex+=1;
    }
    makeAllPlays(); // reset all play buttons to play icon
    let currentSongPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
    if (currentSongPlayBtn) {
        currentSongPlayBtn.classList.remove('fa-circle-play');
        currentSongPlayBtn.classList.add('fa-circle-pause');
    }

    audioElement.src=`songs/${songIndex+1}.mp3`;
    document.querySelector('.container').style.backgroundImage = `url('${songs[songIndex].coverPath}')`;

    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    // document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.remove('fa-circle-play');
    // document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.add('fa-circle-pause');
})
document.getElementById('prev').addEventListener('click',()=> {
    if(songIndex<=0) {
        songIndex=9;
    }
    else {
        songIndex-=1;
    }
    makeAllPlays(); // reset all play buttons to play icon
    let currentSongPlayBtn = document.querySelector(`.songItemPlay[data-index="${songIndex}"]`);
    if (currentSongPlayBtn) {
        currentSongPlayBtn.classList.remove('fa-circle-play');
        currentSongPlayBtn.classList.add('fa-circle-pause');
    }

    audioElement.src=`songs/${songIndex+1}.mp3`;
    document.querySelector('.container').style.backgroundImage = `url('${songs[songIndex].coverPath}')`;

    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
    document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.remove('fa-circle-play');
    document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.add('fa-circle-pause');
})
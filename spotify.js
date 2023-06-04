console.log('Welcome to spotify');
//variables intialisation
let songIndex = 0;
let masterSongName = document.querySelector('.masterSongName');
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.querySelector('#masterPlay');
let myProgressbar = document.querySelector('#myProgressBar');
let gif = document.querySelector('#gif')
let songItems = Array.from(document.querySelector('.songItem'));
let playSongItem = Array.from(document.querySelectorAll('.playSongItem'));
let songs= [
{songName: "Dil ibadat", filePath: "Songs/song1.mp3", coverPath: "covers/1.jpg" },
{songName: "Matargashti", filePath: "Songs/song2.mp3", coverPath: "covers/2.jpg" },
{songName: "Har Har shambhu", filePath: "Songs/song3.mp3", coverPath: "covers/3.jpg" },
{songName: "Kesariya", filePath: "Songs/song4.mp3", coverPath: "covers/4.jpg" },
{songName: "Let me down slowly", filePath: "Songs/song5.mp3", coverPath: "covers/5.jpg" }
]
//audioElement.play();
songItems.forEach((element, i) => {
    element.querySelector('img')[0].src = songs[i].coverPath;
    element.querySelector('.songName')[0].innerText = songs[i].songName
})
//pause/play
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}) 


//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //seekbar update
    progress = parseInt((audioElement.currentTime/audioElement.duration )*100)
    myProgressbar.value= progress;
})
myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value*audioElement.duration/100;
})
const makeAllPlay = ()=>{
    playSongItem.forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')
        
    })
}
    playSongItem.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex= parseInt(e.target.id);
        e.target.classList.add('fa-pause-circle');
        e.target.classList.remove('fa-play-circle');
        audioElement.src= `Songs/${songIndex +1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity =1;
        
    })
})
document.querySelector('#next').addEventListener('click', ()=>{
    if (songIndex >=4){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
})
document.querySelector('#previous').addEventListener('click', ()=>{
    if (songIndex <=0){
        songIndex=0;
    }else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
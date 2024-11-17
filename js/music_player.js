const songs =[
    {cover:'assets/images/hans_zimmer_interstellar_day one.jpg', src:"assets/audio/hans_zimmer_interstellar_day one 128.mp3"  ,name:'interstellar',artist:'hans zimer'},
    {cover:'assets/images/Merry Go Round of Life.jpg', src:"assets/audio/Merry Go Round of Life [RitmAhang.com].mp3",name:'Merry Go Round of Life',artist:'joe hisaishi'},
    {cover:'assets/images/sumie-ink-wash-landscape_905683-101067.jpg', src:"assets/audio/river_-_solo_soundtracks.ir_.mp3",name:'river',artist:'solo'},
    {cover:'assets/images/Tom-Rosenthal-Lights-Are-On-1.png', src:"assets/audio/tom_rosenthal_lights_are_on 128.mp3"       ,name:'lights are on',artist:'tom rosenthal'}];

let myaudio = document.getElementById("myaudio");
let play_btn = document.getElementById("play");
let next_btn =document.getElementById('next');
let prew_btn =document.getElementById('prew');
let source_audio =document.getElementById('source_audio');
let muz_name=document.querySelector('.muz_name');
let muz_atrist=document.querySelector('.muz_atrist');
let cover=document.getElementById('cover');
let progress_bar= document.querySelector('.progress_bar');
let progress= document.querySelector('.progress');
let muz_timeline =document.querySelector('.muz_timeline');
let list_item_music=document.querySelectorAll('.list_item');
let counterindex = 0;
let n =songs.length;
let isDraging=false;
let currenitemtindex=0;

list_item_music.forEach((item)=>{
    item.addEventListener('click',(event)=>{
        const parentElement= (+(event.target.id))-1;
        player(parentElement)
        if(currenitemtindex==parentElement){
            player_and_plauser()
            player(parentElement)
        }
    })
});


// اهنگ بعدی
next_btn.addEventListener("click",()=>{
    myaudio.pause();
    counterindex=(counterindex+1)%n;
    player(counterindex);
});

// اهنگ قبلی
prew_btn.addEventListener("click",()=>{
    myaudio.pause();
    counterindex = (counterindex - 1 + n) % n;    
    player(counterindex);
});

// تابع پخش
function player(index){
    currenitemtindex=index;
    switch (index){
        case 0:
            document.documentElement.style.setProperty('--back-color','#181E20');
            document.documentElement.style.setProperty('--item-color','#429EBD');
            document.documentElement.style.setProperty('--progress-color','#B8BFD6');
            document.documentElement.style.setProperty('--orbit-image','#F7EDE2');
            break;
        case 1:
            document.documentElement.style.setProperty('--back-color','#3D405B');
            document.documentElement.style.setProperty('--item-color','#E07A5F');
            document.documentElement.style.setProperty('--progress-color','#E07A5F');
            document.documentElement.style.setProperty('--orbit-image','#F2CC8F');
            break;
        case 2:
            document.documentElement.style.setProperty('--back-color','#003049');
            document.documentElement.style.setProperty('--item-color','#EE6C4D');
            document.documentElement.style.setProperty('--progress-color','#EE6C4D');
            document.documentElement.style.setProperty('--orbit-image','#EE6C4D');
            
            break;
        case 3:
            document.documentElement.style.setProperty('--back-color','#245D6B');
            document.documentElement.style.setProperty('--item-color','#288994');
            document.documentElement.style.setProperty('--progress-color','#77C4D1');
            document.documentElement.style.setProperty('--orbit-image','#F8BAA7');
            break;
    }
    if(myaudio.paused){
        source_audio.src=songs[index].src;
        muz_name.innerText=songs[index].name;
        muz_atrist.innerText=songs[index].artist;
        cover.src=songs[index].cover;
        myaudio.load();
        myaudio.play();
    }
    
};

// تابع استوپ و ستارت
function player_and_plauser(){
    if(myaudio.paused){
        myaudio.load();
        myaudio.play();
        play_btn.innerHTML='<i class="fa-solid fa-pause"></i>'
    }else{
        myaudio.load();
        myaudio.pause();
        play_btn.innerHTML='<i class="fas fa-play"></i>'
    }
};

// اپدیت نمایه زمان 
function updateProgress(){
    const progresspercent=(myaudio.currentTime/myaudio.duration)*100;
    progress.style.left=progresspercent+"%";
};
// اپدیت تایم اهنگ
myaudio.addEventListener('timeupdate', updateProgress);

//تغییر ایکون استارت
play_btn.addEventListener("click",()=>{
    player_and_plauser()
});

// تابع درگ کردن و استارت 
function startDraging(e){
    isDraging=true;
    updateProgressOndrag(e);
};

// کشیدن ایکون نشانگر زمان
function updateProgressOndrag(e){
    if(isDraging){
        const width = progress_bar.clientWidth;
        const clickX =e.offsetX;
        const progresspercent = (clickX/width)* 100;
        progress.style.left=progresspercent+'%'
    }
};

// رها کردن ایکون نشانگر زمان
function stopDraging(e){
    isDraging=false;
    const width = progress_bar.clientWidth; 
    const clickX = e.offsetX; 
    const duration = myaudio.duration; 
    myaudio.currentTime = (clickX / width) * duration;
};


function setProgress(e) { 
    const width = progress_bar.clientWidth; 
    const clickX = e.offsetX; 
    const duration = myaudio.duration; 
    myaudio.currentTime = (clickX / width) * duration;
};

progress_bar.addEventListener('click', setProgress, player_and_plauser);
progressContainer.addEventListener('mousedown', startDraging); 
progressContainer.addEventListener('mousemove', updateProgressOndrag); progressContainer.addEventListener('mouseup', stopDraging); 
progressContainer.addEventListener('mouseleave', stopDraging);


// creo un array di oggetti che conterrà audio, cover, artist, title
let tracks = [
    {'url' : './audio/song-1.mp3', 'cover' : './cover/cover-1.png', 'artist' : 'Caparezza', 'title' : 'Ti Fa Stare Bene'},
    {'url' : './audio/song-2.mp3', 'cover' : './cover/cover-2.png', 'artist' : 'La rappresentante di lista, Cosmo, Margherita Vicario, GINEVRA', 'title' : 'Be My Baby'},
    {'url' : './audio/song-3.mp3', 'cover' : './cover/cover-3.png', 'artist' : 'Cosmo', 'title' : `L'ultima Festa`},
    {'url' : './audio/song-4.mp3', 'cover' : './cover/cover-4.png', 'artist' : 'Foo Fighters', 'title' : 'Best Of You'},
    {'url' : './audio/song-5.mp3', 'cover' : './cover/cover-5.png', 'artist' : 'Levante', 'title' : 'Alfonso'},
    {'url' : './audio/song-6.mp3', 'cover' : './cover/cover-6.png', 'artist' : 'LIBERATO', 'title' : 'NOVE MAGGIO'},
    {'url' : './audio/song-7.mp3', 'cover' : './cover/cover-7.png', 'artist' : 'reietto', 'title' : 'Vabbè'},
    {'url' : './audio/song-8.mp3', 'cover' : './cover/cover-8.png', 'artist' : 'Red Hot Chili Peppers', 'title' : 'Dark Necessities'},
    {'url' : './audio/song-9.mp3', 'cover' : './cover/cover-9.png', 'artist' : 'Tai Verdes', 'title' : 'The Last Day On Earth'},
    {'url' : './audio/song-10.mp3', 'cover' : './cover/cover-10.png', 'artist' : 'Y2k, bbono$', 'title' : 'La La La'},
]

// catturare il contenitore della colonna 2

let wrapper = document.querySelector('#wrapper');

// inizializzare il tag audio, perché dovremo ricrearlo ogni volta che si cambia il brano
let audio = null;

// inizializzare un contatore di brani a zero
let counterTrack = 0;

// funzione che ci permette di convertire un range di valori in un altro
function mapRangeValue (currentTime, startTime, endTime, startProgress, endProgress){
    return (currentTime - startTime) * (endProgress - startProgress) / (endTime - startTime) + startProgress;
};

// sezione audio e cover

function createCover() {
    // reset del contenuto di wrapper (ossia del contenitore della sezione dinamica)
    wrapper.innerHTML = ``;

    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-3', 'col-lg-5', 'd-flex', 'justify-content-center');
    div.innerHTML = `
    <!-- immagine cover -->
        <img src="${tracks[counterTrack].cover}" alt="cover caparezza" class="img-rounded" id="imgRotate">
    <!-- file audio -->
    <audio preload="metadata">
        <source src="${tracks[counterTrack].url}">
    </audio>
    `;
    wrapper.appendChild(div)

    // catturare l'elemento html audio ogni volta che lo ricreiamo
    audio = document.querySelector('audio');
}

// sezione info track

function createInfoTrack() {
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-5',  'col-lg-6');
    div.innerHTML = `
        <h2 class="text-center">${tracks[counterTrack].title}</h2>
        <h5 class="text-center">${tracks[counterTrack].artist}</h3>

    <!-- progress bar -->
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: 0%"></div>
    </div>

    <!-- tempo inizio e fine -->
    <div class="d-flex justify-content-between">
        <p id="start">0:00</p>
        <p id="end"></p>
    </div>

    <!-- sezione pulsanti audio -->
    <div class="d-flex justify-content-between">
        <button id="btnBackward" class="btn border fs-3"><i class="fa-solid fa-backward"></i></button>
        <button id="btnPlay" class="btn border fs-3"><i class="fa-solid fa-play"></i></button>
        <button id="btnForward" class="btn border fs-3"><i class="fa-solid fa-forward"></i></button>
    </div>
    `;

    wrapper.appendChild(div);

    // funzionalità play, forward, backward

    // catturiamo i pulsanti audio
    let btnBackward = document.querySelector('#btnBackward');
    let btnPlay = document.querySelector('#btnPlay');
    let btnForward = document.querySelector('#btnForward');



    // gestione play-pause track

    // catturo l'immagine
    let imgRotate = document.querySelector('#imgRotate');

    btnPlay.addEventListener('click', () => {

        if (audio.paused){
            audio.play();
            btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
            imgRotate.classList.add('img-rotate')
        } else {
            audio.pause();
            btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            imgRotate.classList.remove('img-rotate')
        }

        audio.paused;
    });

    // gestione next track
    btnForward.addEventListener('click', () => {

        if (counterTrack < tracks.length - 1) {
            counterTrack++;
        } else {
            counterTrack = 0;
        }
        
        createCover();
        createInfoTrack();
    });

    // gestione back track
        btnBackward.addEventListener('click', () => {

            if (counterTrack > 0) {
                counterTrack--;
            } else {
                counterTrack = tracks.length - 1;
            }
            
            createCover();
            createInfoTrack();
        });

    //catturare end
    let end = document.querySelector('#end');
    // mettere in ascolto l'oggetto audio sul caricamento delle meta informazioni del brano
    audio.addEventListener('loadedmetadata', () => {
        end.innerHTML = (audio.duration /60).toFixed(2);
    })

    //catturare start
    let start = document.querySelector('#start');
    // catturare la progress bar
    let progressBar = document.querySelector('.progress-bar');

    audio.addEventListener('timeupdate', () => {
        start.innerHTML = (audio.currentTime /(60)).toFixed(2);
        progressBar.style.width = `${mapRangeValue(audio.currentTime, 0, audio.duration, 0, 100)}%`
    })


};


// Al caricamento della pagina verrà invocata la funzione che mi permette di creare la sezione cover audio
createCover();
// Al caricamento della pagina verrà invocata la funzione che mi permette di creare la sezione info track
createInfoTrack();
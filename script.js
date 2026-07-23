const songs = [
  {
    title: "បទទី ១ - ស្វាគមន៍",
    artist: "តន្ត្រីសម្រាកអារម្មណ៍",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics: [
      { time: 0, text: "🎵 ស្វាគមន៍មកកាន់ KhmerLyric Studio 🎵" },
      { time: 5, text: "សូមរីករាយកម្សាន្តជាមួយតន្ត្រី និងអត្ថបទចម្រៀង" },
      { time: 10, text: "ឃ្លាទី ១៖ ភ្លេងចាប់ផ្តើមលេងយ៉ាងរលូន..." },
      { time: 15, text: "ឃ្លាទី ២៖ អត្ថបទចម្រៀងលោតតាមចង្វាក់ភ្លេង..." },
      { time: 20, text: "🎶 (ភ្លេងកណ្តាល) 🎶" }
    ]
  },
  {
    title: "បទទី ២ - ចង្វាក់រហ័ស",
    artist: "បទភ្លេងសប្បាយៗ",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    lyrics: [
      { time: 0, text: "🔥 ចាប់ផ្តើមបទទី ២ 🔥" },
      { time: 4, text: "ចង្វាក់ភ្លេងរហ័ស និងសប្បាយៗ" },
      { time: 9, text: "ច្រៀងតាមទាំងអស់គ្នា!" },
      { time: 14, text: "🎶 (ភ្លេង) 🎶" }
    ]
  }
];

let currentSongIndex = 0;
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const lyricsBox = document.getElementById('lyricsBox');
const progressBar = document.getElementById('progressBar');

function loadSong(index) {
  currentSongIndex = index;
  const song = songs[index];
  songTitle.innerText = song.title;
  artistName.innerText = song.artist;
  audio.src = song.src;

  // Render Lyrics
  lyricsBox.innerHTML = '';
  song.lyrics.forEach((item, i) => {
    const p = document.createElement('p');
    p.classList.add('lyric-line');
    if (i === 0) p.classList.add('active');
    p.setAttribute('data-time', item.time);
    p.innerText = item.text;
    lyricsBox.appendChild(p);
  });

  // Highlight Sidebar Active
  const listItems = document.querySelectorAll('#playlist li');
  listItems.forEach((li, i) => {
    li.classList.toggle('active', i === index);
  });
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

function selectSong(index) {
  loadSong(index);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  selectSong(currentSongIndex);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  selectSong(currentSongIndex);
}

// Update Lyrics and Progress Bar
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  if (duration) {
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
  }

  const lines = document.querySelectorAll('.lyric-line');
  lines.forEach((line, index) => {
    const lineTime = parseFloat(line.getAttribute('data-time'));
    const nextLineTime = lines[index + 1] ? parseFloat(lines[index + 1].getAttribute('data-time')) : Infinity;

    if (currentTime >= lineTime && currentTime < nextLineTime) {
      lines.forEach(l => l.classList.remove('active'));
      line.classList.add('active');
      line.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function searchSong() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const listItems = document.querySelectorAll('#playlist li');

  songs.forEach((song, i) => {
    const match = song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
    listItems[i].style.display = match ? 'flex' : 'none';
  });
  }
      

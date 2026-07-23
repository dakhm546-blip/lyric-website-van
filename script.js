// បញ្ជីទិន្នន័យបទចម្រៀង
const playlistData = [
  {
    title: "បទទី ១ - ស្វាគមន៍",
    artist: "តន្ត្រីសម្រាកអារម្មណ៍",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "បទទី ២ - ចង្វាក់រហ័ស",
    artist: "បទភ្លេងសប្បាយៗ",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

// មុខងារជ្រើសរើស និងលេងបទចម្រៀងតាម index
function selectSong(index) {
  const song = playlistData[index];
  if (!song) return;

  // កែប្រែចំណងជើង និងឈ្មោះតារាចម្រៀងលើអេក្រង់
  document.getElementById("songTitle").innerText = song.title;
  document.getElementById("artistName").innerText = song.artist;

  // ដូរប្រភព Audio និងបញ្ជាឱ្យលេង (Play)
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = song.src;
  audioPlayer.play();

  // ប្តូរ Highlight Active លើ Playlist
  const listItems = document.querySelectorAll("#playlist li");
  listItems.forEach((li, idx) => {
    if (idx === index) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

// មុខងារ Logout គំរូ
function logout() {
  alert("អ្នកបានចាកចេញពីប្រព័ន្ធ!");
                          }

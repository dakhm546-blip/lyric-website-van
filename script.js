* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #121212;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: #000000;
  border-bottom: 1px solid #282828;
}

.logo i {
  font-size: 28px;
  color: #1db954;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-logout {
  background-color: #282828;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-logout:hover {
  background-color: #3e3e3e;
}

/* Main Layout */
.app-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  padding: 20px;
  flex: 1;
}

/* Sidebar Playlist */
.sidebar {
  background-color: #181818;
  padding: 20px;
  border-radius: 12px;
}

.sidebar h3 {
  margin-bottom: 15px;
  color: #1db954;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: 0.2s;
}

.sidebar li:hover, .sidebar li.active {
  background-color: #282828;
}

.sidebar li.active {
  border-left: 4px solid #1db954;
}

/* Player Section */
.player-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.player-card {
  background-color: #181818;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.song-info h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.song-info p {
  color: #b3b3b3;
  margin-bottom: 20px;
}

audio {
  width: 100%;
  max-width: 500px;
  outline: none;
}

/* Responsive សម្រាប់អេក្រង់ទូរសព្ទ */
@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
  }
}
  

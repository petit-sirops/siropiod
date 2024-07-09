const repoOwner = 'your-username'; // Replace with your GitHub username
const repoName = 'your-repo'; // Replace with your repository name
const directory = 'Music';

const musicList = document.getElementById('music-list');
const audioPlayer = document.getElementById('audio-player');

async function fetchMusicFiles() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directory}`;
    try {
        const response = await fetch(apiUrl);
        const files = await response.json();

        files.forEach(file => {
            if (file.name.endsWith('.mp3')) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = file.download_url;
                link.textContent = file.name;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    audioPlayer.src = file.download_url;
                    audioPlayer.play();
                });
                listItem.appendChild(link);
                musicList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error fetching music files:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchMusicFiles);

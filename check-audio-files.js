const fs = require('fs');
const path = require('path');

// Directory to check for audio files
const audioDir = './audio'; // Assuming audio files are in an 'audio' subdirectory

// Supported audio file extensions
const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];

// Function to check if a file is an audio file
function isAudioFile(file) {
  const ext = path.extname(file).toLowerCase();
  return audioExtensions.includes(ext);
}

// Function to list audio files
function listAudioFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    const audioFiles = files.filter(isAudioFile);
    return audioFiles;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
    return [];
  }
}

// Main function
function checkAudioFiles() {
  console.log('Checking for audio files in:', audioDir);
  const audioFiles = listAudioFiles(audioDir);

  if (audioFiles.length === 0) {
    console.log('No audio files found.');
  } else {
    console.log(`Found ${audioFiles.length} audio file(s):`);
    audioFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
  }

  // Check if directory exists
  if (!fs.existsSync(audioDir)) {
    console.log(`Directory ${audioDir} does not exist.`);
  }
}

// Run the check
checkAudioFiles();
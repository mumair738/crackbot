# Crack and Combat

A real-time multiplayer trivia game built with Node.js, Express, and Socket.IO.

## Features

- Real-time multiplayer gameplay
- Trivia questions with multiple choice answers
- Live score updates
- Mobile-optimized interface
- Audio file checking utility
- OpenAI integration placeholder (for future AI-generated questions)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crack-and-combat.git
   cd crack-and-combat
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Game

1. Start the server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Game Rules

- Multiple players can join the game
- One player starts the game
- Questions are presented one at a time
- Players select their answers
- Correct answers earn points
- Game continues until all questions are answered
- Final scores are displayed at the end

## File Structure

- `server.js` - Main server file with Socket.IO logic
- `index.html` - Game interface
- `check-audio-files.js` - Utility to check audio files
- `test-openai.js` - OpenAI integration test script
- `package.json` - Project dependencies and scripts
- `.gitignore` - Git ignore rules

## Audio Files

Place audio files in the `audio/` directory. Supported formats: MP3, WAV, OGG, M4A.

Run `node check-audio-files.js` to verify audio files.

## OpenAI Integration

The `test-openai.js` file contains a placeholder for OpenAI integration. To use it:

1. Install the OpenAI SDK:
   ```
   npm install openai
   ```

2. Set your OpenAI API key as an environment variable:
   ```
   export OPENAI_API_KEY=your_api_key_here
   ```

3. Uncomment and modify the code in `test-openai.js`

## Contributing

Feel free to submit issues and pull requests.

## License

ISC License
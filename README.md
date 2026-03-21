# Find the Eid Moon 🌙

"Find the Eid Moon" is an interactive, browser-based mini-game built using HTML5 Canvas, CSS3, and JavaScript. Celebrate the end of Ramadan by stepping into the shoes of an astronomer! Use your mouse as a telescope to scan the vast, randomized night sky and locate the hidden crescent moon to win. 

## ✨ Features

* **Interactive Telescope Effect:** The night sky is hidden in darkness. Your cursor acts as a telescope lens, revealing a small radius of the vibrant universe beneath it.
* **Procedural Universe Generation:** Every time you play, the universe is uniquely generated. Planets, asteroids, satellites, and the crescent moon are randomly scattered without overlapping.
* **Win Condition:** Explore the sky until your telescope lens hovers over the crescent moon to trigger the "Eid Mubarak!" victory screen.
* **Toggle Night Sky:** A built-in "Hide Night Sky" button allows players to bypass the telescope effect and view the entire generated universe at once.
* **Reset Functionality:** Easily restart the game to generate a completely new layout of the cosmos.
* **Responsive Design:** Automatically adapts to your browser window size, working seamlessly across different desktop screen dimensions.

## 🚀 Technologies Used

* **HTML5:** For the game structure and Canvas element.
* **CSS3:** For styling, animations (loading spinner), and beautiful glowing text effects.
* **JavaScript (Vanilla):** For game logic, asset loading, collision detection (preventing overlapping celestial bodies), and canvas rendering.

## 📁 File Structure

```text
eid-crescent/
├── images/
│   ├── asteroid.png
│   ├── astronaut.png
│   ├── crescent.png
│   ├── earth.png
│   ├── jupiter.png
│   ├── mars.png
│   ├── mercury.png
│   ├── neptune.png
│   ├── pluto.png
│   ├── satellite.png
│   ├── saturn.png
│   ├── spaceship.png
│   ├── sun.png
│   ├── uranus.png
│   └── venus.png
├── index.html
├── script.js
└── style.css

```

🎮 How to Play
Wait for the universe to finish loading.

Move your mouse (or drag your finger on touch devices) across the dark screen to reveal the space beneath.

Look out for the golden crescent moon!

Once your telescope lens crosses over the moon, you win the game.

🛠️ Installation & Setup
Because this game relies on the HTML5 Canvas API to load image assets, running the index.html file directly from your file system (using the file:// protocol) might cause CORS (Cross-Origin Resource Sharing) security errors in some modern browsers.

To run this project locally:

Option 1: Using VS Code Live Server (Recommended)

Open the project folder in Visual Studio Code.

Install the "Live Server" extension.

Right-click on index.html and select "Open with Live Server".

Option 2: Using Python

Open your terminal or command prompt.

Navigate to the project directory.

Run a local HTTP server:

Python 3.x: python -m http.server 8000

Python 2.x: python -m SimpleHTTPServer 8000

Open your browser and go to http://localhost:8000.

🤝 Contributing
Feel free to fork this project, submit pull requests, or send suggestions to make the universe even more exciting (e.g., adding shooting stars, sound effects, or varying telescope sizes!).

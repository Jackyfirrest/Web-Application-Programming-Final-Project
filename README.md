# Love Bot Project
Project Overview
This is a love chatbot project that includes features like chatting, tarot card reading, and image generation. It supports voice responses and uses HTML, CSS, and JavaScript for the frontend, while the backend is built with Node.js and SQLite database.

# Folder Structure
```
love-bot/
│
├── src/                      # Source code folder
│   ├── app.js                # Main server file, sets up Express server
│   ├── routes/               # Route handlers
│   │   ├── chat.js           # Chatbot API
│   │   ├── tarot.js          # Tarot card API
│   │   └── image.js          # Image generation API
│   ├── db/                   # Database management
│   │   └── init-db.js        # Database initialization script
│   └── public/               # Frontend static files
│       ├── index.html        # Chatbot page
│       ├── style.css         # CSS stylesheet
│       └── script.js         # Frontend JavaScript
├── node_modules/             # Node.js dependencies
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```


# Installation & Usage

## Clone this project:
```
git clone https://github.com/IsFolk/love-bot.git
```
```
cd love-bot
```

## Install all dependencies:
```
npm install
```

## Start the Backend server:
```
npm start
```

## Open your browser
```
Visit ./love-bot/src/public/index.html to interact with the chatbot.
```

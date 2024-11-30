# Love Bot Project
## Project Overview
This is a love chatbot project that includes features like chatting, tarot card reading, and image generation. It supports voice responses and uses HTML, CSS, and JavaScript for the frontend, while the backend is built with Node.js and SQLite database.

# Folder Structure
```
love-bot/
│
├── src/                              # Source code folder
│   ├── app.js                        # Main server file, sets up Express server
│   ├── components/                   # Frontend Components
│   │   └── AvatarGenerator.jsx       # AvatarGenerator for characters
│   ├── routes/                       # Route handlers
│   │   ├── character.js              # Character API
│   │   ├── chat.js                   # Chatbot API
│   │   ├── tarot.js                  # Tarot card API
│   │   └── image.js                  # Image generation API
│   ├── db/                           # Database management
│       ├── character-template.json   # Template for database 
│   │   └── init-db.js                # Database initialization script
│   └── public/                       # Frontend static files
│       ├── style.css                 # CSS stylesheet
│       └── script-react.jsx          # Frontend React JavaScript
├── node_modules/                     # Node.js dependencies
├── .gitignore                        # Git ignore file
├── package.json                      # Project dependencies and scripts
└── README.md                         # This file
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

## Install Database in Local Before Running:
```
cd ./src/db
```
```
node init-db.js
```

## Start the Server:
```
npm start
```
**Server usually run at http://localhost:3000**

# Git Commit Common Type

## Common Types
Type	Description
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting, missing semi-colons, etc.)
- refactor: Code refactoring without changing functionality
- test: Adding or modifying tests
- chore: Miscellaneous tasks (build scripts, tooling changes)
- perf: Performance improvements
- build: Changes affecting the build system or dependencies

A well-structured Git commit message helps maintain a clear history of changes, making it easier to understand what each commit does and why. Below is a guide to common formats and examples.

## Examples of Commit Messages
### New Feature:
```
feat(payment): add support for PayPal integration
```

### Bug Fix:
```
fix(api): resolve issue with user data fetching
```
### Documentation Update:
```
docs: update README with setup instructions
```
### Code Refactoring:
```
refactor: simplify user authentication logic
```
### Code Style Changes:
```
style: fix indentation in app.js
```

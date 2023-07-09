# Landmarks UAE

Landmarks UAE is an application developed in `Angular - TailwindCss / NodeJs with Parse` and deployed at https://landmarks-uae.vercel.app/

## Prerequisites

* NodeJs: **18.16.0**
* Npm: **9.5.1**

Note: Consider using https://github.com/nvm-sh/nvm for an easy nodejs version switching

## How to run

### Backend 

Example `backend/.env` file with content (replace `<place-holders>`):

```
NODE_ENV=development

DB_URI=<db-uri>

APP_ID=<app-id>
MASTER_KEY=<master-key>
PUBLIC_SERVER_URL=http://localhost:5000/parse

SERVER_URL=http://localhost:5000/parse
SERVER_PORT=5000

PHOTO_WIDTH=250
PHOTO_HEIGHT=250

APP_NAME=<app-name>
APP_USER=<app-user>
APP_PASS=<app-password>
```

Run steps:

```bash
# Change dir
cd backend

# If running for the very first time otherwise skip
npm ci

# Start nodejs server
npm run start:dev
```

### Frontend

Example `frontend/.env` file with content (replace <place-holders>):

```
APP_ID=<app-id>

SERVER_URL=http://localhost:5000/parse
```

Run steps:

```bash
# Change dir
cd frontend

# If running for the very first time otherwise skip
npm ci

# Running project tests (Optional)
npm test

# Start dev server
npm start
```
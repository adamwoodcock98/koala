[![Tests](https://github.com/adamwoodcock98/acebook-team-baddiez/actions/workflows/tests.yml/badge.svg)](https://github.com/adamwoodcock98/acebook-team-baddiez/actions/workflows/tests.yml)

# Koala

Koala is a MEHN-stack social media application aimed at people called Barry, as well as Barry's friends and family.

## Team

[![Github Adam](https://img.shields.io/static/v1?label=GitHub&message=Adam%20Woodcock&color=informational&logo=github)](https://github.com/adamwoodcock98)
[![Github Chris](<https://img.shields.io/static/v1?label=GitHub&message=Chris%20Lovell%20(BSc)&color=informational&logo=github>)](https://github.com/clovellbsc)
[![Github George](https://img.shields.io/static/v1?label=GitHub&message=George%20Hett&color=informational&logo=github)](https://github.com/george-h-h)
[![Github Kathleen](https://img.shields.io/static/v1?label=GitHub&message=Kathleen%20Ly&color=informational&logo=github)](https://github.com/heykathl)
[![Github Paul](https://img.shields.io/static/v1?label=GitHub&message=Paul%20Kilgarriff&color=informational&logo=github)](https://github.com/PKilgarriff)
[![Github Rob](https://img.shields.io/static/v1?label=GitHub&message=Rob%20Oman&color=informational&logo=github)](https://github.com/r94o)
<br>[![Koala Barry](https://img.shields.io/static/v1?label=Koala&message=Barry&color=blueviolet)](https://koala-acebook.herokuapp.com/)

## Technologies Used

### MEHN Stack

- [MongoDB](https://www.mongodb.com/) - noSQL databse for storing collections.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Handlebars](https://handlebarsjs.com/) - Templating engine for front-end.
- [Node.js](https://nodejs.dev/) - JavaScript run-time environment

### Other Notable Technologies

- [Mongoose](https://mongoosejs.com) - Object Data Mapper for MongoDB.
- [Nodemon](https://nodemon.io/) - reloads the server automatically on file-change (Not CSS though!).
- [ESLint](https://eslint.org) - project-wide linting.
- [Jest](https://jestjs.io/) - unit tests.
- [Cypress](https://www.cypress.io/) - integration tests.
- [Balsamiq](https://balsamiq.com/) - wireframing and mock-ups.
- [Inkscape](https://inkscape.org/) - SVG manipulation.
- [date-fns](https://date-fns.org/) - successor to moment.js for DateTime handling and relative timestamps
- [GitHub Actions](https://github.com/features/actions) - continuous integration and automated deployment

### Organisational Tools

- [Trello (Kanban Board)](https://trello.com/b/P8lEsvZe/acebook) - Kanban project board for managing tickets and observing workflow.
- Google Drive - Resources collection, and documentation of Team Charter and stand-ups/retros.
- Slack - messaging and visibility for GitHUb Pull Requests
- Zoom - Remote Pairing & Meetings

## Team Approach

**Section on general approach**

---

# Setting Up

> Note: The following steps assume you have access to [Homebrew](https://brew.sh/)

### Pre-requisites

Install Node Version Manager (NVM)

```
brew install nvm
```

Then follow the instructions to update your `~/.bash_profile`.
Open a new terminal
Install the latest long term support (LTS) version of [Node.js](https://nodejs.org/en/), currently `16.14.2`.

```
nvm install 16
```

### Set-up and Running of MongoDB on your local machine

Assuming that [homebrew](https://brew.sh/) is already installed:

```zsh
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start mongodb-community@5.0
brew services list
```

The last command is checking that mongodb service has been started as a MacOS service, you should see something similar in your output

```zsh
Name              Status  User      File
mongodb-community started your-user ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community.plist
```

### Cloning the Repository

Clone the repository to your local machine.

```
git clone https://github.com/adamwoodcock98/acebook-team-baddiez
cd acebook-team-baddiez
```

Once the repository has been cloned you will be able to install the dependencies from Node Package Manager.

```
npm install
```

### Running the local server

```zsh
cd acebook-team-baddiez
npm run start
```

Navigate to [localhost:3000](http://localhost:3000), or if you are having issues with DNS resolution [127.0.0.1:3000](http://127.0.0.1:3000).

### Testing the local server

```bash
cd acebook-team-baddiez
npm run start:test # Starts the test server - which has a testing database so as not to interfere with devor production databases
npm lint # Pre-test linting to expose any formatting errors
npm test:unit # Unit Tests for isolated model functionality
npm test:integration # Integration tests of end-to-end functionality
```

Alternatively all three of the above commands (Linting, Unit, and Integration tests) can be chained by running `npm run test`

### Accessing the Producution Environment

Koala is deployed on Heroku using a Mongo Atlas database, and the front-end of this can be accessed [here](https://koala-acebook.herokuapp.com).
The database and server-side will not be made available.

# Appendix

## Appreciations

As always, Barry - you have been our rock, our port in a storm, and our blazing beacon of hope during long dark nights of the soul. Ths one's for you.

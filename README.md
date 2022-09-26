# <p align = "center"> Sing me a song </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" style="width:40%;"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Mateus Gueler-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/MatGueler/projeto21-singmeasong-back-end?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

Have you ever asked anyone for a song recommendation? It's time to turn this into code. This is a project that will help you share your favorite videos! In addition to your friends not getting out of date in conversations, many people will be able to take advantage of your recommendation.

Sing me a song is an application for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to others.

---

## :computer: Technologies and Concepts

- Node.js (v16.17.0)
- TypeScript
- SQL
- Layered Architecture
- Prisma
- Jest
- Cypress
- Unitary testing
- Integration testing
- End-to-End testing

---

## :rocket: Routes

```yml
POST /recommendations
    - Route to register a new recommendation
    - headers: {}
    - body: {
    name: "Melhor música do ano",
    youtubeLink: "https://www.youtube.com/watch?v=Q4yAvASIz6Q",
    }
```

```yml
POST /recommendations/:id/upvote
    - Route to add a dislike to the recommendation by id in route
    - headers: {}
    - body: {}
```

```yml
POST /recommendations/:id/downvote
    - Route to add a like to the recommendation by id in route
    - headers: {}
    - body: {}
```

```yml
GET /recommendations
    - Route to gets all 10 recommendations
    - headers: {}
    - body: {}
```

```yml
POST /recommendations/:id
    - Route to get a recommendation by id in route
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/random
    - Route to get a random recommendation
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/top/:amount
    - Route to get a number of recommendations and presents a ranking
    - headers: {}
    - body: {}
```

---

## 🏁 Running the application

The project has some essential dependencies that require the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/). So make sure your version running locally is compatible.

First, clone this repository on your machine:

```
git clone https://github.com/MatGueler/projeto21-singmeasong-back-end.git
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server

```
npm run dev
```

## :hammer: Testing the application

The tests were carried out on the front-end and abck end of this project. Addressing unit testing, integration testing, and end-to-end testing.

### **Back-end**

The JEST test framework was used as a back-end test framework, for that, run the command below to initialize the database for testing and start the automatic tests. The commands are for unit testing and integration testing.

#### Unity

```
npm test:unit
```

#### Integration

```
npm test:unit
```

### **Front-end**

To initialize the front-end follow the steps described in the following link: [front-end repository](https://github.com/MatGueler/projeto21-singmeasong-front-end)

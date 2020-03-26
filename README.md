# HIQ take-home test

## An app which lets you upload text-files and returns the most frequent word.

## Installation Instructions

Install the app by running

```bash
npm install
```

### Start App

Start local vue server with

```bash
npm run serve
```

Start node with

```bash
npm run dev
```

Navigate to app in [browser](http://localhost:3000)
http://localhost:3000

Enjoy!

### Ship for production

**WARNING!**
This is an app written for test purposes. dev.env and README.md are not ignored by git. Both files handle sensitive information such as password.

To minimize and compile for production run

```bash
npm run dev
```

### Run your unit tests and linting

To run test:

```bash
npm run test
```

To lint:

```bash
npm run lint
```

### Customize configuration

### Technologies and Packages Used

I used [create-vue-project](https://cli.vuejs.org/guide/creating-a-project.html)
to generate the scaffolding for this app.

- Axios 0.19.2
- Bootstrap 4.4.1
- Express 4.17.1
- MongoDB 3.5.5
- Mongoose 5.9.4
- Multer 1.4.2
- Vue.js 2.6.11
- Vue-router 3.1.5
- Vuex 3.1.2

## Development dependencies

- Nodemon
- Jest
- Eslint
- Prettier

### FAQ

#### Change node-port

Default port is 3000.
To change port go to Config > "dev.env" and change value on "PORT".

#### Change Vue-port

Default port is 8080.
To change port go to ROOT > "vue.config" and change value on "port".

#### Change database-url

Default database-url is a local MongoDB-databse.
To change to an external database go to Config > "dev.env and change value on MONGODB_URL to:

```bash
mongodb+srv://rasmus:passwordhiq@cluster0-gcjm4.mongodb.net/document-api?retryWrites=true&w=majority
```

Local url is:

```bash
mongodb://127.0.0.1:27017/documents-api
```

#### Official Vue configuration reference

See [Configuration Reference](https://cli.vuejs.org/config/).

```

```

# HIQ take-home test

## An app which lets you upload text-files and returns the most frequent word.

## Installation Instructions

Install the app by running

```bash
npm install
```

### Start App

Start local Vue server with

```bash
npm run serve
```

Start Node with

```bash
npm run prod
```

Navigate to app in [browser](http://localhost:3000)
http://localhost:3000

The app runs on a remote database to ensure a swift installation process. To change to local database, see FAQ below.

Enjoy!

### Ship for production

**WARNING!**
This is an app written for test purposes. prod.env is not ignored by git. The file handles sensitive information such as passwords.

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

#### Local server setup.

Start Node with

```bash
npm run dev
```

This will change the MONGODB_URL to:

```bash
mongodb://127.0.0.1:27017/documents-api
```

##### No local MongoDB server installed?

You can download the MongoDB Community Server from the MongoDB download page. The download is a zip file. Unzip the contents, change the folder name to “mongodb”, and move it to your users home directory. From there, create a “mongodb-data” directory in your user directory to store the database data.

You can start the server using the following command. Make sure to swap out “/Users/Rasmus/” with the correct path to your users home directory.
/Users/Rasmus/mongodb/bin/mongod --dbpath=/Users/Rasmus/mongodb-data

Documentation Link: [MongoDB download page](https://www.mongodb.com/download-center/community)

#### Change node-port

Default port is 3000.
To change port go to Config > "dev.env" or "prod.env" depending on your setup and change value on "PORT".

#### Change Vue-port

Default port is 8080.
To change port go to ROOT > "vue.config" and change value on "port".
Go to Config > "dev.env" or "prod.env" depending on your setup and change value on "VUE_PORT" to same value to update CORS-settings.

#### Official Vue configuration reference

See [Configuration Reference](https://cli.vuejs.org/config/).

```

```

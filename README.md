# File Upload

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

## Technologies discussion

Regarding MongoDB and Mongoose I had previously worked with MongoDB and Mongoose setting up a local database sending JSON-data. Therefore, one of the reasons was simply that I thought it would be an interesting next step to use MongoDB to store binary data. Furthermore, if I ever wanted to scale up this project and store loads of documents, a NoSQL database is a good choice for storing documents because of the low level of support between objects. The reasons I went with a cloud database is partly because I have not done it before and thought it would be fun to set it up and partly because and wanted to make the installation process as smooth as possible.

Concerning Node and Express, I hade done some previous work with Express and therefore it seemed as a good choice considering the time frame for this project. Express, however, does not support file upload in itself, but Multer happens to be released and maintained by the same team which allows you to add file upload to Express with a couple of lines of code. Therefore I thought Multer was a good choice as well.

Lastly, I chose Vue because I have worked with it before and enjoy it immensely. Once again, not knowing how much time certain aspect of the project would consume, going with Vue felt like a safe choice. With the same reasoning, I picked Bootstrap and Axios. There is nothing wrong with Vue-resource, but that being said I like Axios because it is not specific to Vue. I believe this makes the code perhaps a little bit easier for others to read. And with Bootstrap I know I will get a mobile-friendly app with very few lines of code. The components part of Bootstrap, though always handy, was not the deal breaker in this particular project.

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

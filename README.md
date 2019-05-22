# hello-world

### Project Structure
```
project contains 3 pages- 
1. about Ilan
2. front App
3. Back 'crm' to controll the backens (node+koa) app.
```

#### Front Page
###### ~local app controller

```
a. store will fetch data from API for itself and host it in web-sql
b. data will be pulled into vue's store on demand and will be shown as report + expanders.
c. data can be deleted both in store and web-sql.
d. buttons are disabled when action is irrelevant (for example- if no data in store, EMPTY STORE btn will be disabled.
```
#### Back Page
###### ~crm page for koa app
```
important!!! 
you'll need to install and activate the koa app in order to work with the back app.
see koa repo readme file.

Page has 6 buttons:
1. test connection - will test connection to koa app server. on return a notification will popup.
2. fetch words from api - will init mongo with data from api. on return a notification will popup.
3. fetch words from mongo - will fetch data from mongo into local store.
4. tweet report - will ask for report- total words and related words, and will show a simple report.
5. delete local- will delete local data only.
6. delete all - will delete both local and remote data in mongo.
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```



See [Configuration Reference](https://cli.vuejs.org/config/).

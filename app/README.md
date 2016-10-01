# Angular Express Boilerplate
Lately, I've been spinning up a good number of MEAN apps, and I thought I might be able to save some time by putting together a good boilerplate representing the lowest common denominator of all these apps.

Thusly, the cleverly named *Angular Express Boilerplate* was born.  This boilerplate is meant to help you get your MEAN app off the ground fast.  It comes with a robust gulpfile with a series of tasks to make building your app a snap.

Requires MongoDB: [https://www.mongodb.com/download-center](https://www.mongodb.com/download-center)

## Quickstart

1. Make you have gulp installed globally and that `mongod` is running in the background somewhere.

    ```
    npm install -g gulp # may require elevated access (i.e. sudo)
    ```

2. Open up the terminal of your choice and enter the following commands:

    ```
    git clone https://github.com/wbadart/angular-express-boilerplate app &&\
    cd app &&\
    npm install && \
    npm start
    ```

## Features
This boilerplate comes with two versions: a barebones version and a tutorial version.  The barebones is just a plain MEAN app pre-scaffolded to get you off the ground with a blank app quick.  The tutorial version comes with a couple example states and Angular components to serve as examples as you write your own.  The template for this version also has a navbar.

Both version come with [Bootstrap](https://getbootstrap.com) 3.3.7, [Font-Awesome](http://fontawesome.io) 4.6.3, [jQuery](https://jquery.com/) 2.2.4 (intentionally not 3.x for Bootstrap compatibility), [Angular](https://angularjs.org/) 1.5.8, [Ng-Cookies](https://docs.angularjs.org/api/ngCookies) 1.5.8, [UI-Router](https://angular-ui.github.io/ui-router/site/#/api/ui.router), and [Dir-Pagination](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination).  The server includes [Express](http://expressjs.com/) 4.14.0 along with [body parser](https://github.com/expressjs/body-parser), [express logger](https://www.npmjs.com/package/express-logger), and [compression](https://www.npmjs.com/package/compression).

## Gulp Tasks
These tasks will help you manage the build process of your MEAN app.  Please note that the `NODE_ENV` environment variable will affect how some of these tasks (and also the express server) behave.

With `NODE_ENV==="PROD"`:

- client JS and CSS will be minified
- express server will listen on 0.0.0.0:80

And with `NODE_ENV!=="PROD"`:

- client JS and CSS will not be minified, sourcemaps will be written
- express server will listen on 127.0.0.1:3000

### Task Tree
Each of the tasks below can be invoked with `gulp [task name]`, and that task (along with its children) will be run.  The "leaf" tasks are detailed below.  Note that with the exception of `default`, all the tasks are run asynchronously.  `default` is run with `gulp-sync` to prevent the server from starting before the server files land in `dist/`.

```
default
+-- build
|   +-- compile
|   |   +-- compile:js
|   |   |   +-- compile:js:server
|   |   |   +-- compile:js:client
|   |   |   +-- compile:js:vendor
|   |   +-- compile:sass
|   +-- move
|       +-- move:html
|       +-- move:assets
+-- serve
+-- watch
+-- clean
```

#### Bottom-level tasks
These are the tasks that actually do things (besides run other tasks).

**compile:js:server**
Move the files that create the server from `src/` to `dist/`.  No compilation, transpilation, or minification occurs since Node can read the ES6 that comprise the files.

**compile:js:client**
Compile the Angular client.  The pipeline is currently using the `es2015` babel preset as the target spec.  Depending on `NODE_ENV`, the files will also be minified or sourcemapped.

**compile:js:vendor**
Concatenate and minify all the third-party Javascript resources.  This includes Angular, jQuery, and any other files specified in the `vendor` array in the gulpfile.

**compile:sass**
Get `master.scss` all compiled and moved to `dist/`.  `master.css` will include all Bootstrap and Font-Awesome rules.  Make sure that as you edit the file, the definition of `$fa-font-path` stays above `@import "font-awesome"`, otherwise it won't be able to find the font files.

**move:html**
Transfer all the HTML from `src/` to `dist/`.  This, specifically is `index.html` and all the partials associated with each state and directive.

**move:assets**
Transfer the asset directory to `dist/`.  Everything in the folder is moved *except* for Sass files, as these are handled by `compile:sass`.

**serve**
Execute the Express server.  With `NODE_ENV` set to `"PROD"`, the server will listen on `0.0.0.0:80`. Otherwise it will listen on `127.0.0.1:3000`.

**watch**
Set up watchers for the file groups associated with each of the above tasks (e.g. `src/client/**/*.html` is the file group associated with `move:html`).  These watchers execute the appropriate task when a member of a given file group is modified.  Also, because the server is run by [Nodemon](http://nodemon.io), the server will restart when the watchers execute server related tasks.

**clean**
Simply removes the `dist/` directory so you can be sure that your next build is from a clean slate.

##NPM Scripts
In addition to the above gulp tasks, the boilerplate ships with a couple NPM scripts to help you manage your app.  `npm start` will run the initialization script (wherein you choose the version of the boilerplate you want, set your app name, etc.) and automatically run gulp.  `npm run init` will run the initialization script on its own and won't automatically start gulp.  Finally, `npm run clean` will run `gulp clean` and remove the `src/` directory, essentially taking you back to where you were when you cloned.


## License
This boilerplate is licensed under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.txt).

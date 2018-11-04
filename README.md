# Just ToDo-It

_Just ToDo-It_ is a fullstack productivity application that allows users to manage their own todo list, link up with friends, join groups, and work on projects together. It features:
* Custom-built authentication system and API using **[Express][expressjs]**
* Dynamic front-end functionality with **[Vue 2][vue]**
* Data Storage and persistence with **[MongoDB][mongodb]**


### Usage

##### Signing Up
  * Navigate to https://aarondubenion.com/todo-app/
  * Click the link on the message, _"Got an account? Login! If not, Sign up here!"_
  * Complete the signup form using the following constraints:
    * Email must be in valid format (ex. email@host.com) and **must be unique** (one account per email address)
    * Username must be 4 - 32 characters long using **only** alpha-numeric characters (a-z, A-Z, 0-9), underscores (_), and **must be unique**
    * Password and Confirm Password **must mach exactly**
    * Click submit
  * After hitting submit, you will be redirected to the login page to sign in

##### Using App
###### Navigation
* **Dashboard**: your home page where you can view incomplete todos, friends, and associated groups. There are links to jump to these pages at the foot of each section.
* **Todos**: This is your personal todo list. You can create by using the text input bar and then clicking _"Add"_. At the foot of each incomplete todo instance, there is a link to complete and to delete the todo. Completed todos follow the same format, replacing the link to complete with a link to mark it as incomplete again. *As a note, friends will be able to see your todo list on your profile page, but will not be able to edit it.
* **Friends**: This is the page to view your friends information in its entirety. You can respond to friend requests. Clicking on usernames will bring you to that person's user profile page.
  * **User Page**: Here, you can interact with the user associated with this page. If you and the user are friends, the user's todos, friends, and groups are displayed here but are unable to be modified. If there is no friend association between you and the user, the page will not display this, but prompt to add the user as a friend. Click the dropdown at the beginning of the page and select _"Add Friend"_. . The user who initiated the group task is listed in the todo information. *User Messages are still being developed and will not work at this time.
* **Groups**: This page will show you all groups you are associated with, and has an option to create a group of your own! Simply click the button _"Create Group"_ sitting above the list. A dialogue box will pop up to have you specify the group name. Clicking on the group name will bring you to that group's page
  * **Group Page**: Here, you can interact with the group and its users. Users that are a part of the group can see other users associated with the page and create group tasks. These are todos for the group that anyone can create, update and delete. The user who initiated the group task is listed in the todo information. To join the group, simply click the dropdown at the beginning of the page and select _"Join Group"_ *Group Messages are still being developed and will not work at this time.
* **Logout**: Clicking Logout will sign you out of your current session and then redirect you to the login page. Thank you for using _Just ToDo-It_!
* **Search**: Clicking Search will bring up a search dialogue. From here, you can search for users, friends, groups, and your todos. For todos, it will display whether or not it is completed. The names are clickable and will lead you to either the respective user page, group page, or your own todo list.

### Issues

Please do the following when submitting issues:

* Follow the link to the repository issues page [here][submitIssues]
* Be as descriptive as possible for the subject and description of issue. The more information, the better! Thank you for your feedback!

### Developers - Download and Install

  * Navigate to the **[Just ToDo-It][justtodoit]** repository page
  * At the top of the repo information, select the green _"Clone or Download"_ button and then select _"Download Zip"_. A copy of the app.
  * Navigate to the application root (you should see folders such as "src" and "public")
  * Open up your favorite terminal and run the following commands:
```sh
$ npm install
```
```
$ touch .env
```
  * Open .env in your favorite text editor or IDE, and copy the following information:
```
API_HOST= localhost
API_PORT= <express.js port here>
MONGO_DB_URI_DEV=mongodb://localhost:<mongodb port here>/todo-list
SECRET_KEY= <dev secret key here for bcrypt>
SALT_WORK_FACTOR= <favorite salt rounds here>
CORS_ORIGIN_DEV=http://localhost:8080
```
  * Open src/config/server.js and make sure that you see the following:

 At the beginning on line 37
```js
app.use(cors({credentials: true, origin: `${process.env.CORS_ORIGIN_DEV}`}));
```
At the end starting on line 629 
```js
mongoose.connect(process.env.MONGO_DB_URI_DEV, { useNewUrlParser: true }, err => {
  if (!err) {console.log('connected to db')} 
  else {console.log(err)}
})
```
  * If you do not have MongoDB installed on your compute, please go **[here][mongodb]** to learn how to download and install it.
  * Setup is now complete! Please proceed to **Development** section for more info on how to start the environment.

### Development

To get the development environment up and running, please run these commands:

* First Tab (from project root):

(First time only)
```sh
$ mkdir -p src/config/db
```
(Every time)
```sh
$ npm run db
```

*  Second Tab:
```sh
$ npm run api
```

* Third Tab:
```sh
$ npm run serve
```

* Fourth Tab:
```sh
$ mongo --port <Your port here>
```

At this point, the API, DB, and Vue instance should be up and running. You should also be conncted to the mongodb instance running on your computer. Happy Coding!

### Todos

* Finish realtime chat plugin using Firebase and React
* Write tests
* Implement searchability for group tasks

   [expressjs]: https://expressjs.com/
   [vue]: https://vuejs.org/
   [mongodb]: https://www.mongodb.com/
   [submitIssues]: https://github.com/adubenion/vue-todo-app/issues/new
   [justtodoit]: https://github.com/adubenion/vue-todo-app/

---

### START SERVER

-   run `yarn start`

### START DEVELOPMENT SERVER

- run `yarn develop`

### START PRODUCTION SERVER

- run `yarn server`

---
---
#### Endpoints
---
| Method | Endpoint      | Description                                                                   | body                  |
| ------ | ------------- | ----------------------------------------------------------------------------- | --------------------- |
<!-- | POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. | { "username": "user", "password": "pass", "role": 0 } |
| POST   | /api/login | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client.| { "username": "user","password": "pass" } |
| GET    | /api/users | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the err code. | --- | -->
| GET    | /users | If the user is logged in, respond with an array of all the user objects contained in the database. If the user is not logged in repond with the err code. | [Description Details](#GET/users) |
| POST    | /users | Creates a `user` using the information sent inside the `body` of the request. Name and email fields are manditory. Id is automatically incremented. | [Description Details](#POST/users) |
| GET    | /users/search | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the err code. Get users based off search term using fuse.js for fuzzy search. | --- |
| GET    | users/:id | If the user is logged in, respond with an array of all the events contained in the database for a user. If the user is not logged in repond with the err code. | [Description Details](#GET/users/:id) |
| GET    | /users/:id/info | If the user is logged in, respond with an object of all the users info contained in the database. If the user is not logged in repond with the err code. | [Description Details](#GET/users/:id/info) |
| PUT    | /users/:id | If the user is logged in, responds with an object with the users entry that has been updated. If the user is not logged-in or does not contain the entry respond with the err code. | [Description Details](#UPDATE/users/:id) |
| DELETE | /users/:id | If the user is logged in, finds and deletes user. It also deletes user relationship where he is a friend in users_friends table. If the user is not logged-in or does not contain the entry respond with the err code. | [Description Details](#DELETE/users/:id) |
---


Endpoints local=http://localhost:5555/
Endpoints Production=http:///

Crud for Users Events
get
http://localhost:5555/users_events/1
```
[
    {
        "id": 1,
        "user_id": 1,
        "event_id": 1
    },
    {
        "id": 3,
        "user_id": 1,
        "event_id": 2
    }
]
```
post:
http://localhost:5555/users_events
```
[
    {
        "user_id": 2,
        "event_id": 1
    }
]
```

delete:
http://localhost:5555/users_events
```
[
    {
        "user_id": 2,
        "event_id": 1
    }
]
```
---
GET <a name='GET/users'></a>
/users 
example:
```
[
    {
        "id": 1,
        "name": "pebble",
        "email": "pebble@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    },
    {
        "id": 2,
        "name": "pebble2",
        "email": "pebble2@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    },
    {
        "id": 3,
        "name": "pebble3",
        "email": "pebble3@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    },
    {
        "id": 4,
        "name": "pebble4",
        "email": "pebble4@rocks.com",
        "isPremium": 0,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "unassigned",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
    }
]
```
---
POST <a name='POST/users'></a>
/users 
_example_ :
```
{
    "name": "pebble44fbfd",
    "email": "pebbrwgfgle4@rocks.com"
}

```
_Response_
On Success Returns: 5 

the Id of the object created in the DB.
Which loks like:
```

[ { id: 5,
    name: 'pebble44fbfd',
    email: 'pebbrwgfgle4@rocks.com',
    isPremium: 0,
    phone: null,
    reminder: null,
    hard_or_soft: 'unassigned',
    heat_pref: 'unassigned',
    street_gourmet: 'unassigned' } ]
```

GET <a name='GET/users/:id'></a>
/users 
example: /users/:id
example response
```
 [
     {
         "id": 1,
         "name": "taco tuesday run 2",
         "email": "lanners.marshall@gmail.com",
         "user_id": 1,
         "event_id": 1,
         "location": "770 mercer street seattle wa",
         "date": "2/14/2019"
     },
     {
         "id": 2,
         "name": "wensday taco run",
         "email": "lanners.marshall@gmail.com",
         "user_id": 1,
         "event_id": 2,
         "location": "1440 4th street washington dc",
         "date": "2/20/2019"
     }
 ]
```

GET <a name='GET/users/:id/info'></a>
/users 
example: /users/1/info
example response
```
{
    "id": 1,
    "name": "pebble",
    "email": "pebble@rocks.com",
    "isPremium": 0,
    "phone": null,
    "reminder": null,
    "hard_or_soft": "unassigned",
    "heat_pref": "unassigned",
    "street_gourmet": "unassigned"
}
```
<!-- #UPDATE/users/:id -->
UPDATE <a name='UPDATE/users/:id'></a>
/users 
Values that can be modified: name, phone, reminder, hard_or_soft, heat_pref, street_gourmet.
example: /users/1
exampleInput:
```
{
        "id": 4,
        "name": "pebble4by4",
        "email": "pebble444444@rocks.com",
        "isPremium": 1,
        "phone": null,
        "reminder": null,
        "hard_or_soft": "soft",
        "heat_pref": "unassigned",
        "street_gourmet": "unassigned"
}
```
example response:
_Response_
Status 200, OK;
On Success Returns: 4 

the Id of the object created in the DB.
Which looks like:
```
{ id: 4,
  name: 'pebble4by4',
  email: 'pebble444444@rocks.com',
  isPremium: 1,
  phone: null,
  reminder: null,
  hard_or_soft: 'soft',
  heat_pref: 'unassigned',
  street_gourmet: 'unassigned' 
}


```

<!-- #UPDATE/users/:id/prem -->
UPDATE <a name='UPDATE/users/:id/prem'></a>
/users 
Values that can be modified: isPremium.
example: /users/1/prem
exampleInput:
```
none 

```
example response:
_Response_
Status 200, OK;
On Success Returns: 1 

Which looks like:
```
{ id: '4' }
{ isPremium: 1 }
```
Id 4 is the id of he user modified, and isPremeium goes from 0 to 1
this works with the stripe implimentation.


<!-- #DELETE/users/:id -->
DELETE <a name='DELETE/users/:id'></a>
example: /users/4 
Values that can be modified: isPremium.
example: /users/4
exampleInput:
```
none 

```
example response:
_Response_
Status 200, OK;
On Success Returns: 1 

Which looks like:
```
simply deleted the data
```
Id 4 is the id of he user deleted.


## Technologies and Frameworks Used
###
- Dependencies
    - body-parser [View Dependency]()
    - cors [View Dependency]()
    - dotenv [View Dependency]()
    - express [View Dependency]()
    - faker [View Dependency]()     
    - fuse.js [View Dependency]()
    - helmet [View Dependency]()
    - heroku [View Dependency]()
    - jsonwebtoken [View Dependency]()
    - knex [View Dependency]()
    - Morgan [View Dependency]()
    - multer [View Dependency]()
    - path [View Dependency]()
    - pg [View Dependency]()
    - sqlite3 [View Dependency]()
    - stripe [View Dependency]()
    - url [View Dependency]()

- Development Dependencies
    - cross-env [View Dependency]()
    - jest [View Dependency]()
    - nodemon [View Dependency]()
    - supertest [View Dependency]()


## Back-End Dependencies ```(Production)```
### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### BcryptJS

Bcrypt is an adaptive hash function which adjusts the cost of hashing, which means that in the future as computers become more powerful, simply increasing the salt rounds will suffice at keeping Main Course secure due to the amount of processing time that would be required to generate all possible password combinations. | [View Dependency](https://www.npmjs.com/package/bcryptjs)

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)

### Morgan

An HTTP request logging middleware used for production to easily identify bugs in routes. | [View Dependency](https://github.com/expressjs/morgan)

##Body-Parser
Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property. Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.| [Wiew Dependency](https://www.npmjs.com/package/body-parser)

### Helmet

A collection of nine smaller middleware functions that set security-related HTTP headers appropriatley. This protects Main Course from numerous well known vulnerablilites. | [View Dependency](https://helmetjs.github.io/)

### JSON Web Token

Realizing that there is not inherent benefit to using tokens over sessions, we chose to implement jwts due to the added benefit of storing the session on the client side as opposed to being in-memory. Main Course is built with the active server in mind and the potential to have the application be accessed from various devices in different locations. With this, instead of running the risk of having a session be interrupted due to data roaming, connection issues, or server side problems, we chose to store the session information on the client side. We also found this to be more efficient for our needs, as jwts eliminate the need to fetch additional information from the DB to validate the user. | [View Dependency](https://www.npmjs.com/package/jsonwebtoken)

### Stripe

A powerful, simple, and seamless payment commerce solution (Required by employer). | [View Dependency](https://stripe.com/docs/)




## Back-End Dependencies ```(Development)```


### Dotenv

Dotsenv allows us to universally set environment variables. | [View Dependency](https://www.npmjs.com/package/dot-env)

### Nodemon

Automatically restarts the server on save making production more efficient. | [View Dependency](https://nodemon.io/)


### Sqlite3

```
 "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "cors": "^2.8.5",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "faker": "^4.1.0",
    "fuse.js": "^3.4.2",
    "helmet": "^3.15.0",
    "heroku": "^7.19.4",
    "jsonwebtoken": "^8.4.0",
    "knex": "^0.16.3",
    "morgan": "^1.9.1",
    "multer": "^1.4.1",
    "path": "^0.12.7",
    "pg": "^7.8.0",
    "sqlite3": "^4.0.6",
    "stripe": "^6.25.1",
    "url": "^0.11.0"

    "devDependencies": {
    "cross-env": "^5.2.0",
    "jest": "^24.0.0",
    "nodemon": "^1.18.9",
    "supertest": "^3.4.2"
  }
  ```
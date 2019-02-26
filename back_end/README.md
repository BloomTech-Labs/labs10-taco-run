---

### START SERVER

-   run `yarn start`

### START DEVELOPMENT SERVER

- run `yarn develop`

### START PRODUCTION SERVER

- run `yarn server`

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
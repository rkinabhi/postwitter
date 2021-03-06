# POSTWITTER - TWITTER CLONE

> ## FUNCTIONALITIES

**All application routes can be found in the [postman collection](https://github.com/rkinabhi/postwitter/blob/master/postwitter.postman_collection.json).**
**The results of each API route and the tests can be found in [screenshots](https://github.com/rkinabhi/postwitter/tree/master/screenshots).**

- User registration using unique username and a password.
- User login including session maintenance.

- Follow / unfollow.
- Create / read / delete tweet.
- Unit / Integration tests (for basic and extended functionality endpoints).

- Like / unlike a tweet.
- Retweet / unretweet.
- Replies and threading.

---

> ## RUNNING THE APPLICATION

#### Requirements

- node 10.15.3+
- npm 6.9.0+
- MySQL 5.6+

#### development workflow

```
> git clone https://github.com/rkinabhi/postwitter.git
> cd postwitter
> npm install
```

#### running the server

1. Create an empty database with name **postwitter** in MySQL.
2. Go inside root directory of the project.
3. Set database credentials (username, password and host) for "**[development](https://github.com/rkinabhi/postwitter/blob/master/config/database_config.json#L2)**" in **[config/database_config.json](https://github.com/rkinabhi/postwitter/blob/master/config/database_config.json)**.
4. `> npm start`

#### running tests

1. Create an empty database with name **postwitter_test** in MySQL.
2. Go inside root directory of the project.
3. Set database credentials (username, password and host) for "**[test](https://github.com/rkinabhi/postwitter/blob/master/config/database_config.json#L10)**" in **[config/database_config.json](https://github.com/rkinabhi/postwitter/blob/master/config/database_config.json)**
4. `> npm test`

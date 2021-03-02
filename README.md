# texastoc-v2-react-redux

I am rewriting my poker league application from core Spring 3.x and JQuery mobile to Spring Boot and React/Redux.

This is the beginning of writing a new front end using React and Redux.

The following shows what I did step by step.

Each step can be found on the corresponding branch.

To see what was done on a branch compare the code to the previous branch.

# Profiles, Building and Running
The urls for the client and server are defined in the constants.js file. Here is what they are set to when deploying to production.

```
// Local non-tomcat
// export const CLIENT_URL = "http://localhost:3000";
// export const SERVER_URL = "http://localhost:8080";

// Local tomcat
// export const CLIENT_URL = "http://localhost:8080";
// export const SERVER_URL = "http://localhost:8080/server";

// Heroku
export const CLIENT_URL = "https://texastoc.herokuapp.com";
export const SERVER_URL = "https://texastoc-server.herokuapp.com";

// Prod
export const CLIENT_URL = "https://texastoc.com";
export const SERVER_URL = "https://texastoc.com/server";
```

### Maven Profile
The default profile is `heroku` and the production profile is `prod`.

To build the default profile
* `mvn clean package`

To build the prod profile
* `mvn -P prod clean package`

### Build and Run commands
Run the client locally by running
* `npm start`

Build the war to run locally deployed to installed tomcat
* `mvn -P local clean package`<br/>

Build the war to run locally on port 9090
* `mvn -P local-webapp-runner clean package`<br/>
And run it
* `java -jar target/dependency/webapp-runner.jar --port 9090 target/texastoc-v2-ui.war`

Build the war locally and deploy to Heroku
* `mvn clean heroku:deploy-war`<br/>
To tail the Heroku logs
* `heroku logs --app texastoc --tail`


### Deploying the prod war instruction
Build the war for prod
* `mvn -P prod clean package`

TODO the rest of the instructions to deploy to production

## Current Branch: 55-unlock-game-from-season
Unlock a game from the season summary and move to the game view.

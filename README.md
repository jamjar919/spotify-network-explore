# Spotify Network Explorer
Explore your Spotify playlists with a network view of your playlists over time.

## How do I get it running?
Quickstart:
 - `git clone https://github.com/jamjar919/spotify-network-explore.git`
 - `cd spotify-network-explore`
 - `yarn install`
 - `yarn run assemble server:start`

This compiles both the server and client side code, then runs the server at [http://localhost.com:80](http://localhost.com:80), which you can then open in your browser and go to.

### Ok, nice, but I'm developing, what else is useful?
 - `yarn run build` will run tests as well as build the server/client
 - `yarn run server:build` or `yarn run client:build` builds just the server or client. 
 - You can also use `yarn run server:build:dev` and `yarn run client:build:dev` to run both of these processes in watch mode, which will automatically recompile your code if files are changed. It's smart enough to not rebuild the server when you only change client code which is handy.
 - `yarn run test` runs tests, obviously
 
My workflow is to run `yarn run server:build:dev` and `yarn run client:build:dev` in seperate tabs and keep an eye on the output whilst I work.
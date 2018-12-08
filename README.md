# KiwiIRC -  Nickserv Plugin

This is a NickServ plugin for KiwiIRC 

Dependencies

node (https://nodejs.org/)
yarn (https://yarnpkg.com/)

Building the source

$ yarn
$ yarn build

The plugin will then be built into dist/plugin-nickserv.js

Just create a plugins folder in /static if you don't already have one
than add this plugin into that directory.

Finally, edit your config.json file like so:

    "plugins": [
      {"name": "nickserv", "url": "./static/plugins/plugin-nickserv.js"}
    ]
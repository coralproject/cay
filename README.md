# Cay

Cay, a community moderation tool (front-end)

## Quickstart

- make sure you have your other services set up and running [xenia](https://github.com/coralproject/xenia) [pillar](https://github.com/coralproject/pillar)
- `git clone git@github.com:CoralProject/cay.git && cd cay`
- `npm install`
- set up your `/config.json` file with the locations of your hosted services. A sample file is at `public/config.sample.json` and currently must be placed at the root of the hosting directory for Cay.
- `npm start`

You'll need to be running `v5.0.0` of node, we recommend using `nvm` to manage node installations.

The app is a series of React components compiled into modules with [webpack](http://webpack.github.io/).

This repo is for the front-end of the Coral ecosystem [outlined here](https://github.com/coralproject/reef/blob/master/ECOSYSTEM.md).

The basic idea is that the build process results in a `bundle.js` file containing all javascript and css. CSS cross-browser issues, ES6 transpilation, minification, etc, is all handled by webpack.

##### Folder structure

```
.
+-- .github
+-- assets               -> nginx config
+-- css
+-- dist                 -> built files
+-- fonts
+-- lang
+-- public               -> images and config
   config.json           -> environment variables and such
   data_config.json      -> filters and dimension defs
+-- src
|  +-- app
|    +-- layout
|    AppActions.js
|    AppReducer.js
|    MainReducer.js
     ... other page-level (stateful) components
|  +-- auth
|  +-- comments          -> any UI and redux for Comments
|  +-- components        -> re-usable generic UI components
|  +-- explorer          -> data visualization explorer domain
|  +-- filters           -> any UI and redux for Filters
|  +-- search            -> any UI and redux for Searches
|  +-- i18n              -> internationalization wrappers
|  +-- tags              -> any UI and redux for Tags
|  +-- users             -> any UI and redux for Users
index.js                 -> entry point for app
settings.js              -> colors for the app
store.js                 -> redux store

+-- test                 -> mirrors the src folder
```

#### Development

We welcome community contribution. If you're thinking about making more than a minor change, check in with the Coral team via Github issues to avoid unnecessary work for both parties.

Sequester all work in pull requests

  1. create a new branch with `git checkout -b your-fancy-branch-name`
  2. make a trivial change, and commit back to your branch with `git add ./your-changed-file.js` and `git commit -m "a commit message here"`
  3. push your changes to github with `git push origin your-fancy-branch-name`
  4. on github.com, you should see a button to create a pull request from your new branch
  5. There will be public code reviews before we merge any PRs into master

We will not accept commits or pushes to the `master` branch, as the latest version of master is automatically deployed. Any direct push to master will be reverted.

#### Deploying

Packaging for production involves building the js and css files with `npm run build`. This will nuke and re-populate the `/dist` folder. After these files are copied to the server, a valid `config.json` file must live in the root of the directory from which the front-end assets are served. There is a `config.sample.json` in the `/public` directory for your reference.

## TODO:
- how to internationalize (R2L languages)
- how to continue to make things accessible

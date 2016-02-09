# Cay

Cay, a community moderation tool (front-end)

## Getting started

- `git clone git@github.com:CoralProject/cay.git && cd cay`
- `npm install`
- `npm start`

You'll need to be running `v5.0.0` of node, we recommend using `nvm` to manage node installations.

The app is a series of React components compiled into modules with [webpack](http://webpack.github.io/).

This repo is for the front-end of the Coral ecosystem [outlined here](https://github.com/coralproject/reef/blob/master/ECOSYSTEM.md).

The basic idea is that the build process results in a `bundle.js` file containing all javascript and css. CSS cross-browser issues, ES6 transpilation, minification, etc, is all handled by webpack.

##### Folder structure

```
.
+-- public
+-- src
|  +-- actions           -> descriptions of action types for redux
|  +-- components        -> all of the non-stateful React components
|  +-- containers        -> stateful React components
|  +-- layout            -> non-stateful components, but control the major parts of the page
|  +-- reducers          -> redux reducers
|  +-- store             -> redux store
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

#### Code of conduct
Please be civil when discussing contributions to the Cay front end code and the Coral Project. If in doubt, please consult our [Code of Conduct](https://github.com/coralproject/reef/blob/master/CODE-OF-CONDUCT.md).

## TODO:
- how to internationalize (R2L languages)
- how to continue to make things accessible
- how to create a production build of bundle.js


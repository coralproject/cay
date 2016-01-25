# Cay

Cay, a community moderation tool (front-end)

## Getting started

- `git clone git@github.com:CoralProject/cay.git && cd cay`
- `npm install`
- `npm start`

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


#### Code of conduct
Please be civil when discussing contributions to the Cay front end code and the Coral Project. If in doubt, please consult our [Code of Conduct](https://github.com/coralproject/reef/blob/master/CODE-OF-CONDUCT.md).

## TODO:
- how to internationalize (R2L languages)
- how to continue to make things accessible
- how to create a production build of bundle.js


# Trust

Trust, a community moderation app for Coral Project
folder structure

## Getting started

- `git clone git@github.com:CoralProject/trust.git && cd trust`
- `npm install`
- `npm start`

The app is a series of React components compiled into modules with [webpack](http://webpack.github.io/).

This repo is for the front-end of the Coral ecosystem [outlined here](https://github.com/CoralProject/reef/tree/master/ecosystem)

The basic idea is that the build process results in a `bundle.js` file containing all javascript and css. CSS cross-browser issues, ES6 transpilation, minification, etc, is all handled by webpack.

##### Folder structure

```
.
+-- public
+-- src
|  +-- actions           -> descriptions of action types for redux
|  +-- components        -> all of the non-stateful React components
|  +-- containers        -> stateful React components
|  +-- lib               -> 3rd party vendor libraries
|  +-- reducers          -> redux reducers
|  +-- store             -> redux store
+-- test                 -> mirrors the src folder 
```


#### Code of conduct
Please be civil when discussing contributions to the Trust front end code and the Coral Project. If in doubt, please consult our [Code of Conduct](https://the-coral-project.gitbooks.io/coral-bible/content/codeofconduct.html)

## TODO:
- link to arch diagram
- how to internationalize (R2L languages)
- how to continue to make things accessible



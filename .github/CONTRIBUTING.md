# Contributing to Cay

Wow, you're the best! Thanks for taking the time to contribute, and even more thanks for reading this guide! :+1::heart_eyes::pizza::100:

#### Table of Contents

[How can I get started?](#how-to-get-started)
 * [Code of Conduct](#code-of-conduct)
 * [The Coral Ecosystem](#coral-ecosystem)

[How Can I Contribute?](#how-can-i-contribute)
 * [Reporting Bugs](#reporting-bugs)
 * [Suggesting Enhancements](#suggesting-enhancements)
 * [Your First Code Contribution](#your-first-code-contribution)
 * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
 * [Git Commit Messages](#git-commit-messages)
 * [JavaScript Styleguide](#javascript-styleguide)
 * [Specs Styleguide](#specs-styleguide)
 * [Documentation Styleguide](#documentation-styleguide)

## How to get started

### Code of conduct
Please be civil when discussing contributions to the Cay front end code and the Coral Project. If in doubt, please consult our [Code of Conduct](https://github.com/coralproject/reef/blob/master/CODE-OF-CONDUCT.md).

### Coral Ecosystem
The Coral project consists of several repos, and a good overview has been collected in the [reef](https://github.com/coralproject/reef) to show you how all the pieces fit together.

## How can I contribute?

### Reporting Bugs
If you find a bug with Cay, please take note of what browser it happened in and the steps you took to reproduce it. Once you have all that in order, head over to [the issues page](https://github.com/coralproject/cay/issues) and create a new issue. We have GitHub issue temlates set up, so use those to the best of your ability. Thanks for taking the time to help the community out!

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/).

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Cay which the suggestion is related to. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on OSX and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to publishers.

### Your first code contribution

If you just want to contribute, [the issues page](https://github.com/coralproject/cay/issues) is a great place to get started. Let us know what you're working on, and we'll be more than happy to chat with you about the project.

### Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [JavaScript](#javascript-styleguide) styleguide.
* Document new code based on the
  [Documentation Styleguide](#documentation-styleguide)
* End files with a newline.
* Place imports in the following order:
    * external packages (such as `lodash`)
    * Local Modules (using relative paths)
* Place component properties in the following order:
    * `constructor`
    * any static properties
    * React component lifecycle methods ()`componentWillUpdate`, etc.)
    * Instance methods and properties
    * `render` is always latest
    * Radium style objects should generally go at the bottom
* Using a plain `return` when returning explicitly at the end of a function.
    * Not `return null`, `return undefined`, `null`, or `undefined`

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* When only changing documentation, include `[ci skip]` in the commit description
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on Safari
    * :checkered_flag: `:checkered_flag:` when fixing something on Internet Explorer
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### JavaScript Styleguide
We're trying to stick to the [AirBnB Styleguide](https://github.com/airbnb/javascript) since we use React on this project. We don't have every facet implemented, but getting [eslint](http://eslint.org/) set up and checking out the [.eslintrc](../.eslintrc) for this project is a great place to start. PRs with egregious linting errors will need to be fixed before they are accepted.

### Specs Styleguide
To come as we write more tests.

### Documentation Styleguide

* Use [AtomDoc](https://github.com/atom/atomdoc).
* Use [Markdown](https://daringfireball.net/projects/markdown).
* Reference methods and classes in markdown with the custom `{}` notation:
    * Reference classes with `{ClassName}`
    * Reference instance methods with `{ClassName::methodName}`
    * Reference class methods with `{ClassName.methodName}`

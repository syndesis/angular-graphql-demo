Angular GraphQL Demo
============
This is a project created for a demonstration of using GraphQL with Angular.

Getting started
----------------------------------

The Powerpoint for the demo is located [here](GraphQL%20Demo.pptx)

#### Installation
*Prerequisites*:

Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).
*Note*: Even though it's optional, we recommend you to use [yarn](https://yarnpkg.com/) instead of `npm install` for installing the dependencies.

This demo uses [postgraphile](https://www.graphile.org/postgraphile/) for the backend API.
which requires a [postgres](https://www.postgresql.org/download/) database

```bash
git clone https://github.com/syndesis/angular-graphql-demo
cd angular-graphql-demo

# install the project's dependencies
yarn # or run "npm install"

# create a postgres database
createdb demodb
psql demodb < create-roles.sql
psql demodb < demo.sql

# Edit .postgraphilerc.js and configure appendPlugins and connection settings as appropriate

# starts the postgraphile API service
yarn api

# starts the application in dev mode and watches your files for livereload
yarn start-dev
```


## Documentation

For documentation on the Apollo Angular client, [see here](https://www.apollographql.com/docs/angular/)

For documentation on the Clarity Design System, including a list of components and example usage, see [their website](https://vmware.github.io/clarity).

#### Directory structure
```
.
├── README.md

├── karma.conf.js              <- configuration of the test runner
├── package.json               <- dependencies of the project
├── protractor.config.js       <- e2e tests configuration
├── src/                       <- source code of the application
│   ├── app/
│   │   └── component/
│   │       └── <component>.component.html
│   │       └── <component>.component.scss
│   │       └── <component>.component.spec.ts
│   │       └── <component>.component.ts
│   │   └── app.component.html
│   │   └── app.component.scss
│   │   └── app.component.ts
│   │   └── app.e2e-spec.js    <- sample e2e spec file
│   │   └── app.module.ts
│   │   └── app.routing.ts
│   │   └── main.ts            <- boostrap file for the angular app
│   └── index.html
├── angular-cli.json           <- configuration of the angular-cli
├── tsconfig.json              <- configuration of the typescript project
├── tslint.json                <- sample configuration file for tslint
└── yarn.lock
```

## License

This demo project is licensed under the MIT license.

## Feedback

If you find a bug or want to request a new feature, please open a [GitHub issue](https://github.com/syndesis/angular-graphql-demo/issues).

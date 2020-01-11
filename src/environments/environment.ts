// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAkYs84iyo-mOQtX1R8uKOpQ2ORd5AabPo",
    authDomain: "draugsapp.firebaseapp.com",
    databaseURL: "https://draugsapp.firebaseio.com",
    projectId: "draugsapp",
    storageBucket: "draugsapp.appspot.com",
    messagingSenderId: "1038379904566",
    appId: "1:1038379904566:web:325ac3ed74462f509ab297",
    measurementId: "G-D8NRGEK2YW",
    gs: '',
  },
  algolia: {
    ALGOLIA_ID: '',
    ALGOLIA_SEARCH_KEY: '',
    ALGOLIA_INDEX_NAME: '',
  },
  version: "0.1"
};

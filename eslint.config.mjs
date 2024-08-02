{
  "name": "testes-e2e-com-cypress-v2",
  "version": "1.0.0",
  "description": "👋 Seja bem vindo(a)!",
  "main": "cypress.config.js",
  "scripts": {
    "lint": "eslint cypress/**/*.js && eslint cypress.config.js",
    "lint:fix": "eslint cypress/**/*.js --fix && eslint cypress.config.js --fix",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@eslint/js": "^9.8.0",
    "@faker-js/faker": "^8.0.2",
    "cypress": "^13.13.2",
    "cypress-mailosaur": "^2.13.0",
    "eslint": "8.43.0",
    "eslint-plugin-cypress": "^2.13.3",
    "globals": "^15.9.0"
  },
  "dependencies": {
    "testes-e2e-com-cypress-v2": "file:"
  }
}

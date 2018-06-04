# Planner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

to fix blurry font in VS Code in Win7 add to target command in shortcut: --disable-gpu --enable-use-zoom-for-dsf
refer: https://wpdevkvk.wordpress.com/2016/11/06/fix-text-becomes-blurry-when-vs-code-application-loses-focus-issue-on-windows/

##enable SSL

1) self-signed (DEV mode only)
1.1) run shell:
openssl genrsa -out localhost.key 2048
openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost

1.2) copy to ssl folder

1.3) instead ng serve run npm start

1.4) to disable certificate validation for localhost run in chrome address bar: 
chrome://flags/#allow-insecure-localhost

1.5) to setup auth0 callback go to: https://manage.auth0.com/#/applications -> Planner -> Allowed Callback URLs -> change to https

1.6) config.dev.json:
    change enableHttps = true

1.7) in prod use letsencrypt/certbot following this article: https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625

##config node to use luxoft-root-ca

1.1) goto http://cert.luxoft.com, follow instructions to export luxoft-root-ca as Base64 to project folder
1.2) export NODE-EXTRA-CA-CERTS "<your cert file name>.CER"

##firebase
1.1) firebase login --interactive 
1.2) firebase deploy





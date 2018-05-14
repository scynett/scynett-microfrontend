# Angular and Microservices: The [ScynettGhana](http://scynett-ghana.com) approach to microservices
### How to get the examples running locally
```bash
git clone git@github.com:PlaceMe-SAS/single-spa-angular-cli-examples.git
cd single-spa-angular-cli-examples
npm install -g @angular/cli
npm install
npm run ng:build
npm start
```

<!-- ## How to perform CI tasks
```bash
npm run ng:lint
npm run ng:test
``` -->

## Add an Angular CLI apps
### Create Angular CLI standard app
```bash
cd apps
ng new <app-name> --prefix=<app-name>
cd app1
ng serve --port=4202
```

### Configure your Angular Cli App to be loaded by single spa
```js
// microapps/<app-name>/src/main.ts

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformSingleSpa } from 'single-spa-angular-cli';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformSingleSpa.mount('app1').subscribe(({ props, attachUnmount }) => {
  platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
    attachUnmount(module);
    // Do something with props if you want
    // Ex : module.instance.setSomething(...)
  });
});
```

### Configure your angular cli applications
```js
// portal/microapps.config.json

[
    {
        "name": "menu",
        "selector": "menu-root",
        "baseHref": "/menu",
        "matchRoute": "/**"
    },
    {
        "name": "home",
        "selector": "home-root",
        "baseHref": "/home",
        "matchRoute": "/home/",
        "isDefaultApp": true
    }
    {
        "name": "<app-name>",
        "selector": "<app-name>-root",
        "baseHref": "/<app-name>",
        "matchRoute": "/<app-name>/"
    },
    ...
]
```


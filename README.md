# The [ScynettGhana](http://scynett-ghana.com) approach to microfrontend and Angular

### How to get the examples running locally
```bash
git clone https://gitlab.com/eddyamewu/scynett-microfrontend.git
cd scynett-mircofrontend
npm install -g @angular/cli yarn
yarn
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
cd microapps
ng new <app-name> --prefix=<app-name>
cd <app-name>
ng serve --port=4202
```

### Configure your Angular-Cli App to be loaded by single spa
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

platformSingleSpa.mount('<app-name>').subscribe(({ props, attachUnmount }) => {
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

Thanks to [PlaceMe-SAS](https://github.com/PlaceMe-SAS/single-spa-angular-cli-examples) for making this possible.


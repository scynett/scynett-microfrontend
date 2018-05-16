# The [ScynettGhana](http://scynett-ghana.com) approach to microfrontend and Angular

### How to get the examples running locally
```bash
git clone https://gitlab.com/eddyamewu/scynett-microfrontend.git
cd scynett-mircofrontend
npm install -g @angular/cli@1.7.4 yarn
yarn
npm run ng:build
npm start
```

<!-- ## How to perform CI tasks
```bash
npm run ng:lint
npm run ng:test
``` -->
___

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

### Remove Zone.js from the cli app bundle
```js
// <app-name>/src/polyfills.ts

// Comment zone.js, it is globaly imported by the portal
// import 'zone.js/dist/zone';  // Included with Angular CLI.
```

### Add Zone.js only for the cli app
```html
<!-- <app-name>/src/index.html -->

  <app-name-root></app-anme-root>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.8.19/zone.js"></script>
</body>
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
<!-- Thanks to [PlaceMe-SAS](https://github.com/PlaceMe-SAS/single-spa-angular-cli-examples) for making this possible. -->
Thanks to [Single-Spa-Cli](https://www.npmjs.com/package/single-spa-angular-cli) for making this possible.


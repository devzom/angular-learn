# Test: Angular car rental page

author: Jakub Zomerfeld / @devzom

# TO DO

- [x] prepare basic pages with navigation and specific routes:
  - homepage,
  - vehicles list page,
  - vehicle details page
- [x] use routerOutlet and router table
  - [x] handle navbar routerActiveLink
- [x] handle 404 (as a page)
- [x] mock vehicles data
- [x] create a few reusable components
- [x] shared services
  - calculator.service
  - pricing.service
  - checkout.service
  - categories.service
  - vehicle-list.service
- [x] handle subscribe / observer for reactive data
- [x] mock pick a vehicle and checkout process
- [x] reactive form / data in checkout process
- [x] filtered vehicles list
  - [x] mock filters data
  - [x] use of router queryParams/queryParamsMap
  - [x] handle queryParams change on.subscribe() and ngOnInit
  - [x] handle missing query params
- [x] use API to fetch data -> vehicles makes
  - [x] trigger API cal by btn.click() to fetch categories visible in `<aside/>`
  - [ ] mock data form API
- [ ] feature modules / lazy loading
  - [x] split rental/vehicles view/components/routing into **vehicle-module**
  - [x] main module contains homepage
  - [ ] checkout module

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

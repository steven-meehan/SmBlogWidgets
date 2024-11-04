# SmBlogWidgets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Projects

This workspace includes three projects: `QuotesWidget`, `ProgressWidget`, and `NewsAlert`.

### QuotesWidget

This will display a number of quotes from its backing api. There are five variables that can be modified to adjust how the component is rendered. Make any changes you want to the `app-config.ts` file and then build a new deploy package.

#### Configurations

- `numberOfQuotesToDisplay`: default value is 4 and is used to determine the number of quotes retrieved.
- `numberOfCharactersToDisplay`: default value is 75 and is used to determine the number of characters to render for each quote when displaying the full list of quotes.
- `quoteApiBaseUrl`: is used to configure the widget to point to the backing api.
- `isQuotePollingEnabled`: default value is false and is used to enable polling of the quotes.
- `quotePollingIntervalInSeconds`: default value is 300000 and is used to establish the polling interval.

#### Use of widget

Add the following to the page or page template:

```html
<script src="{URL to File}/runtime.{hash}.js"></script>
<script src="{URL to File}/polyfills.{hash}.js"></script>
<script src="{URL to File}/main.{hash}.js"></script>

<quote-list-component></quote-list-component>
```

## ProgressWidget

This will display all works in progress its backing api. There are three variables that can be modified to adjust how the component is rendered. Make any changes you want to the `app-config.ts` file and then build a new deploy package.

#### Configurations

- `progressBarApiBaseUrl`: is used to configure the widget to point to the backing api.
- `progressBarColor`: default value for the bootstrap progress bar is "success" and is used to color the fill for the bar.
- `progressBarHeading`: default value is "What I'm Working On..." and is as the widget's heading.

#### Use of widget

Add the following to the page or page template:

```html
<script src="{URL to File}/runtime.{hash}.js"></script>
<script src="{URL to File}/polyfills.{hash}.js"></script>
<script src="{URL to File}/main.{hash}.js"></script>

<works-in-progress></works-in-progress>
```

## NewsAlert

This will retrieve a configuration file and render the first alert valid and active alert found. The resulting modal will be displayed on the first page of every session and the user will have to click the close button in order to dismiss it.

When running, the widget will query the Sessions Storage for a specific value. If it is found the widget will stop and prevent the web request for the configuration file. However, when the value is not found the application will retrieve the config file in order to determine if a news alert is available for display.

#### Configurations

- `configurationBaseUrl`: is used to configure the location for the json file used to power the widget.
- `setDoNotDhowFlag`: sets the behavior for setting the `DoNotDhowFlag` session value. If disabled the modal will with every page reload (highly useful for development).

#### Config File

The configuration file is simple an array of `JSON` objects with the following structure:

```json
[
    {
        "mainBlurb" : "Contains the main blurb for the alert (Required)",
        "title" : "Title for the alert (Required)",
        "active" : true, //defines if the alert is active (Required)
        "validUntil" : "1/4/2055", //defines when the alert should stop being shown (Required)
        "imageUrl" : "used to define the url for an included image (Optional)",
        "imageUrlAlt": "Used to define the Alt text for an img tag (Optional)",
        "imageUrlTitle": "Used to define the Title text for an img tag (Optional)",
        "altBlurb" : "Contains the second blurb for the alert (Optional)",
        "url1" : "A url related to the alert (Optional)",
        "url1Title": "Title for URL1 (Optional)",
        "url2" : "A url related to the alert (Optional)",
        "url2Title": "Title for URL2 (Optional)",
        "url3" : "A url related to the alert (Optional)",
        "url3Title": "Title for URL3 (Optional)",
    },
    .
    .
    .
]
```

#### Use of widget

Add the following to the page or page template:

```html
<link rel="stylesheet" href="{URL to File}/styles-{hash}.css" aria-hidden="true">
<script src="{URL to File}/polyfills-{hash}.js"></script>
<script src="{URL to File}/main-{hash}.js"></script>

<news-banner-alert></news-banner-alert>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To run a specific project use the following commands:
- For the News Alert Widget: ng serve NewsAlert
- For the Progress Bar Widget: ng serve ProgressWidget
- For the Quotes Widget: ng serve QuotesWidget

To run a specific project on a specific port use the `--port` flag `ng serve {projectName} --port {portNumber}`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--configuration production` flag for a production build.

To build a specific project use the following commands:
- For the News Alert Widget: ng build NewsAlert --configuration production
- For the Progress Bar Widget: ng build ProgressWidget --configuration production
- For the Quotes Widget: ng build QuotesWidget --configuration production

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

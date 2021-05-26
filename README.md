# My Gulp Configuration

This is a basic gulp configuration, which is perfectly suitable for landing page development and can be easily tweaked for any needs. It was my core configuration that I used for development up until I have built my [webpack configuration](https://github.com/dimianni/my-webpack-configuration).

## To clone the repo, run the following command:

```bash
git clone https://github.com/dimianni/gulp_config.git
```

## Installation

First, make sure you have installed [NodeJS](https://nodejs.org/en/) globally on computer.

Then, install [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start) globally with this command:

```bash
   npm i --global gulp-cli
```

After having installed Node and Gulp, and cloning the repo, run the following command in the folder's terminal:

```bash
  npm i 
```

node_modules folder and all the dependencies will be downloaded.

## Usage

There are only two commands.

This will start a development server:
```bash
gulp 
```

This will create a production build:
```bash
gulp build
```

## Features

Some features of this configuration:

 - Has a server which watches for changes in HTML, SCSS, and JavaScript. It recompiles the files every time so that you do not have to reload the page while developing.
 - Concatenates all JavaScript files into one minified file on build.
 - Concatenates all CSS files into one minified file on build.
 - Compresses images on build. WebP versions of JPG and PNG images are created.

## Contributing

Pull requests are welcome. Feel free to fix any issues, and suggest any other features that this configuration could support.

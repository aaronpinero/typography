'use strict';

const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'Tyfy Documentation Pattern Library');
fractal.set('project.version', 'v2.0');
fractal.set('project.author', 'Aaron Pinero');

fractal.components.set('path', __dirname + '/docs/resources/scss/components');
fractal.components.set('default.preview', '@preview');

fractal.docs.set('path', __dirname + '/docs/resources/scss/guide');
fractal.web.set('static.path', __dirname + '/docs/resources');
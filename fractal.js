'use strict';

const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'Tyfy Documentation Pattern Library');
fractal.set('project.version', 'v1.5');
fractal.set('project.author', 'Aaron Pinero');

fractal.components.set('path', __dirname + '/docs/patterns/components');
fractal.docs.set('path', __dirname + '/docs/patterns/guide');
fractal.web.set('static.path', __dirname + '/docs/resources');
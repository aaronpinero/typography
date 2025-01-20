'use strict';

const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'Tyfy Documentation Pattern Library');
fractal.set('project.version', 'v3.0');
fractal.set('project.author', 'Aaron Pinero');

fractal.components.set('path', __dirname + '/new/docs/resources/components');
fractal.components.set('default.preview', '@preview');

fractal.docs.set('path', __dirname + '/new/docs/resources/guide');
fractal.web.set('static.path', __dirname + '/new');
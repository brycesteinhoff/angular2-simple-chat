import 'babel-polyfill';
// reflect-metadata and zone.js constitute angular2-polyfills?
import 'reflect-metadata';
import 'zone.js';
import { Rx } from 'rxjs/Rx';
import { enableProdMode } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppComponent } from './components/app';

document.addEventListener('DOMContentLoaded', function()
{

	enableProdMode();
	
	bootstrap(
		AppComponent,
		[ROUTER_PROVIDERS, HTTP_PROVIDERS]
	).catch(err => console.error(err));

});
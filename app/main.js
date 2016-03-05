import 'babel-polyfill';
import { Rx } from 'rxjs/Rx';
import { enableProdMode } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';

import { AppComponent } from './components/app';

document.addEventListener('DOMContentLoaded', function()
{

	// enableProdMode();
	
	bootstrap(
		AppComponent,
		[ROUTER_PROVIDERS]
	).catch(err => console.error(err));

});
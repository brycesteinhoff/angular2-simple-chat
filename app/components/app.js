import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { WelcomeComponent } from './welcome';
import { ChatComponent } from './chat';

// Root app component

@Component({
	selector: 'app',
	template: `
		<h1>App Component</h1>
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	// Welcome
	{
		path: 			'/',
		name: 			'Welcome',
		component: 		WelcomeComponent,
		useAsDefault: 	true
	},

	// Chat
	{
		path: 			'/chat/:room',
		name: 			'Chat',
		component: 		ChatComponent
	}
])
export class AppComponent {}
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { JwtService } from '../services/jwt';
import { AuthService } from '../services/auth';
import { HeadersService } from '../services/headers';

import { WelcomeComponent } from './welcome';
import { ChatSelectComponent } from './chat-select';
import { ChatRoomComponent } from './chat-room';

import { NavbarComponent } from './navbar';

import '../sass/style.scss'; // Common styles

// Root app component

@Component({
	selector: 'app',
	template: `
		<navbar></navbar>
		
		<div class="container container-narrow">
			<router-outlet></router-outlet>
		</div> <!-- /.container -->
	`,
	directives: [ROUTER_DIRECTIVES, NavbarComponent],
	providers: [JwtService, AuthService, HeadersService]
})
@RouteConfig([
	// Welcome
	{
		path: 			'/',
		name: 			'Welcome',
		component: 		WelcomeComponent,
		useAsDefault: 	true
	},

	// Chat room select
	{
		path: 			'/chat',
		name: 			'ChatSelect',
		component: 		ChatSelectComponent
	},

	// Chat room
	{
		path: 			'/chat/:room',
		name: 			'ChatRoom',
		component: 		ChatRoomComponent
	}
])
export class AppComponent {}
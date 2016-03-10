import { Component } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { AuthService } from '../services/auth';

import 'bootstrap-sass/assets/javascripts/bootstrap/transition';
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';

// Navbar component

@Component({
	selector: 'navbar',

	template: `
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button *ngIf="loggedIn" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
		  			</button>
		  			
		  			<a class="navbar-brand" [routerLink]="['Welcome']">Angular 2 Simple Chat</a>
				</div> <!-- /.navbar-header -->
		
				<div *ngIf="loggedIn" id="navbar" class="collapse navbar-collapse">
		  			<ul class="nav navbar-nav navbar-right">
						<li><a [routerLink]="['ChatSelect']">Join Room</a></li>
						<li><a (click)="logout()">Logout</a></li>
		  			</ul>
				</div><!--/.nav-collapse -->
	  		</div> <!-- /.container -->
		</nav>
	`,
	directives: [ROUTER_DIRECTIVES, NgIf]
})
export class NavbarComponent {

	constructor(_authService: AuthService)
	{
		this._authService = _authService;

		this.loggedIn = true; // TO-DO: Update this when login/logout changes
	}

	ngOnInit()
	{
	}

	logout()
	{
		this._authService.logout();
	}

}
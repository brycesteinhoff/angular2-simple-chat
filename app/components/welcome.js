import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { AuthService } from '../services/auth';

// Welcome component

@Component({
	template: `
		<h2>Welcome</h2>
		<form>
			<div class="form-group">
				<label for="nick">Nickname:</label>
				<input type="text" class="form-control" id="nick" [(ngModel)]="nick" />
			</div> <!-- .form-group -->

			<button type="submit" class="btn btn-default" (click)="guestSignIn()">Sign in</button>
		</form>
	`,
	providers: [AuthService]
})
export class WelcomeComponent {

	constructor(_router: Router, _authService: AuthService) {
		this._router = _router;
		this._authService = _authService;
	}

	ngOnInit()
	{
		// Check if user is already authenticated
		// if so redirect to chat select
		// this._router.navigate(['ChatSelect']);
	}

	guestSignIn()
	{
		this._authService.guestSignIn(this.nick)
		.subscribe(
			res => {
				this._router.navigate(['ChatSelect']);
			},
			error => {
				// Show error to user
			}
		);
	}

}
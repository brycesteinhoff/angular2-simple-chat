import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { tokenPresent } from '../services/jwt';
import { AuthService } from '../services/auth';

// Welcome component

@Component({
	template: `
		<h2 class="page-header">Welcome</h2>
		<form>
			<div class="form-group">
				<label for="nick">Choose a nickname:</label>
				<input type="text" class="form-control" id="nick" [(ngModel)]="nick" />
			</div> <!-- .form-group -->

			<button type="submit" class="btn btn-default pull-right" (click)="guestSignIn()">Sign in</button>
		</form>
	`
})
export class WelcomeComponent {

	constructor(_router: Router, _authService: AuthService)
	{
		this._router = _router;

		this._authService = _authService;

		this.nick = '';
	}

	ngOnInit()
	{
		// TO-DO: Maybe move to a decorator?
		if (tokenPresent()) {
			this._router.navigate(['ChatSelect']);
		}
	}

	guestSignIn()
	{
		if (!this.nick.trim()) {
			return false;
		}

		this._authService.guestSignIn(this.nick)
		.subscribe(
			res => {
				this._router.navigate(['ChatSelect']);
			},
			error => {
				// TO-DO: Implement better flash messaging service
				alert(error.error);

				this.nick = '';
			}
		);
	}

}
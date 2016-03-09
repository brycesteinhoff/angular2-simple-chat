import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

// Chat select component

@Component({
	template: `
		<h2>Chat Select</h2>
		<form>
			<div class="form-group">
				<label for="room">Room:</label>
				<input type="text" class="form-control" id="room" [(ngModel)]="room" />
			</div> <!-- .form-group -->

			<button type="submit" class="btn btn-default" (click)="joinRoom()">Join</button>
		</form>
	`
})
export class ChatSelectComponent {

	constructor(_router: Router) {
		this._router = _router;
	}

	ngOnInit()
	{
		// Auth check and redirect to welcome
		// Decorator???

		// Not to self:
		// Fetch in this lifecycle hook
		// not in constructor
	}

	joinRoom()
	{
		let room = this.room.trim();

		if (room) {
			this._router.navigate(['ChatRoom', { room: room }]);
		}
	}

}
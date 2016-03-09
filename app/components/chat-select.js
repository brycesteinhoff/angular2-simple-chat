import slug from 'slug';
import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Http } from 'angular2/http';

import { tokenPresent } from '../services/jwt';
import { HeadersService } from '../services/headers';

// Chat select component

@Component({
	template: `
		<h2>Chat Select</h2>
		<div class="rooms-recent" [innerHTML]="recentRooms"></div>
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

	constructor(
		_router: Router,
		_http: Http,
		_headersService: HeadersService
	) {
		this._http = _http;

		this._router = _router;

		this._headersService = _headersService;

		this.endpoints = {
			'recent': '/api/rooms/recent'
		};
	}

	ngOnInit()
	{
		// Maybe move to a decorator?
		if (!tokenPresent()) {
			this._router.navigate(['Welcome']);
			return false;
		}

		// Get recently active rooms
		this.getRecentlyActive();
	}

	joinRoom()
	{
		// Slugify the submitted room name
		let room = slug(this.room.trim());

		if (room) {
			this._router.navigate(['ChatRoom', { room: room }]);
		} else {
			this.room = '';
		}
	}

	getRecentlyActive()
	{
		this._http.get(this.endpoints.recent, { headers: this._headersService.get() })
		.map(res => res.json())
		.subscribe(
			res => {
				this.recentRooms = '';

				res.forEach((element) =>
				{
					this.recentRooms = this.recentRooms + ' <a href="/chat/' + element + '">' + element + '</a>';
				});
			},
			error => {
				console.error('Error getting recently active rooms', error);
			}
		);
	}

}
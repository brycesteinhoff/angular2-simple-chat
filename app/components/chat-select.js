import slug from 'slug';
import { Component } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Http } from 'angular2/http';

import { tokenPresent } from '../services/jwt';
import { HeadersService } from '../services/headers';

// Chat select component

@Component({
	template: `
		<h2 class="page-header">Join a Chat Room</h2>

		<div *ngIf="recentRooms.length">
			<h3 class="page-header">Choose a recently active room</h3>

			<div class="chat-rooms-recent list-group">
				<a *ngFor="#room of recentRooms" [routerLink]="['ChatRoom', { room: room }]" class="list-group-item">{{ room }}</a>
			</div>

			<h3 class="page-header">Or start your own!</h3>
		</div>

		<form>
			<div class="form-group">
				<label for="room">Type a room name:</label>
				<input type="text" class="form-control" id="room" [(ngModel)]="room" />
			</div> <!-- .form-group -->

			<button type="submit" class="btn btn-default pull-right" (click)="joinRoom()">Join</button>
		</form>
	`,
	directives: [ROUTER_DIRECTIVES, NgIf]
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

		this.recentRooms = [];

		this.room = '';
	}

	ngOnInit()
	{
		// TO-DO: Maybe move to a decorator?
		if (!tokenPresent()) {
			this._router.navigate(['Welcome']);
			return false;
		}

		// Get recently active rooms
		this.getRecentlyActive();
	}

	joinRoom()
	{
		let room = this.room;

		room = room.trim();

		if (!room) {
			this.room = '';
			return false;
		}
		
		room = slug(room);

		this._router.navigate(['ChatRoom', { room: room }]);
	}

	getRecentlyActive()
	{
		this._http.get(this.endpoints.recent, { headers: this._headersService.get() })
		.map(res => res.json())
		.subscribe(
			res => {
				res.forEach((roomName) =>
				{
					this.recentRooms.push(roomName);
				});
			},
			error => {
				console.error('Error getting recently active rooms', error);
			}
		);
	}

}
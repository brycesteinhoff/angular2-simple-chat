import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import io from 'socket.io-client';

import { JwtService } from '../services/jwt';

@Injectable()
export class WebsocketService {

	constructor(_jwtService: JwtService)
	{
		this.io = undefined;

		this._jwtService = _jwtService;
	}

	connect()
	{
		return Observable.create(observer =>
		{
			let jwt = this._jwtService.getToken();

			// Pre-check JWT
			if (!jwt) {
				console.error('Authorization token missing');

				observer.error({
					success: false,
					error: 'Authorization token missing'
				});
			}

			this.io = io.connect('', {
				query: 'token=' + jwt
			});

			this.io.on('connect', () => {
				observer.next({
					success: true
				});
			});

			this.io.on('error', () => {
				console.error('Error connecting to websocket');

				observer.error({
					success: false,
					error: 'Error connecting to websocket'
				})
			});
		});
	}

	emit(eventName: string, data, room?: string)
	{
		let io = this.io;

		if (room) {
			io = io.to(room);
		}

		io.emit(eventName, data);
	}

	on(eventName: string, callback)
	{
		this.io.on(eventName, callback);
	}

}
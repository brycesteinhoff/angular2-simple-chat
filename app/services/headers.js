import { Injectable } from 'angular2/core';
import { Headers } from 'angular2/http';

import { JwtService } from '../services/jwt';

@Injectable()
export class HeadersService {

	constructor(_jwtService: JwtService)
	{
		this._jwtService = _jwtService;
	}

	get()
	{
		let jwt = this._jwtService.getToken();

		let headers = new Headers();

		// JSON both directions
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		// If jwt is available, include authorization header
		if (jwt) {
			headers.append('Authorization', 'Bearer ' + jwt);
		}

		return headers;
	}

}
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Router } from 'angular2/router';
import { Observable } from 'rxjs/Observable';

import { JwtService } from './jwt';
import { HeadersService } from './headers';

@Injectable()
export class AuthService {

	constructor(http: Http, _router: Router, _jwtService: JwtService, _headersService: HeadersService)
	{
		this.http = http;

		this._router = _router;

		this._jwtService = _jwtService;

		this._headersService = _headersService;

		this.endpoints = {
			'login': '/api/auth/login',
			'logout': '/api/auth/logout'
		};
	}

	guestSignIn(nick: string)
	{
		let body = JSON.stringify({
			nick: nick,
			guest: true
		});

		return this._attemptLogin(body);
	}

	registeredSignIn(nick: string, password: string)
	{
		let body = JSON.stringify({
			nick: nick,
			password: password,
			guest: false
		});

		return this._attemptLogin(body);
	}

	logout()
	{
		// Just destroying token on client for now
		this._jwtService.removeToken();

		this._router.navigate(['Welcome']);
		
		// return Observable.create(observer =>
		// {
		// 	this.http.get(this.endpoints.logout, { headers: this._headersService.get() })
		// 	.map(res => res.json())
		// 	.subscribe(
		// 		res => {
		// 			observer.next({
		// 				success: true
		// 			});
		// 		},
		// 		error => {
		// 			observer.error({
		// 				success: false,
		// 				error: error.text()
		// 			});
		// 		},
		// 		() => {
		// 			observer.complete();
		// 		}
		// 	);
		// });
	}

	_attemptLogin(requestBody)
	{
		return Observable.create(observer =>
		{
			this.http.post(this.endpoints.login, requestBody, { headers: this._headersService.get() })
			.map(res => res.json())
			.subscribe(
				res => {
					this._jwtService.setToken(res.token);

					observer.next({
						success: true
					})
				},
				error => {
					observer.error({
						success: false,
						error: error.text()
					});
				},
				() => {
					observer.complete();
				}
			);
		});
	}

}
import { Injectable } from 'angular2/core';

@Injectable()
export class JwtService {

	constructor() {
		this.jwtKey = 'jwt';
	}

	getToken()
	{
		return localStorage.getItem(this.jwtKey);
	}

	setToken(token)
	{
		localStorage.setItem(this.jwtKey, token);
	}

	removeToken()
	{
		localStorage.removeItem(this.jwtKey);
	}

}
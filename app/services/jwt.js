import { Injectable } from 'angular2/core';

let jwtKey = 'jwt';

@Injectable()
export class JwtService {

	constructor() {}

	getToken()
	{
		return localStorage.getItem(jwtKey);
	}

	setToken(token)
	{
		localStorage.setItem(jwtKey, token);
	}

	removeToken()
	{
		localStorage.removeItem(jwtKey);
	}

}

export function tokenPresent() {
	return (localStorage.getItem('jwt')) ? true : false;
}
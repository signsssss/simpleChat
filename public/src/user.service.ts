import {User} from './user';
import {USERS} from './mock-users';

import {Injectable} from 'angular2/core';
import {Headers, RequestOptions, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
	constructor (private http: Http) {}

	getUsers() {
		return Promise.resolve(USERS);
	}

	getUsersSlowly() {
		return new Promise<User[]>(resolve =>
			setTimeout(()=>resolve(USERS), 2000)
		);
	}

	getUser(id: number) {
		return Promise.resolve(USERS).then(
			users => users.filter(user => user.id === id)[0]
		);
	}

	login(userId: string, userPw: string) {
		let user = {};
		user.id = userId;
		user.pw = userPw;

		let body = JSON.stringify(user);
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});

		return this.http.post('login', body, options)
			.map(res => console.log(res.json().data))
			.catch(this.handleError)
	}
	
	private handleError (error: any) {
		console.error(error);
		return Promise.reject(error.message || error.json().error || 'Server error');
	}
}

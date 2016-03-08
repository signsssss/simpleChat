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

	getUser(userId: string) {
		let body = JSON.stringify({userId});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.get('rooms')
			.map(res => res.json())
			.catch(this.handleError);
	}

	login(userId: string, userPw: string) {
		let body = JSON.stringify({userId, userPw});
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});
		
		return this.http.post('login', body, options)
			.map(res => res.json())
			.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log(error);
		return Observable.throw (error.json().error || 'Server error');
	}
}

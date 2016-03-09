import {User} from './user';
import {USERS} from './mock-users';

import {Injectable} from 'angular2/core';
import {Headers, RequestOptions, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
	constructor (private http: Http) {}

	login(userId: string, userPw: string) {
		let body = JSON.stringify({userId, userPw});
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});

		return this.http.post('login', body, options)
			.map(res => res.json())
			.catch(this.handleError);
	}

	join(userId: string, userPw: string) {
		let body = JSON.stringify({userId, userPw});
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});

		return this.http.post('join', body, options)
			.map(res => res.json())
			.catch(this.handleError);
	}

	getRooms(userId: string) {
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});

		return this.http.get('rooms/'+userId)
			.map(res => res.json() )
			.catch(this.handleError);
	}

	addRoom(userId: string, friendId: string) {
		let body = JSON.stringify({userId, friendId});
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});

		return this.http.post('rooms', body, options)
			.map(res => res.json())
			.catch(this.handleError);
	}

	joinChatting(roomId: string) {
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});

		return this.http.get('room/'+roomId)
			.map(res => res.json() )
			.catch(this.handleError);
	}

	getUser(userId: string) {
		let body = JSON.stringify({userId});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.get('rooms')
			.map(res => res.json())
			.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log(error);
		return Observable.throw (error.json().error || 'Server error');
	}
}

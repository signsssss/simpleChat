import {User} from './user';
import {USERS} from './mock-users';

import {Injectable} from 'angular2/core';
import {Headers, RequestOptions, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {
	userId: string;
	userOId: string

	constructor (private http: Http) {}

	login(userId: string, userPw: string) {
		let body = JSON.stringify({userId, userPw});
		let headers = new Headers({ 'Content-Type':'application/json' });
		let options = new RequestOptions({ headers: headers});
		let result;

		return this.http.post('login', body, options)
			.map( res => res.json() )
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

	setUserInfo(_id: string, id: string) {
		this.userId = id;
		this.userOId = _id;
	}

	getUserInfo() {
		let user = {
			userId: this.userId,
			userOId: this.userOId
		}

		return user;
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

	toDate (format: string, time: number) {
		if(time <= 0) {
			return 'N/A';
		}

		let d = new Date(time);

		let f = (n) => {
			if (n <= 9) {
				return '0' + n;
			} else {
				return '' + n;
			}
		};

		if (format == 'YYYY-MM-DD') {
			return d.getFullYear() + '-' + f(d.getMonth() + 1) + '-' + f(d.getDate());
		} else if (format == 'YYYY-MM-DD hh:mm') {
			return d.getFullYear() + '-' + f(d.getMonth() + 1) + '-' + f(d.getDate()) + ' ' +
				f(d.getHours()) + ':' + f(d.getMinutes());
		}	else {
			console.log('Illegal date format: ' + format);
		}
	}

	private handleError (error: Response) {
		console.log(error);
		return Observable.throw (error.json().error || 'Server error');
	}
}

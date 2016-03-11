import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {User} from './user';
import {ChatService} from './chat.service';

@Component({
	selector: 'my-dashboard',
	templateUrl:'src/template/login.template.html',
	styleUrls: ['src/css/login.component.css']
})

export class LoginComponent {
	userId = "";

	constructor(
		private _router: Router,
		private _chatService: ChatService) {
	}

	login(userId: string, userPw: string) {
		this.userId = userId;

		if(!userId || !userPw) {
			return;
		} else {
			this._chatService.login(userId, userPw)
				.subscribe(
					res => {
						if(res) {
							this._chatService.setUserInfo(res._id, res.id);
							this._router.navigate(['RoomList', {userId: this.userId}]);
						}
					},
					error => console.log(error)
			);
		}
	}

	join(userId: string, userPw: string) {
		this.userId = userId;
		if(!userId || !userPw) {
			return;
		} else {
			this._chatService.join(userId, userPw)
				.subscribe(
						res => {
							if(res) {
								this._chatService.setUserInfo(res._id, res.id);
								this._router.navigate(['RoomList', {userId: this.userId}]);
							}
						},
						error => console.log(error)
				);
		}		
	}
}

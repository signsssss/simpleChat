import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {User} from './user';
import {UserService} from './user.service';

@Component({
	selector: 'my-dashboard',
	templateUrl:'src/dashboard.template.html',
	styleUrls: ['src/css/dashboard.component.css']
})

export class DashboardComponent {
	userId = "";

	constructor(
		private _router: Router,
		private _userService: UserService) {
	}

	login(userId: string, userPw: string) {
		this.userId = userId;
		if(!userId || !userPw) {return;}
		this._userService.login(userId, userPw)
			.subscribe(
				res => {
					if(res) {
						this._userService.setUserInfo(res._id, res.id);
						this._router.navigate(['RoomList', {userId: this.userId}]);
					}
				},
				error => console.log(error)
		);
	}

	join(userId: string, userPw: string) {
		this.userId = userId;
		if(!userId || !userPw) {return;}
		this._userService.join(userId, userPw)
			.subscribe(
					res => {
						if(res) {
							this._userService.setUserInfo(res._id, res.id);
							this._router.navigate(['RoomList', {userId: this.userId}]);
						}
					},
					error => console.log(error)
			)
	}
}

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
	user = {id: "", password: ""};

	constructor(
		private _router: Router,
		private _userService: UserService) {
	}

	login(userId: string, userPw: string) {
		if(!userId || !userPw) {return;}
		console.log('userId');
		this._userService.login(userId, userPw);
	}
}
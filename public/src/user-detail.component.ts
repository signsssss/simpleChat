import {RouteParams} from 'angular2/router';
import {Component, OnInit} from 'angular2/core';

import {UserService} from './user.service';
import {User} from './user';

@Component ({
	selector:'my-user-detail',
	templateUrl:'user-detail.template.html',
})

export class UserDetailComponent implements OnInit {
	user: User;

	constructor(
		private _userService: UserService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		let id = +this._routeParams.get('id');
		this._userService.getUser(id)
		.then(user => this.user = user);
	}

	goBack() {
		window.history.back();
	}
}

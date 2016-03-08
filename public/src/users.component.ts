import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {User} from './user';
import {UserDetailComponent} from './user-detail.component';
import {UserService} from './user.service';

@Component({
	selector: 'my-users',
	templateUrl: 'src/app.template.html',
	styleUrls: ['src/css/users.component.css'],
	directives: [UserDetailComponent]
})

export class UsersComponent implements OnInit {
	users: User[];
	selectedUser: User;
	userId: string;

	constructor(
		private _router: Router,
		private _userService:UserService) {}

	getUsers() {
		this._userService.getUsers(this.userId)
			.subscribe (
				res => {
					console.log(res);
				}
			);
	}

	ngOnInit() {
		this.userId = this._routerParams.get('userId');
		console.log(id);
		this.getUsers(id);
	}

	onSelect(user: User) {this.selectedUser = user;}

	gotoDetail() {
		this._router.navigate(['UserDetail', {id: this.selectedUser.id}]);
	}
}

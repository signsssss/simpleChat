import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {User} from './user';
import {Room} from './room'
import {UserDetailComponent} from './user-detail.component';
import {UserService} from './user.service';

@Component({
	selector: 'my-users',
	templateUrl: 'src/users.template.html',
	styleUrls: ['src/css/users.component.css'],
	directives: [UserDetailComponent]
})

export class UsersComponent implements OnInit {
	selectedRoom: Room;
	rooms: Room[];
	userId: string;
	errorMessage: string;

	constructor(
		private _router: Router,
		private _routeParams: RouteParams,
		private _userService:UserService) {}

	getUsers() {
		this._userService.getRooms(this.userId)
			.subscribe (
				res => {
					if(res) {
						this.rooms = res;
					} else {
						return;
					}
				},
				error => this.errorMessage = <any> error
			);
	}

	ngOnInit() {
		this.userId = this._routeParams.get('userId');
		this.getUsers();
	}

	onSelect(room: Room) {this.selectedRoom = room;}

	addRoom(friendId: string) {
		this._userService.addRoom(this.userId, friendId)
			.subscribe (
				res => {
					if(res) {
						this.rooms = res;
						//this._router.navigate( ['RoomList', {userId: this.userId}] );
					}
				}
			);
	}

	joinChatting() {
		this._router.navigate( ['Room', {roomId: this.selectedRoom.roomId}]);
	}
}

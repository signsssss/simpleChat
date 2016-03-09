import {RouteParams} from 'angular2/router';
import {Component, OnInit} from 'angular2/core';

import {UserService} from './user.service';
import {User} from './user';
import {Room} from './room';

declare var io: any;

@Component ({
	selector:'my-user-detail',
	templateUrl:'src/user-detail.template.html',
})

export class UserDetailComponent implements OnInit {
	room: Room;
	roomId: string;
	logs: Log[];
	socket: any;
	chatBox: string;

	constructor(
		private _userService: UserService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		this.roomId = this._routeParams.get('roomId');
		this.chatBox = "";
		this.socket = io();
		this.socket.on("chat_message", (msg) => {
			this.logs.push(msg);
		})

		this._userService.joinChatting(this.roomId)
			.subscribe (
				res => {
						this.logs = res;
						console.log('logs.length: ' ,this.logs.length);
				}
			);
	}

	goBack() {
		window.history.back();
	}

	send(message) {
		this.socket.emit("chat_message", message);
		this.chatBox = "";
	}
}

interface Log {
	sender: string,
	content: string,
	created: number
}

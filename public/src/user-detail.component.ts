import {RouteParams} from 'angular2/router';
import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {UserService} from './user.service';
import {User} from './user';
import {Room} from './room';

declare var io: any;

@Component ({
	selector:'my-user-detail',
	templateUrl:'src/user-detail.template.html',
	styleUrls: ['src/css/user-detail.component.css'],
	directives: [NgClass]
})

export class UserDetailComponent implements OnInit {
	room: Room;
	roomId: string;
	logs: Log[];
	socket: any;
	chatBox: string;
	isMyMsg: boolean = true;

	constructor(
		private _userService: UserService,
		private _routeParams: RouteParams) {
	}

	ngOnInit() {
		this.roomId = this._routeParams.get('roomId');
		this.chatBox = "";
		this.socket = io();
		this.socket.emit("join_room", this.roomId);

		this.socket.on("chat_message", (msg) => {
			if(this.logs.length>= 100) {
				this.logs.unshift();
			}
			this.logs.push(msg);
		});

		this._userService.joinChatting(this.roomId)
			.subscribe (
				res => {
						this.logs = res;
						console.log('this.logs.length: ' ,this.logs);
						let userId = this._userService.getUserInfo().userId;
						for (let i = 0; i < this.logs.length; i++) {
							if(this.logs[i].sender == userId) {
								this.logs[i].sender = "me";
							}
						}
				}
			);
	}

	goBack() {
		window.history.back();
	}

	send(message) {
		if(message.length == 0) { return; }
		let scroll = document.getElementById("messages");

		scroll.scrollTop = scroll.scrollHeight;
		
		let log: Log = {
			sender: "me",
			content: message,
			created: Date.now()
		};

		if(this.logs.length >= 100) {
			this.logs.unshift();
		}
		this.logs.push(log);

		let data: Object = {
			message: message,
			userId: this._userService.getUserInfo().userId,
			roomId: this.roomId,
			created: log.created
		};

		this.socket.emit("chat_message", data);
		this.chatBox = "";
	}

	checkSender(sender: string) {
		if(sender == "me") {
			return true;
		} else {
			return false;
		}
	}
}

interface Log {
	sender: string,
	content: string,
	created: number
}

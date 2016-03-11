import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {User} from './user';
import {Room} from './room'
import {ChattingRoomComponent} from './chatting-room.component';
import {ChatService} from './chat.service';

@Component({
	selector: 'my-users',
	templateUrl: 'src/template/roomlist.template.html',
	styleUrls: ['src/css/roomlist.component.css'],
	directives: [ChattingRoomComponent]
})

export class RoomlistComponent implements OnInit {
	selectedRoom: Room;
	rooms: Room[];
	userId: string;
	errorMessage: string;

	constructor(
		private _router: Router,
		private _routeParams: RouteParams,
		private _chatService:ChatService) {}

	getRooms() {
		this._chatService.getRooms(this.userId)
			.subscribe (
				res => {
					if(res) {
						this.rooms = res;
						for (let i = 0; i < this.rooms.length; i++) {
							this.rooms[i].s_accessed = this._chatService.toDate('YYYY-MM-DD hh:mm', this.rooms[i].accessed);
						}
					} else {
						return;
					}
				},
				error => this.errorMessage = <any> error
			);
	}

	ngOnInit() {
		this.userId = this._routeParams.get('userId');
		this.getRooms();
	}

	onSelect(room: Room) {this.selectedRoom = room;}

	addRoom(friendId: string) {
		this._chatService.addRoom(this.userId, friendId)
			.subscribe (
				res => {
					if(res) {
						this.rooms = res;
						for (let i = 0; i < this.rooms.length; i++) {
							this.rooms[i].s_accessed = this._chatService.toDate('YYYY-MM-DD hh:mm', this.rooms[i].accessed);
						}
					}
				}
			);
	}

	joinChatting() {
		this._router.navigate( ['Room', {roomId: this.selectedRoom.roomId}]);
	}
}

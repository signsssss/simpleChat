import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {ChatService} from './chat.service';
import {RoomlistComponent} from './roomlist.component';
import {LoginComponent} from './login.component';
import {ChattingRoomComponent} from './chatting-room.component';


@Component ({
	selector:'my-app',
	template:`
		<h1 id="title">{{title}}</h1>
		<router-outlet></router-outlet>
	`,
	styleUrls: ['src/css/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [
		HTTP_PROVIDERS,
		ROUTER_PROVIDERS,
		ChatService
	]
})

@RouteConfig([
	{
		path:'/rooms',
		name:'RoomList',
		component: RoomlistComponent
	},
	{
		path: '/home',
		name: 'Dashboard',
		component: LoginComponent,
		useAsDefault: true
	},
	{
		path:'/room/:roomId',
		name:'Room',
		component: ChattingRoomComponent
	}
])

export class AppComponent {
	title = 'Simple Chat App';
}

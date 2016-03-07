import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {UserService} from './user.service';
import {UsersComponent} from './users.component';
import {DashboardComponent} from './dashboard.component';
import {UserDetailComponent} from './user-detail.component';


@Component ({
	selector:'my-app',
	template:`
		<h1>{{title}}</h1>
		<router-outlet></router-outlet>
	`,
	styleUrls: ['src/css/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [
		HTTP_PROVIDERS,
		ROUTER_PROVIDERS,
		UserService
	]
})

@RouteConfig([
	{
		path:'/users',
		name:'Users',
		component: UsersComponent
	},
	{
		path: '/home',
		name: 'Dashboard',
		component: DashboardComponent,
		useAsDefault: true
	},
	{
		path:'/detail/:id',
		name:'UserDetail',
		component: UserDetailComponent
	}
])

export class AppComponent {
	title = 'Login';
}

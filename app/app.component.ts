import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Component} from 'angular2/core';

import {UserService} from './user.service';
import {UsersComponent} from './users.component';
import {DashboardComponent} from './dashboard.component';
import {UserDetailComponent} from './user-detail.component';

@Component ({
	selector:'my-app',
	template:`
		<h1>{{title}}</h1>
		<nav>
			<a [routerLink]="['Dashboard']">Dashboard</a>
			<a [routerLink]="['Users']">Users</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	styleUrls: ['app/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [
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
		path: '/dashboard',
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

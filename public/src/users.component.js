System.register(['angular2/core', 'angular2/router', './user-detail.component', './user.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_detail_component_1, user_service_1;
    var UsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_detail_component_1_1) {
                user_detail_component_1 = user_detail_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(_router, _routeParams, _userService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._userService = _userService;
                }
                UsersComponent.prototype.getUsers = function () {
                    var _this = this;
                    this._userService.getRooms(this.userId)
                        .subscribe(function (res) {
                        if (res) {
                            _this.rooms = res;
                        }
                        else {
                            return;
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                UsersComponent.prototype.ngOnInit = function () {
                    this.userId = this._routeParams.get('userId');
                    this.getUsers();
                };
                UsersComponent.prototype.onSelect = function (room) { this.selectedRoom = room; };
                UsersComponent.prototype.addRoom = function (friendId) {
                    var _this = this;
                    this._userService.addRoom(this.userId, friendId)
                        .subscribe(function (res) {
                        if (res) {
                            _this.rooms = res;
                        }
                    });
                };
                UsersComponent.prototype.joinChatting = function () {
                    this._router.navigate(['Room', { roomId: this.selectedRoom.roomId }]);
                };
                UsersComponent = __decorate([
                    core_1.Component({
                        selector: 'my-users',
                        templateUrl: 'src/users.template.html',
                        styleUrls: ['src/css/users.component.css'],
                        directives: [user_detail_component_1.UserDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, user_service_1.UserService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_1("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=users.component.js.map
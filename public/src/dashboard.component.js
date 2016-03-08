System.register(['angular2/core', 'angular2/router', './user.service'], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_router, _userService) {
                    this._router = _router;
                    this._userService = _userService;
                    this.userId = "";
                }
                DashboardComponent.prototype.login = function (userId, userPw) {
                    var _this = this;
                    this.userId = userId;
                    if (!userId || !userPw) {
                        return;
                    }
                    this._userService.login(userId, userPw)
                        .subscribe(function (res) {
                        if (res) {
                            _this._router.navigate(['RoomList', { userId: _this.userId }]);
                        }
                    }, function (error) { return console.log(error); });
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: 'src/dashboard.template.html',
                        styleUrls: ['src/css/dashboard.component.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map
System.register(['angular2/core', 'angular2/router', './chat.service'], function(exports_1, context_1) {
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
    var core_1, router_1, chat_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_router, _chatService) {
                    this._router = _router;
                    this._chatService = _chatService;
                    this.userId = "";
                }
                LoginComponent.prototype.login = function (userId, userPw) {
                    var _this = this;
                    this.userId = userId;
                    if (!userId || !userPw) {
                        return;
                    }
                    else {
                        this._chatService.login(userId, userPw)
                            .subscribe(function (res) {
                            if (res) {
                                _this._chatService.setUserInfo(res._id, res.id);
                                _this._router.navigate(['RoomList', { userId: _this.userId }]);
                            }
                        }, function (error) { return console.log(error); });
                    }
                };
                LoginComponent.prototype.join = function (userId, userPw) {
                    var _this = this;
                    this.userId = userId;
                    if (!userId || !userPw) {
                        return;
                    }
                    else {
                        this._chatService.join(userId, userPw)
                            .subscribe(function (res) {
                            if (res) {
                                _this._chatService.setUserInfo(res._id, res.id);
                                _this._router.navigate(['RoomList', { userId: _this.userId }]);
                            }
                        }, function (error) { return console.log(error); });
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: 'src/template/login.template.html',
                        styleUrls: ['src/css/login.component.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, chat_service_1.ChatService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map
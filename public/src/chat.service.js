System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var ChatService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            ChatService = (function () {
                function ChatService(http) {
                    this.http = http;
                }
                ChatService.prototype.login = function (userId, userPw) {
                    var body = JSON.stringify({ userId: userId, userPw: userPw });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var result;
                    return this.http.post('login', body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ChatService.prototype.join = function (userId, userPw) {
                    var body = JSON.stringify({ userId: userId, userPw: userPw });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post('join', body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ChatService.prototype.setUserInfo = function (_id, id) {
                    this.userId = id;
                    this.userOId = _id;
                };
                ChatService.prototype.getUserInfo = function () {
                    var user = {
                        userId: this.userId,
                        userOId: this.userOId
                    };
                    return user;
                };
                ChatService.prototype.getRooms = function (userId) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('rooms/' + userId)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ChatService.prototype.addRoom = function (userId, friendId) {
                    var body = JSON.stringify({ userId: userId, friendId: friendId });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post('rooms', body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ChatService.prototype.joinChatting = function (roomId) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('room/' + roomId)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ChatService.prototype.getUser = function (userId) {
                    var body = JSON.stringify({ userId: userId });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('rooms')
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ChatService.prototype.toDate = function (format, time) {
                    if (time <= 0) {
                        return 'N/A';
                    }
                    var d = new Date(time);
                    var f = function (n) {
                        if (n <= 9) {
                            return '0' + n;
                        }
                        else {
                            return '' + n;
                        }
                    };
                    if (format == 'YYYY-MM-DD') {
                        return d.getFullYear() + '-' + f(d.getMonth() + 1) + '-' + f(d.getDate());
                    }
                    else if (format == 'YYYY-MM-DD hh:mm') {
                        return d.getFullYear() + '-' + f(d.getMonth() + 1) + '-' + f(d.getDate()) + ' ' +
                            f(d.getHours()) + ':' + f(d.getMinutes());
                    }
                    else {
                        console.log('Illegal date format: ' + format);
                    }
                };
                ChatService.prototype.handleError = function (error) {
                    console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ChatService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ChatService);
                return ChatService;
            }());
            exports_1("ChatService", ChatService);
        }
    }
});
//# sourceMappingURL=chat.service.js.map
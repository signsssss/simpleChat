System.register(['angular2/router', 'angular2/core', 'angular2/common', './chat.service'], function(exports_1, context_1) {
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
    var router_1, core_1, common_1, chat_service_1;
    var ChattingRoomComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            ChattingRoomComponent = (function () {
                function ChattingRoomComponent(_chatService, _routeParams) {
                    this._chatService = _chatService;
                    this._routeParams = _routeParams;
                    this.isMyMsg = true;
                }
                ChattingRoomComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.roomId = this._routeParams.get('roomId');
                    this.chatBox = "";
                    this.socket = io();
                    this.socket.emit("join_room", this.roomId);
                    this.socket.on("chat_message", function (msg) {
                        if (_this.logs.length >= 100) {
                            _this.logs.unshift();
                        }
                        _this.logs.push(msg);
                    });
                    this._chatService.joinChatting(this.roomId)
                        .subscribe(function (res) {
                        _this.logs = res;
                        console.log('this.logs.length: ', _this.logs);
                        var userId = _this._chatService.getUserInfo().userId;
                        for (var i = 0; i < _this.logs.length; i++) {
                            if (_this.logs[i].sender == userId) {
                                _this.logs[i].sender = "me";
                            }
                        }
                    });
                };
                ChattingRoomComponent.prototype.send = function (message) {
                    if (message.length == 0) {
                        return;
                    }
                    else {
                        console.log(message);
                        var log = {
                            sender: "me",
                            content: message,
                            created: Date.now()
                        };
                        if (this.logs.length >= 100) {
                            this.logs.unshift();
                        }
                        this.logs.push(log);
                        var data = {
                            message: message,
                            userId: this._chatService.getUserInfo().userId,
                            roomId: this.roomId,
                            created: log.created
                        };
                        this.socket.emit("chat_message", data);
                        this.chatBox = "";
                    }
                };
                ChattingRoomComponent.prototype.checkSender = function (sender) {
                    if (sender == "me") {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                ChattingRoomComponent = __decorate([
                    core_1.Component({
                        selector: 'my-user-detail',
                        templateUrl: 'src/template/chatting-room.template.html',
                        styleUrls: ['src/css/chatting-room.component.css'],
                        directives: [common_1.NgClass]
                    }), 
                    __metadata('design:paramtypes', [chat_service_1.ChatService, router_1.RouteParams])
                ], ChattingRoomComponent);
                return ChattingRoomComponent;
            }());
            exports_1("ChattingRoomComponent", ChattingRoomComponent);
        }
    }
});
//# sourceMappingURL=chatting-room.component.js.map
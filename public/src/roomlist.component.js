System.register(['angular2/core', 'angular2/router', './chatting-room.component', './chat.service'], function(exports_1, context_1) {
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
    var core_1, router_1, chatting_room_component_1, chat_service_1;
    var RoomlistComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (chatting_room_component_1_1) {
                chatting_room_component_1 = chatting_room_component_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            RoomlistComponent = (function () {
                function RoomlistComponent(_router, _routeParams, _chatService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._chatService = _chatService;
                }
                RoomlistComponent.prototype.getRooms = function () {
                    var _this = this;
                    this._chatService.getRooms(this.userId)
                        .subscribe(function (res) {
                        if (res) {
                            _this.rooms = res;
                            for (var i = 0; i < _this.rooms.length; i++) {
                                _this.rooms[i].s_accessed = _this._chatService.toDate('YYYY-MM-DD hh:mm', _this.rooms[i].accessed);
                            }
                        }
                        else {
                            return;
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                RoomlistComponent.prototype.ngOnInit = function () {
                    this.userId = this._routeParams.get('userId');
                    this.getRooms();
                };
                RoomlistComponent.prototype.onSelect = function (room) { this.selectedRoom = room; };
                RoomlistComponent.prototype.addRoom = function (friendId) {
                    var _this = this;
                    this._chatService.addRoom(this.userId, friendId)
                        .subscribe(function (res) {
                        if (res) {
                            _this.rooms = res;
                            for (var i = 0; i < _this.rooms.length; i++) {
                                _this.rooms[i].s_accessed = _this._chatService.toDate('YYYY-MM-DD hh:mm', _this.rooms[i].accessed);
                            }
                        }
                    });
                };
                RoomlistComponent.prototype.joinChatting = function () {
                    this._router.navigate(['Room', { roomId: this.selectedRoom.roomId }]);
                };
                RoomlistComponent = __decorate([
                    core_1.Component({
                        selector: 'my-users',
                        templateUrl: 'src/template/roomlist.template.html',
                        styleUrls: ['src/css/roomlist.component.css'],
                        directives: [chatting_room_component_1.ChattingRoomComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, chat_service_1.ChatService])
                ], RoomlistComponent);
                return RoomlistComponent;
            }());
            exports_1("RoomlistComponent", RoomlistComponent);
        }
    }
});
//# sourceMappingURL=roomlist.component.js.map
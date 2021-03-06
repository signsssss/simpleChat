var co = require('co');
var Mongorito = require('mongorito');
var crypto = require('crypto');
var validate = require('jsonschema').validate;

var Model = Mongorito.Model;

Mongorito.connect('localhost/simpleChat');

var UserSchema = {
	type: 'object',
	properties: {
		userId: {
			type: 'string',
			minLength: 2,
			maxLength: 20
		},
		password: {
			type: 'string',
			minLength: 2,
			maxLength: 20
		},
		rooms: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					friendId: {
						type: 'object'
					},
					accessed: {
						type: 'integer',
						length: 13
					},
					roomId: {
						type: 'object'
					}
				}
			}
		}
	},
	required: [ 'userId', 'password' ]
}

var RoomSchema = {
	type: 'object',
	properties: {
		created: {
			type: 'integer',
			length: 13
		},
		accessed: {
			type: 'integer',
			length: 13
		},
		participants: {
			type: 'array',
			itmes: {
				type: 'object'
			}
		},
		log: {
			type: 'array',
			itmes: {
				type: 'object',
				properties: {
					sender: {
						type: 'object'
					},
					content: {
						type: 'string'
					},
					created: {
						type: 'integer',
						length: 13
					}
				}
			}
		}
	},
	required: ['created', 'participants']
}

var User = Model.extend({
	collection: 'users'
	/*configure: function() {
		this.before('save', 'validate');
	},
	validate: function*(next) {
		var errors = validate(this.toJSON(), UserSchema).errors;
		if(errors.length > 0) {
			console.log(errors[0]);
			throw new Error('Invalid user: ' + errors[0].stack);
		}

		yield next;
	}*/
});

var Room = Model.extend({
	collection: 'rooms'
});

exports.UserSchema = UserSchema;
exports.RoomSchema = RoomSchema;

exports.User = User;
exports.Room = Room;

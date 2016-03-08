var co = require('co');
var Mongorito = require('mongorito');
var crypto = require('crypto');
var validate = require('jsonschema').validate;

var Model = Mongorito.Model;

var hash = function(message) {
	return crypto.createHash('sha512').update(message).digest('hex');
};

var algorithm = 'aes-256-ctr';
var password = new Buffer('dfe8a906cbc6247a3169f5c6c85c6df4', 'utf8').toString('hex');

var encrypt = function(msg) {
	/*var cipher = crypto.createCipher(algorithm, password);
	var encrypted = cipher.update(msg, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	
	return encrypted;*/
	return crypto.createHash('sha512').update(cnonce + user.password + req.session.snonce).digest('hex');

};

var decrypt = function(msg) {
	var decipher = crypto.createDecipher(algorithm, password);
	var decrypted = decipher.update(msg, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	
	return decrypted;
};

var random = function() {
	return Math.random().toString(16).substring(2) +
		Math.random().toString(16).substring(2);
};

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
					id: {
						type: 'object'
					},
					accessed: {
						type: 'integer',
						length: 13
					}
				}
			}
		}
	},
	required: [ 'userId', 'password' ]
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

exports.UserSchema = UserSchema;

exports.User = User;

exports.hash = hash;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.random = random;

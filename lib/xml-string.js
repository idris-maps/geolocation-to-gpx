var El = require('./xml-string/El')

exports.create = function(el) {
	var element = new El(el)
	return element
}

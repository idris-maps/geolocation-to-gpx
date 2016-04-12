var xml = require('./lib/xml-string')

module.exports = function(arr) {
	var mime = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'
	var gpx = xml.create('gpx')
	gpx.a({
			'xmlns': 'http://www.topografix.com/GPX/1/1',
			'creator': 'geolocation-to-gpx by Idris maps',
			'version': '1.1',
			'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
	})
	var trk = gpx.c('trk')
	var trkseg = trk.c('trkseg')
	arr.forEach(function(pt) {
			var trkpt = trkseg.c('trkpt').a({
				'lat': pt.lat,
				'lon': pt.lng
			})
			if(pt.alt) {
				trkpt.c('ele').d(pt.alt)
			}
			if(pt.timestamp) {
				var t = (new Date(pt.timestamp)).toISOString()
				trkpt.c('time').d(t)
			}
	})

	var file = mime + '\n' + gpx.outer()
	return file
}

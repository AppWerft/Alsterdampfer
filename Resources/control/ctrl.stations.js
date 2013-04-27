var ctrl = {};
ctrl.stations = ( function() {
	var api = {};
	var getDistance = function(lat1, lon1, lat2, lon2) {
		var R = 6371000;
		// m (change this constant to get miles)
		var dLat = (lat2 - lat1) * Math.PI / 180;
		var dLon = (lon2 - lon1) * Math.PI / 180;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return Math.round(d);
	};
	var alsterdb = Ti.Database.install('/model/alster2.sqlite', 'alster2');
	alsterdb.file.setRemoteBackup(false);
	api.getStation = function(id) {
		var resultSet = alsterdb.execute('SELECT * FROM `stations` WHERE id=' + id);
		if(resultSet.isValidRow()) {
			var label = resultSet.fieldByName('label');
		}
		resultSet.close();
		return name;
	};
	api.getStations = function(userlocation) {
		var resultSet = alsterdb.execute('SELECT * FROM `stations`');
		var stations = [];
		while(resultSet.isValidRow()) {
			var item = {};
			item['nr'] = resultSet.fieldByName('nr');
			item['label'] = resultSet.fieldByName('label');
			item['sublabel'] = resultSet.fieldByName('sublabel') || '';
			item['latlng'] = resultSet.fieldByName('position');
			item['thumb'] = '/assets/' + resultSet.fieldByName('nr') + '.png';
			stations.push(item);
			resultSet.next();
		}
		resultSet.close();
		if(userlocation) {
			Ti.Geolocation.purpose = "Recieve User Location";
			Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.getCurrentPosition(function(e) {
				if(e.error) {
					var mylat = 53.5;
					var mylng = 10;
				} else {
					var mylat = e.coords.latitude;
					var mylng = e.coords.longitude;
				}
				for(var i = 0; i < stations.length; i++) {
					stations[i].dist = getDistance(stations[i].latlng.split(',')[0], stations[i].latlng.split(',')[1], mylat, mylng);
				}
				stations.sort(function(a, b) {
					if(a.dist < b.dist) {
						return -1;
					}
					if(a.dist > b.dist) {
						return 1;
					}
					return 0;
				});
				Ti.App.fireEvent('stations_ready', {
					"stations" : stations
				});
			});
		} else {
			Ti.App.fireEvent('stations_ready', {
				"stations" : stations
			});
		}
	};
	return api;
}());

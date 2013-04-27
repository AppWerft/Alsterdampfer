ctrl.touren = ( function() {
	var api = {};
	Ti.include('/model/touren.json');
	api.getStadtpark = function() {
		var points = [];
		for(var i = 0; i < stadtpark.length; i++) {
			points[i] = {
				latitude : stadtpark[i][0],
				longitude : stadtpark[i][1]
			};
		}
		return points;
	};
	api.getAlster = function() {
		var points = [];
		for(var i = 0; i < alster.length; i++) {
			points[i] = {
				latitude : alster[i][0],
				longitude : alster[i][1]
			};
		}
		return points;
	};
	api.getVierlande = function() {
		var points = [];
		for(var i = 0; i < vierlande.length; i++) {
			points[i] = {
				latitude : vierlande[i][0],
				longitude : vierlande[i][1]
			};
		}
		return points;
	};
	return api;
}());

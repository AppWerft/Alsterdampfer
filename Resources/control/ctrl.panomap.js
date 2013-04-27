ctrl.panomap = ( function() {
	var api = {};
	var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model/panomap.json');
	var panos = JSON.parse(f.read());
	api.getPanos = function() {
		return panos;
	};
	return api;
}());

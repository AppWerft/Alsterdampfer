function Panorama(options) {
	this.path = options.path;
	this.total = options.total || 5;
	this.height = options.height || 250;
	this.images = [];
	this.panocontainer
}

Panorama.prototype.removePanoramaView = function() {
	for(var i = 0; i < this.total; i++) {
		try {
			this.panocontainer.remove(this.images[i]);
		} catch(E) {
		};
	}
};

Panorama.prototype.createPanoramaView = function(path) {
	this.removePanoramaView();
	this.path = path;
	var imagepath = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, this.path);
	var testImg = Ti.UI.createImageView({
		image : imagepath,
		height : 'auto',
		width : 'auto'
	});
	var scaledwidth = testImg.size.width * this.height / testImg.size.height;
	this.panocontainer = Ti.UI.createScrollView({
		height : this.height,
		width : 320,
		showVerticalScrollIndicator : false,
		showHorizontalScrollIndicator : false
	});

	this.panocontainer.contentWidth = this.total * scaledwidth;
	this.panocontainer.contentOffset = {
		x : this.panocontainer.contentWidth / 2,
		y : 0
	};
	for(var i = 0; i < this.total; i++) {
		this.images[i] = Ti.UI.createImageView({
			image : imagepath,
			left : i * scaledwidth,
			width : scaledwidth,
		});
		this.panocontainer.add(this.images[i]);
	}
	
	return this.panocontainer;
};

module.exports = Panorama;

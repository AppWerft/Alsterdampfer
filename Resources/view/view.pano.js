view.pano = ( function() {
	var api = {};
	var panoheight = 250;
	var total = 5;
	var images = [];
	var imageContainer  = Ti.UI.createView({
			height : panoheight,
			top : 0,
			left : 0,
			zindex : 0,
	});
	function getPanoView() {
		var panoViewWrapper = Ti.UI.createView({
			width : '100%',
			height : '100%',
			top : 320
		});
		var imageContainer = Ti.UI.createView({
			height : panoheight,
			top : 0,
			left : 0,
			zindex : 0,
		});
		for( i = 0; i < total; i++) {
			images[i] = Ti.UI.createImageView({
				height : panoheight,
				zindex : 2
			});
			imageContainer.add(images[i]);
		};
		var panoView = Ti.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : panoheight,
			top : 0,
			left : 0,
			width : '100%',
			height : panoheight,
			backgroundImage : 'greybg.png',
			showVerticalScrollIndicator : false,
			showHorizontalScrollIndicator : false
		});
		panoViewWrapper.add(panoView);
		return panoViewWrapper;
	};
	panoViewWrapper = getPanoView();
	
	function setPano(url) {
		imagepath = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, url);
		var testImg = Ti.UI.createImageView({
			image : imagepath,
			height : 'auto',
			width : 'auto'
		});
		scaledwidth = testImg.size.width * panoheight / testImg.size.height;
		imagewidth = scaledwidth;
		imageContainer.width = scaledwidth * total;
		for(var i = 0; i < total; i++) {
			images[i].image = imagepath;
			images[i].left = i * scaledwidth;
			images[i].width = scaledwidth;
		}
		if (!panoViewWrapper) {
			panoViewWrapper = getPanoView();
		}
		panoViewWrapper.scrollTo(total * scaledwidth / 2, 0);
	}
	api.setPano = function(pin) {
		return;
		panoViewWrapper.animate(Ti.UI.createAnimation({
			duration : 200,
			top : 310,
		}));
		setPano(pin.panoimage);
	}
	return api;
}());

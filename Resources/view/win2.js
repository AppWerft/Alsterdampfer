function getWin2() {
	var info = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.INFO_DARK
	});
	var win2 = Ti.UI.createWindow({
		title : 'Kanalfahrten',
		barColor : 'red',
		backgroundColor : '#fff',
		//	rightNavButton : info,
		leftNavButton : Ti.UI.createImageView({
			image : 'assets/pano.png'
		})
	});

	info.addEventListener('click', function() {
		var optionsDialogOpts = {
			options : ['Abfahrtsplan', 'Preise', 'Abbruch'],
			cancel : 2,
			title : 'Mehr zu Kanalfahrten'
		};
		var dialog = Ti.UI.createOptionDialog(optionsDialogOpts);
		dialog.show();
	});
	var panoObject = require('./libs/panoramaview');

	var mapView2 = Ti.Map.createView({
		height : '100%',
		width : '100%',
		userLocation : true,
		regionFit : true,
		mapType : Titanium.Map.HYBRID_TYPE,
		region : {
			latitude : 53.5718680,
			longitude : 10.0070000,
			latitudeDelta : 0.012,
			longitudeDelta : 0.01
		},
		panoactive : false
	});

	var route = ctrl.touren.getStadtpark();

	var panos = ctrl.panomap.getPanos();
	var panopins = [];
	for(var i = 0; i < panos.length; i++) {
		panopins.push(Ti.Map.createAnnotation({
			latitude : panos[i].gps.split(',')[0],
			longitude : panos[i].gps.split(',')[1],
			image : 'assets/pano.png',
			rightButton : 'assets/pano.png',
			title : panos[i].name,
			panoimage : panos[i].image,
			animate : true,
		}));
	}

	var pinson = false;
	win2.leftNavButton.addEventListener('click', function() {
		if(pinson == false) {
			mapView2.addAnnotations(panopins);
			pinson = true;
		} else {
			for(var i = 0; i < panopins.length; i++) {
				mapView2.removeAnnotation(panopins[i]);
			}
			pinson = false;
		}
	});

	mapView2.addRoute({
		name : 'stadtpark',
		points : ctrl.touren.getStadtpark(),
		color : "red",
		width : 5
	});
	mapView2.addRoute({
		name : 'vierlande',
		points : ctrl.touren.getVierlande(),
		color : "orange",
		width : 5
	});
	mapView2.addRoute({
		name : 'alster',
		points : ctrl.touren.getAlster(),
		color : "blue",
		width : 5
	});
	var killer = Ti.UI.createAnimation({
		duration : 500,
		opacity : 0.01
	});
	var closer = Ti.UI.createButton({
		title : 'Schließen',
		width : 100,
		height : 30,
		opacity : 0.5,
		bottom : 5
	});
	var panoramaView;
	closer.addEventListener('click', function() {
		panoramaView.animate(killer);
		win2.remove(closer);
		mapView2.panoactive = false;
		mapView2.setMapType(Titanium.Map.HYBRID_TYPE);
	});
	mapView2.addEventListener('click', function(e) {
		if(mapView2.panoactive == true)
			return;
		if(e.clicksource == 'pin') {
			mapView2.panoactive = true;
			var po = new panoObject({
				total : 10,
				height : 250
			});
			panoramaView = po.createPanoramaView(e.annotation.panoimage);
			panoramaView.bottom = -250;
			// Karte neu zentrieren:
			// Position der Annotation nun im obrren Viertel:
			var lng = e.annotation.longitude;
			var lat = e.annotation.latitude;
			mapView2.setMapType(Titanium.Map.STANDARD_TYPE);
			var region = mapView2.getRegion();
			region.longitude = lng;
			mapView2.setRegion(region);
			panoramaView.animate(Ti.UI.createAnimation({
				duration : 700,
				bottom : 0,
				delay : 100
			}));

			win2.add(panoramaView);
			win2.add(closer);
		}
	});

	win2.add(mapView2);

	return win2;
}
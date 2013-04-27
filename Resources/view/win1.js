function getWin1() {
	function showCamera() {
		Ti.Media.showCamera({
			showControls : true,
			mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
			autohide : true,
			allowEditing : true,
			success : function(event) {
				imageView.stop();
				imageView.images = null;
				var image = event.media;
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'camera_photo.png');
				f.write(image);
				imageView.image = f.nativePath;
				imageView.borderWidth = 1;
				var data_to_send = {
					"file" : f.read(),
					"name" : 'camera_photo.png'
				};
				xhr = Titanium.Network.createHTTPClient();
				xhr.setRequestHeader("enctype", "multipart/form-data");
				xhr.setRequestHeader("Content-Type", "image/png");
				xhr.open("POST", "http://tools.webmasterei.com/sternburger/upload.php");
				//      xhr.send(data_to_send);
				xhr.onload = function() {
					textfield.value = this.responseText;
					Ti.API.info(this.responseText);
				};
			},
			cancel : function() {
			},
			error : function(error) {
				var a = Titanium.UI.createAlertDialog({
					title : 'Camera'
				});
				if(error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('Device does not have video recording capabilities');
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				//a.show();
			}
		});

	};

	var camera = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.CAMERA
	});
	camera.addEventListener('click', showCamera);

	var win1 = Titanium.UI.createWindow({
		title : 'Alsterkreuzfahrt',
		backgroundColor : '#fff',
		barColor : 'red',
		rightNavButton : Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.INFO_DARK
		}),
		leftNavButton : camera
	});
	win1.rightNavButton.addEventListener('click', function() {
		var optionsDialogOpts = {
			options : ['Abfahrtsplan', 'Preise', 'Abbruch'],
			cancel : 2,
			title : 'Mehr zur Alsterkreuzfahrten'
		};
		var dialog = Ti.UI.createOptionDialog(optionsDialogOpts);
		dialog.show();

	});
	ctrl.stations.getStations(true);
	Ti.App.addEventListener('stations_ready', function(data) {
		var s = data.stations;
		var pins = [];
		for(var i = 0; i < s.length; i++) {
			pins.push(Ti.Map.createAnnotation({
				latitude : s[i].latlng.split(',')[0],
				longitude : s[i].latlng.split(',')[1],
				image : 'assets/pin.png',
				title : s[i].label,
				leftButton : s[i].thumb,
				subtitle : s[i].sublabel,
				animate : true,
			}));
		}
		mapView1.addAnnotations(pins);
	});
	var mapView1 = Ti.Map.createView({
		height : '100%',
		width : '100%',
		userLocation : true,
		mapType : Titanium.Map.HYBRID_TYPE,
		region : {
			latitude : 53.5718680,
			longitude : 10.0070000,
			latitudeDelta : 0.012,
			longitudeDelta : 0.01
		},
		opacity : 1
	});
	win1.add(mapView1);
	return win1;
}
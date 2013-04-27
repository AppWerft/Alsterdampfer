// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK);
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var ctrl = {};
var view = {};

Ti.include('control/ctrl.stations.js');
Ti.include('control/ctrl.touren.js');
Ti.include('control/ctrl.panomap.js');
Ti.include('view/win1.js');
Ti.include('view/win2.js');
Ti.include('view/win3.js');

Ti.include('view/win4.js');

var splashWindow = Ti.UI.createWindow({
	backgroundColor : 'white'
});

var splashView = Ti.UI.createImageView({
	image : 'assets/Default.png',
	width : 320,
	left : 0,
	top : 0,
	height : 480
});
splashView.add(createGeduld());
splashWindow.add(splashView);
splashWindow.open();

var tab1 = Titanium.UI.createTab({
	icon : 'assets/atg.png',
	title : 'Alsterkreuzfahrt',
	window : getWin1()
});

var tab2 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Kanalfahrten',
	window : getWin2()
});


var tab3 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Fleetfahrten',
	window : getWin3()
});


var tab4 = Titanium.UI.createTab({
	icon : 'assets/4l.png',
	title : 'Vierlandefahrten',
	window : getWin4()
});

var win5 = Titanium.UI.createWindow({
	title : 'Unsere Flotte',
	barColor : 'red',
	backgroundColor : '#fff',

});
var tab5 = Titanium.UI.createTab({
	icon : 'assets/boat.png',
	title : 'Unsere Flotte',
	window : win5
});

var ships = {
	'ammersbek' : 'Amersbek, Bredenbek, Eilbek, Saselbek, Seebeek, Sielbeek, Susebek',
	'aue' : 'Aue',
	'goldbek' : 'Goldbeek',
	'alsterschipper' : 'Alsterschipper, Alsterschwan, Fleetenkieker, Quarteerslüüd, Schleusenwärter S.C.'
};

var rows = [];
var i = 0;
for(var img in ships) {
	rows[i] = Ti.UI.createTableViewRow({
		height : 120,
		width : 320,
		layout : 'vertical'
	});
	var path = '/assets/' + img + '.png';
	rows[i].add(Ti.UI.createImageView({
		image : path,
		width : 320,
		height : 'auto',
		top : 3,
		left : 3
	}));
	rows[i].add(Ti.UI.createLabel({
		text : ships[img],
		width : 'auto',
		height : 'auto',
		top : 3,
		left : 6,
		right : 6,
		font : {
			fontSize : 13
		}
	}));
	i++;
}
var tv = Ti.UI.createTableView({
	height : '100%',
	data : rows
});

win5.add(tv);

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);

// open tab group
setTimeout(function() {
	splashWindow.close({
		transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
		duration : 1000
	});
	tabGroup.open();
}, 2000);
function createGeduld() {
	var geduld = Ti.UI.createImageView({
		image : '/assets/Schwan.png',
		width : '80%',
		height : 'auto'
	});
	var t1 = Ti.UI.iOS.create3DMatrix();
	t1 = t1.translate(0, 0, 1000);
	t1.m34 = 1.0 / -90;
	t1 = t1.rotate(180, 1, 1, 0);
	t1 = t1.scale(2.0, 2.0, 2.0);
	t1.m34 = 1.0 / -1500;
	var a1 = Titanium.UI.createAnimation();
	a1.transform = t1;
	a1.duration = 2000;
	a1.repeat = 1;
	a1.autoreverse = true;
	geduld.animate(a1);
	a1.addEventListener('complete', function(e) {
		t1 = t1.rotate(180, 0, 1, 1);
		t1 = t1.scale(3.0, 3.0, 3.0);
		t1.m34 = 1.0 / -3000;
		var a3 = Titanium.UI.createAnimation();
		a3.transform = t1;
		a3.duration = 3000;
		a3.repeat = 1;
		a3.addEventListener('complete', function() {
			geduld.animate({
				transform : Ti.UI.iOS.create3DMatrix(),
				duration : 500
			});
		});
		geduld.animate(a3);
	});
	return geduld;
}
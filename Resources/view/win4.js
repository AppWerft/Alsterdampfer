function getWin4() {
	var win4 = Titanium.UI.createWindow({
		title : 'Vierlandefahrten',
		barColor : 'red',
		backgroundColor : '#fff'
	});

	var etappen = [{
		img : 'assets/alsterhafen.jpg',
		text : 'Das Quartier der Alsterschiffe liegt direkt an Hamburgs ältester Promenade. Von hier aus verlässt man auf der Vierlande-Tour die Binnenalster und das Schiff biegt in die Kleine Alster.'
	}, {
		img : 'assets/rathaus.jpg',
		text : 'Über die große Freitreppe hat man einen wunderbaren Blick auf das Hamburger Rathaus. Es wurde von 1886 –1897 auf mehreren tausend Holzpfählen gebaut.'
	}, {
		text : 'Durch das Alsterfleet mit den wohl schönsten Brücken Hamburgs und nach zweimaligem Schleusen erreicht das Schiff den Hamburger Binnenhafen. Dieser entstand schon im 16. Jahrhundert. Am gegenüberliegenden Ufer auf dem Grasbrook wurde Ende des 19. Jahrhunderts die Speicherstadt gebaut. Jetzt entsteht hier die HafenCity mit der Elbphilharmonie und dem Cruise-Center.'
	}, {
		text : 'Die Norderelbbrücken sind die Trennlinie zwischen Ober- und Unterelbe. Danach passiert der Alsterdampfer die Parkhalbinsel Entenwerder, den Rothenburgsorter Wasserturm und die Autobahnbrücke der südlichen Umgehung.',
		img : 'assets/elbbruecke.jpg'

	}, {
		text : 'Naturschutz und Gartenbau vertragen sich in Hamburgs Gemüsegärten. Das größte zusammenhängende Blumenanbaugebiet Europas hat unter Schutz gestellte Feuchtgebiete, in denen um 150 verschiedene Vogelarten heimisch sind.'
	}, {
		text : 'Knapp 500 m nach der Brücke ist die Mündung der Dove Elbe. Die Tatenberger Schleuse dient der Sturmflutsicherung der Vier- und Marschlande und hält den Wasserstand auf gleichem Niveau. Unweit vom Badesee Eichbaum ist der Wassersport zu Hause. Hier gibt es eine 2 km lange Regattastrecke für Ruderboote und Kanuten.'
	}, {
		text : 'Die Reitbrooker Mühle steht unter Denkmalschutz. Sie wurde im 18. Jahrhundert erbaut. Auf dem Müh- lengehöft, zu dem unter anderem ein Hufnerhaus und der Reitbrooker Fährhof gehören, wurde 1852 der berühmte Alfred Lichtwark, der erste Direktor der Hamburger Kunsthalle, geboren.'
	}, {
		text : 'Historisch sehr interessant ist die Aller- möher Dreieinigkeitskirche. Sie wurde im Fachwerk um 1615 gebaut und 1900 renoviert. Der daneben stehende hölzerne Glockenturm enthält eine Glocke von 1483.'
	}, {
		text : 'Die Dove Elbe zweigt nach Südosten ab und voraus wird die Krapphof-Schleuse sichtbar. Diese passiert das ATG Schiff, um durch den Bergedorfer Schleusengraben die City von Hamburgs östlichem Stadtteil zu erreichen. An beiden Ufern des künstlich geschaffenen Schleusengrabens siedelten sich Ende des 19. Jahrhunderts die großen Bergedorfer Gewerbe- betriebe an. Die nahen Gleise der Hamburg-Bergedorfer Eisenbahn und dieser nun schiffbare Wasserweg nach Hamburg brachten wirtschaftlichen Aufschwung für Bergedorf. Zur Zeit wird das gesamte Areal neu strukturiert und mit „Wohnen und Gewerbe“ wiederbelebt.'
	}, {
		text : 'Diverse Brücken unterfährt der Dampfer und läuft schließlich im Bergedorfer Hafen, dem Serrahn, ein. Wir befinden uns jetzt mitten im Herzen von Berge- dorf, nur wenige Schritte entfernt vom Schloss und der reizenden St. Petri und Pauli Kirche, vom Einkaufszentrum, dem ZOB und der S-Bahn.'
	}];

	var panels = [];
	for(var i = 0; i < etappen.length; i++) {
		panels[i] = Ti.UI.createScrollView({
			height : '100%',
			contentHeight : 'auto',

		});
		var imgheight = 0;
		if(etappen[i].img) {
			var testImg = Ti.UI.createImageView({
				image : etappen[i].img,
				height : 'auto',
				width : 'auto'
			});
			imgheight = parseInt(testImg.getHeight(), 10) / parseInt(testImg.getWidth(), 10) * 320;
			var img = Ti.UI.createImageView({
				image : etappen[i].img,
				top : 0,
				borderRadius : 5,
				width : 320,
				borderColor : 'silver',
				borderWidth : 1,
				height : imgheight
			});
			panels[i].add(img);
			testImg = null;
		}
		var text = Ti.UI.createLabel({
			text : etappen[i].text,
			top : 10 + imgheight,
			left : 5,
			height : 'auto',
			right : 5
		});
		panels[i].add(text);
		var height = text.getHeight() + imgheight;
		
		panels[i].setContentHeight(900);
	}
	win4.add(Ti.UI.createScrollableView({
		top : 0,
		views : panels,
		showPagingControl : true
	}));
	return win4;
}
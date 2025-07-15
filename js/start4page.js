function showPage(pURL) {
	if (pURL) {
		console.log("showPage(pURL) pURL: "+pURL);
		document.location.href = pURL
	} else {
		console.error("ERROR: showPage(pURL) - parameter pURL was not defined");
	}
}

function show360Degree(pBasename,vDir) {
	var vURL = vDir + vBasename + "_aframe.html";
	//alert("show360Degree(pBasename,vDir) URL: "+vURL);
	console.log("show360Degree(pBasename,vDir) URL: "+vURL);
	showPage(vURL);
}

function showARMarker(pBasename,vDir,pMarker) {
  pMarker = pMarker || "HIRO";
  pMarker = pMarker.toLowerCase();
	var vURL = vDir + vBasename + "_ar_" + pMarker + ".html";
	//alert("showARMarker(pBasename,vDir,'"+pMarker+"') URL: "+vURL);
	console.log("showARMarker(pBasename,vDir,'"+pMarker+"') URL: "+vURL);
	showPage(vURL);
}

function showARGPS(pBasename,vDir) {
	showPage(vDir + vBasename + "_argeo.html");
}

function show360DegreeHelper() {
  alert('Eine VR-Illustration für Litzspatz, die Sie als 360-Gradbild ansehen können. Dies is eine mögliche Anwendung der 3D-Darstellung eines virtuellen Umgebungsmodells für Litzspatz.');
}

function showARMarkerHelper() {
  alert('Richten Sie Ihre Kamera auf den ' + pMarker + '-Marker. Dann erscheint bezogen auf die räumliche Position des Markers ein 3D-Modell. Halten Sie den Marker im Kamerabild damit das 3D-Modell an die richtige Position für eine realistische Darstellung von Litzspatz möglich ist. Das 3D-Modell verschwindet, wenn der Marker nicht vollständig im Kamerabild sichtbar ist.');
}

function showARGPSHelper() {
  alert('Mit Geo-AR müssen Sie Ihr GPS am Smartphone einschalten, damit die Position der 3D-Modelle im Raum für Litzspatz korrekt mit den GPS-Koordinaten visualisiert werden kann. Die 3D-Modelle sind hier georeferenziert.')
}

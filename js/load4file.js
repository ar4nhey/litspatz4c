// load and parse a HTML file

function parseLoadedFile(pContent,pJSON) {
  var pJSON = pJSON || {};
  if (pContent) {
    var lines = pContent.split("\n");
    for (var i = 0; i < lines.length; i++) {
      pJSON = parseLine4File(lines[i],pJSON);
    }
  }
  return pJSON;
}

function parseLine4File(pLine,pJSON) {
  pJSON = pJSON || {};
  var searchkeys = {
      "CAMPOS": "<a-camera|position=\"|\"|0 2 2",
      "CAMROT": "<a-camera|rotation=\"|\"|0 0 0",
      //"REF2MOVER": "",
      //"HTML4REF2MOVER": "",
      //"HTMLFILENAME": "move360/myanimation",
      "TITLE": "<title>|<title>|</title>",
      "MARKER": "<a-marker|preset=\"|\"",
      "SCALE": "1.0",
      "DIR": "",
      "LOOPBOOL": "true",
      "LAT": "gps-entity-place|latitude:|;",
      "LONG": "gps-entity-place|longitude:|;",
      "GLB": ".glb\"|src=\"|\"|",
      "SKY": "img360/myequirectangular.jpg",
      "STARTPOS": "0 0 0",
      "STARTPOS4K": "StartPosition(|StartPosition(|)",
      //"MIDDLE1POS": "4 0 -5",
      "MIDDLE1POS4K": "Middle1Position(|Middle1Position(|)",
      //"MIDDLE1POS4K": "Middle1Rotation4 , 0 , -5",
      //"MIDDLE2POS": "6 0 -7",
      "MIDDLE2POS4K": "Middle2Position(|Middle2Position(|)",
      //"MIDDLE2POS4K": "6, 0 , -7",
      //"ENDPOS": "-2 0 -3",
      "ENDPOS4K": "End2Position(|EndPosition(|)",
      //"STARTROT": "0 0 0",
      "STARTROT4K": "StartRotation(|StartRotation(|)",
      //"ENDROT": "0 0 0",
      "ENDROT4K": "EndRotation(|EndRotation(|)",
      "DURATION": "setDuration(|setDuration(|)",
      "MOVEID": "Mover('|Mover('|'"
  };
  for (var key in searchkeys) {
    var karr =  searchkeys[key].split("|");
    var vPos = pLine.indexOf(karr[0]);
    if (vPos >= 0) {
      var vPos1 = pLine.indexOf(karr[1]);
      if (vPos1 >= 0) {
        pLine = pLine.substring(vPos1 + karr[1].length);
        var vPos2 = pLine.indexOf(karr[2]);
        if (vPos2 >= 0) {
          pLine = pLine.substring(0,vPos2);
          pJSON[key] = pLine;
          console.log("FOUND: '"+karr[0]+"'");
          if (key.indexOf("4K") >0) {
            var nkey = key.replace(/4K/g,"");
            if (pLine.indexOf("deg") > 0) {
              pJSON[nkey+"4DEG"] = "deg";
            } else {
              pJSON[nkey+"4DEG"] = "rad";
            }
            // remove ,"deg" or ,"rad" at the end
            pJSON[key] = pLine.replace(/[a-z"'\,]+$/,"");
            var vLine = pLine.replace(/[^0-9\+\-\.]+/g," ");
            pJSON[nkey] = vLine;
          };
          if ((key == "SKY") || (key == "GLB")) {
            pJSON[key] = pLine.replace(/\.\.\//g,"");
          }
        }
      }
    }
  }
  var vFileName = pJSON["HTMLFILENAME"];
  vFileName = vFileName.replace(/_ar_hiro\.html/,"");
  vFileName = vFileName.replace(/_ar_kanji\.html/,"");
  vFileName = vFileName.replace(/_argeo\.html/,"");
  vFileName = vFileName.replace(/_aframe\.html/,"");
  vFileName = vFileName.replace(/\.html/,"");
  pJSON["HTMLFILENAME"] = vFileName;
  return pJSON;
}

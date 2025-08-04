/*
 * AFRAME Object Mover
 *
 * created by Bert Niehaus 2025 - niebert GitHub
 * Version:  1.0.93
 * Date:     2025/08/04 8:14:03
 * publish under the GNU Public License GPL v3.0
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Library move objects with a given move id in the 3D space of aframe
 * the following code shows how to use the Aframe
		// Create an instance of ObjectMover for the box
        const boxMover = new AframeMover('movingBox');

        // Set start and end positions
        boxMover.setStartPosition(0, 1.6, -5);
        boxMover.setEndPosition(2, 1.6, -10);

        // Set start and end rotations
        boxMover.setStartRotation(0, 0, 0);
        //-- if middle position was set the path of movement can be bended ---------------
 	      //-- middle point bends the straight line towards the position of middle point. --
        // boxMover.setMiddlePosition(-1, 1.6, -5);

        boxMover.setEndRotation(0, 360, 0);

        // Set duration
        boxMover.setDuration(5000); // 5 seconds

        // Start the movement
        boxMover.startMovement();
 */

class AframeMover {


    constructor(pID,pMode) {
        this.id = pID;
        this.mode4vr = pMode || "aframe";
        //alert("ARMover('"+pID+"','"+pMode+"')");
        this.loopBool = false;
        this.visibleTimes = []; //alternating hide-show-hide;
        this.visibleBoolean = []; //alternating false-true-false;
        //--------------------------
        //------- POSITION ---------
        //--------------------------
        this.order4pos = 1;
        this.scale4dist = 1.0; // emulate distance by scaling.
        // scale4dist = 1.0 means no scaling except the standard scaling for distance
        //this.startPos = { x: 0, y: 0, z: 0 };
        this.startPos = null;
        this.middle1Pos = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 2 / 3
        this.middle2Pos = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 3
        this.endPos = null; // { x: 0, y: 0, z: 0 };
        //--------------------------
        //------- ROTATION ---------
        //--------------------------
        this.order4rot = 1;
        this.startRot = null; // { x: 0, y: 0, z: 0 };
        this.middle1Rot = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 2 / 3
        this.middle2Rot = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 3
        this.endRot = null; //{ x: 0, y: 0, z: 0 };
        //--------------------------
        //------- SCALE ------------
        //--------------------------
        this.order4scale = 1;
        this.startScale = null;   // 1.0
        this.middle1Scale = null; // 0.5 Convex Combination Ord 2 / 3
        this.middle2Scale = null; // 0.2 { x: 0, y: 0, z: 0 }; Convex Combination Ord 3
        this.endScale = null;     // 0.1
        //--------------------------

        this.duration = 5000; // Default duration in milliseconds 5 sec
        this.animationFrameId = null;
    }

    setLoop(pBoolean) {
        this.loopBool = pBoolean;
    }

    setScale4Dist(pScale4Dist) {
      if (pScale4Dist) {
        pScale4Dist = parseFloat(pScale4Dist+"");
        if (pScale4Dist) {
          if (pScale4Dist <= 0.0) {
            pScale4Dist = 1.0;
          }
        } else {
          console.error("setScale4Dist(pScale4Dist) parseFloat(pScale4Dist) was undefined");
          pScale4Dist = 1.0;
        }
        this.scale4dist = pScale4Dist;
      } else {
        console.error("setScale4Dist(pScale4Dist) pScale4Dist was undefined");
        pScale4Dist = 1.0;
      }
    }

    degree2radians(pDegree,pShift) {
      var vRet = 0;
      pShift = pShift || 0.0;
      if (pDegree) {
        if (isNaN(pDegree)) {
          console.error("degree2radians(pDegree) pDegree is not a number - calculation undefined!");
        } else {
          vRet = 2 * Math.PI * (pDegree + pShift)/360
        }
      } else {
        console.error("degree2radians(pDegree) pDegree was undefined!");
      }
      return vRet;
    }

    setVisibleTimes(pVisibleTimes) {
        //this.visibleTimes = [0.5,0.7]; //alternating hide-show-hide;
        //this.visibleBoolean = [false,true]; //alternating false-true-false;
        this.visibleTimes = pVisibleTimes.sort();
        if (this.visibleTimes.length > 0) {
          this.visibleBoolean = [];
          var vBool = false;
          for (var i = 0; i < this.visibleTimes.length; i++) {
            this.visibleBoolean.push(vBool);
            vBool = !vBool;
          }
        }
    }
    getVisible(t) {
        //this.visibleTimes = [0.5,0.7]; //alternating hide-show-hide;
        //this.visibleBoolean = [false,true]; //alternating false-true-false;
        var vBool = true;
        this.visibleTimes = this.visibleTimes.sort();
        var i4t = -1;
        if (this.visibleTimes.length > 0) {
          var vt = this.visibleTimes;
          var i = vt.length-1;
          while ((i>=0) && (t < vt[i])) {
            i--;
          }
          if (i>=0) {
            vBool = this.visibleBoolean[i];
          }
        }
        return vBool;
    }

    setPosition4Scene(x,y,z) {
      switch (this.mode4vr) {
        case "ar":

        break;
        case "aframe":

        break;
        case "aframe4domid":
          // for compatibility - handling objects with DOM ID
          if (this.id) {
            this.entity = document.getElementById(this.id);
            if (this.entity) {
              console.warn("Moving aframe object with DOM ID.")
              console.log("Position="+JSON.stringify(this.entity.getAttribute('position'),null,4)+" ");
              this.entity.setAttribute('position', this.startPos);
            }
          }
        break;
        default:
      }
    }

    getScalePosition(pPosition) {
      var retPos = {
        "x": 0,
        "y": 0,
        "z": 0,
        "s": 1.0
      }
      if (pPosition) {
        var x = pPosition.x;
        var y = pPosition.y;
        var z = pPosition.z;
        var s = this.scale4dist;
        retPos.x = x;
        retPos.y = y;
        retPos.z = z;
        if ((s < 1.0) && (s >= 0.0)) {
            var norm4pos = Math.sqrt(x * x + y * y + z * z);
            s = this.scale4dist
            s += (1-this.scale4dist)/(1+norm4pos);
            retPos.x = x * s;
            retPos.y = y * s;
            retPos.z = z * s;
            retPos.s = s;
        }
      }
      return retPos;
    }

    //--------------------------
    //------- POSITION ---------
    //--------------------------
    setStartPosition(x, y, z) {
      this.startPos = this.getScalePosition({
          "x": x,
          "y": y,
          "z": z,
          "s": 1.0
      });//{ x, y, z };
    }

    setMiddlePosition(x, y, z) {
      this.order4pos = 2;
      this.middle1Pos = this.getScalePosition({
          "x": x,
          "y": y,
          "z": z,
          "s": 1.0
      });//{ x, y, z };
    }


    setMiddle1Position(x, y, z) {
      this.order4pos = 3;
      this.middle1Pos = this.getScalePosition({
          "x": x,
          "y": y,
          "z": z,
          "s": 1.0
      });//{ x, y, z };
    }

    setMiddle2Position(x, y, z) {
      this.order4pos = 3;
      this.middle2Pos = this.getScalePosition({
          "x": x,
          "y": y,
          "z": z,
          "s": 1.0
      });//{ x, y, z };
    }

    setEndPosition(x, y, z) {
        this.endPos = this.getScalePosition({
            "x": x,
            "y": y,
            "z": z,
            "s": 1.0
        });//{ x, y, z };
    }

    setStartPositionVert(x, y, z) {
      this.setStartPosition(x, z, -y)
    }
    setMiddlePositionVert(x, y, z) {
      this.setMiddlePosition(x, z, -y)
    }
    setMiddle1PositionVert(x, y, z) {
      this.setMiddle1Position(x, z, -y)
    }
    setMiddle2PositionVert(x, y, z) {
      this.setMiddle2Position(x, z, -y)
    }
    setEndPositionVert(x, y, z) {
      this.setEndPosition(x, z, -y)
    }

    //--------------------------
    //------- ROTATION ---------
    //--------------------------
    setRotation4Scene(x,y,z) {
      //this.entity.setAttribute('rotation', { x: x, y: y, z: z });
      if (this.mode4vr == "aframe4domid") {
        // for compatibility - handling objects with DOM ID
        if (this.entity) {
          this.entity = document.getElementById(this.id);
          this.entity.setAttribute('rotation', { "x": x, "y": y, "z": z });
        }
      }
    }

    setStartRotation(x, y, z,deg) {
        if (deg && deg=="deg" ) {
          x = this.degree2radians(x);
          y = this.degree2radians(y);
          z = this.degree2radians(z);
        }
        this.startRot = {
          "x": x,
          "y": y,
          "z": z
        };//{ x, y, z };
        //this.setRotation4Scene(x,y,z);
    }

    setMiddleRotation(x, y, z,deg) {
        if (deg && deg=="deg" ) {
          x = this.degree2radians(x);
          y = this.degree2radians(y);
          z = this.degree2radians(z);
        }
        this.order4rot = 2;
        this.middle1Rot = {
          "x": x,
          "y": y,
          "z": z
        };//{ x, y, z };
    }


    setMiddle1Rotation(x, y, z,deg) {
      if (deg && deg=="deg" ) {
          x = this.degree2radians(x);
          y = this.degree2radians(y);
          z = this.degree2radians(z);
      }
      this.order4rot = 3;
      this.middle1Rot = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setMiddle2Rotation(x, y, z,deg) {
      if (deg && deg=="deg" ) {
          x = this.degree2radians(x);
          y = this.degree2radians(y);
          z = this.degree2radians(z);
      }
      this.order4rot = 3;
      this.middle2Rot = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setEndRotation(x, y, z,deg) {
      if (deg && deg=="deg" ) {
          x = this.degree2radians(x);
          y = this.degree2radians(y);
          z = this.degree2radians(z);
      }
      this.endRot = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }



    setEndRotation(x, y, z,deg) {
      if (deg && deg=="deg" ) {
          x = this.degree2radians(x);
          y = this.degree2radians(y);
          z = this.degree2radians(z);
      }
      this.endRot = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }


    setStartRotationVert(x, y, z, deg) {
      deg = deg || "rad";
      this.setStartRotation(x, z, -y, deg);
    }
    setMiddleRotationVert(x, y, z, deg) {
      deg = deg || "rad";
      this.setMiddleRotation(x, z, -y, deg)
    }
    setMiddle1RotationVert(x, y, z, deg) {
      deg = deg || "rad";
      this.setMiddle1Rotation(x, z, -y, deg)
    }
    setMiddle2RotationVert(x, y, z, deg) {
      deg = deg || "rad";
      this.setMiddle2Rotation(x, z, -y, deg)
    }
    setEndRotationVert(x, y, z, deg) {
      deg = deg || "rad";
      this.setEndRotation(x, z, -y, deg)
    }

    //--------------------------
    //------- SCALE ------------
    //--------------------------
    setScale4Scene(x,y,z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      //this.entity.setAttribute('rotation', { x: x, y: y, z: z });
      if (this.mode4vr == "aframe4domid") {
        if (this.entity) {
          this.entity = document.getElementById(this.id);
          this.entity.setAttribute('scale', { "x": x, "y": y, "z": z });
        }
      }
    }

    setStartScale(x, y, z) {
        if (arguments.length < 3) {
          y = x;
          z = x;
        }
        this.startScale = {
          "x": x,
          "y": y,
          "z": z
        };//{ x, y, z };
        //this.setScale4Scene(x,y,z);
    }

    setMiddleScale(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.order4scale = 2;
      this.middle1Scale = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }


    setMiddle1Scale(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.order4scale = 3;
      this.middle1Scale = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setMiddle2Scale(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.order4scale = 3;
      this.middle2Scale = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setEndScale(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.endScale = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setStartScaleVert(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.setStartScale(x, z, y)
    }
    setMiddleScaleVert(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.setMiddleScale(x, z, y)
    }
    setMiddle1ScaleVert(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.setMiddle1Scale(x, z, y)
    }
    setMiddle2ScaleVert(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.setMiddle2Scale(x, z, y)
    }
    setEndScaleVert(x, y, z) {
      if (arguments.length < 3) {
        y = x;
        z = x;
      }
      this.setEndScale(x, z, y)
    }

    setDuration(duration) {
        this.duration = duration;
    }

    setAframeComponent() {

    }

    calculateSphereAngles(vector) {
      const x = vector.x;
      const y = vector.y;
      const z = vector.z;

      const r = Math.sqrt(x * x + y * y + z * z);
      const azimuth = Math.atan2(y, x);
      const polar = Math.acos(z / r);

      return { azimuth, polar };
    }

    cloneJSON(pJSON) {
      var vJSON = {};
      if (pJSON) {
        vJSON = JSON.parse(JSON.stringify(pJSON));
      } else {
        console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
      };
      return vJSON
    };
/*
    // Get the element
    const element = document.querySelector('#my-element');

    // Define the 3D vector
    const vector = { x: 1, y: 2, z: 3 };

    // Calculate the sphere angles
    const { azimuth, polar } = calculateSphereAngles(vector);

    // Convert the angles to degrees
    const azimuthDeg = azimuth * (180 / Math.PI);
    const polarDeg = polar * (180 / Math.PI);

    // Update the rotation attribute of the element
    element.setAttribute('rotation', { x: polarDeg, y: azimuthDeg, z: 0 });
*/
    startMovement() {
      //alert("startMovement() mode4vr="+this.mode4vr);
      if (this.mode4vr == "aframe4domid") {
        this.startMovement4DOMID(this)
      } else {
        //startMovement4Aframe(this)
        this.startMovement4Aframe(this)
      }
    }


    startMovement4Aframe(pMover) {
      console.log("startMovement4Aframe() pMover="+JSON.stringify(pMover,null,4));
      var vMoverID = pMover.id.toLowerCase();
AFRAME.registerComponent(vMoverID , {
  mover: pMover,
  startTime: 0,
  currentTime: 0,
  keys: ["x","y","z"],

  coordExist: function(pHash,pKeys) {
     if (!pHash) {
       return false;
     }
     var vBool = true;
     var keys = pKeys || this.keys || ["x","y","z"];
     for (var i = 0; i < keys.length; i++) {
       if (!(pHash.hasOwnProperty(keys[i])) ) {
         vBool = false;
         //alert("coordExist() "+JSON.stringify(pHash));
       }
     }
     return vBool;
 },
 init: function()
 {
    this.startTime = performance.now();
    var mv = this.mover;
    var startPos = { x: 0, y: 0, z: 0 };
    if (this.coordExist(mv.startPos) == true) {
      if (this.el.object3D && this.el.object3D.position) {
        this.el.object3D.rotation.set(mv.startPos.x, mv.startPos.y, mv.startPos.z);
      }
    };
    var initRot = { x: 0, y: 0, z: 0 };
    if (this.coordExist(mv.startRot) == true) {
      if (this.el.object3D && this.el.object3D.rotation) {
        this.el.object3D.rotation.set(mv.startRot.x, mv.startRot.y, mv.startRot.z);
      }
    };
    //alert("INIT mv.startRot="+JSON.stringify(mv.startRot))

    if (this.coordExist(mv.startScale) == true) {
      if (mv.startScale.x) {
        this.el.object3D.scale.set(mv.startScale.x, mv.startScale.y, mv.startScale.z);
      }
    };
    //this.el.object3D.scale.set(0.75, 0.75, 0.75);
    //this.el.object3D.rotation.set(initRot.x, initRot.y, initRot.z);
    //console.log("mover="+JSON.stringify(mv,null,4));
 },
 tick: function (time, timeDelta)
 {
   var mv = this.mover;
   this.el.object3D.position.x += 0.01;
   this.currentTime = performance.now();

   const elapsedTime = this.currentTime - this.startTime;
   const progress = Math.min(elapsedTime / this.mover.duration, 1);
   // console.log("Progress: "+progress);
   //var vVec = this.conv2vec(mv.startPos,mv.middle1Pos,mv.endPos,progress);
   var vPos = this.convex_position(progress);
   var vVisible = mv.getVisible(progress);
   //alert("vVisible["+progress+"]="+vVisible);
   this.el.object3D.visible = vVisible;
   //console.log("tick() - vPos="+JSON.stringify(vPos)+" order4rot="+mv.order4rot+" oder4rotation="+mv.order4rotation);
   this.setPosition4Scene(vPos);
   //alert("TICK 1 mv.startRot="+JSON.stringify(mv.startRot))
   var vRot = this.convex_rotation(progress);
   //alert("TICK 2 mv.startRot="+JSON.stringify(mv.startRot))
   this.setRotation4Scene(vRot);
   //alert("TICK 3 mv.startRot="+JSON.stringify(mv.startRot))
   var vScale = this.convex_scale(progress);
   this.setScale4Scene(vScale);
   this.currentTime += timeDelta;
   if (progress >= 1.0) {
     if (this.mover.loopBool == true) {
       this.startTime = performance.now();
       if (this.coordExist(mv.startPos) == true) {
         this.el.object3D.position.set(mv.startPos.x, mv.startPos.y, mv.startPos.z);
       }
       //alert("mv.startRot="+JSON.stringify(mv.startRot))
       //alert("mv.endRot="+JSON.stringify(mv.endRot))
       if (this.coordExist(mv.startRot) == true) {
         // if startRot is set
         // reset the start rotation angles
         this.el.object3D.rotation.set(mv.startRot.x, mv.startRot.y, mv.startRot.z);
       }
       if (this.coordExist(mv.startScale) == true) {
         // if startScale is set
         // reset the start scale of object
         this.el.object3D.scale.set(mv.startScale.x, mv.startScale.y, mv.startScale.z);
       }
     }
   }
 },
 convex_position: function (t) {
   var mv = this.mover;
   var vVec = {
     "x": 0,
     "y": 0,
     "z": 0
   };
   if (this.coordExist(mv.startPos) == false) {
     console.warn("convex_postion(t) - startPos not defined");
     return vVec;
   } else {
     vVec = mv.cloneJSON(mv.startPos);
   }

   if (this.coordExist(mv.endPos) == false) {
     mv.order4pos = 0;
     console.warn("convex_position(t) - endPos not defined");
     return vVec;
   }

   if (this.coordExist(mv.middle1Pos) == false) {
     mv.order4pos = 1;
     vVec = this.conv1vec(mv.startPos,mv.endPos,t);
     //console.log("convex combination for position- order 1");
   } else {
     if (this.coordExist(mv.middle2Pos) == false) {
       mv.order4pos = 2;
       vVec = this.conv2vec(mv.startPos,mv.middle1Pos,mv.endPos,t);
       //console.log("convex combination - order 2");
     } else {
       mv.order4pos = 3;
       vVec = this.conv3vec(mv.startPos,mv.middle1Pos,mv.middle2Pos,mv.endPos,t);
       //console.log("convex combination - order 3");
     }
   }
   console.log("convex_position(t,ord"+mv.order4pos+") = "+JSON.stringify(vVec));
   return vVec;
 },
 convex_rotation: function (t) {
   var mv = this.mover;
   var vVec = {
     "x": 0,
     "y": 0,
     "z": 0
   };
   if (this.coordExist(mv.startRot) == false) {
     console.warn("convex_rotation(t) - startRot not defined");
     return null;
   } else {
     vVec = mv.cloneJSON(mv.startRot);
   }
   if (this.coordExist(mv.endRot) == false) {
     console.warn("convex_rotation(t) - endRot not defined");
     return vVec;
   }
   if (this.coordExist(mv.middle1Rot) == false) {
     mv.order4rot = 1;
     vVec = this.conv1vec(mv.startRot,mv.endRot,t);
     //console.log("convex rotation - order 1 vec="+JSON.stringify(vVec));
   } else {
     if (this.coordExist(mv.middle2Rot) == false) {
       mv.order4rot = 2;
       vVec = this.conv2vec(mv.startRot,mv.middle1Rot,mv.endRot,t);
       //console.warn("convex rotation - order 2 vec="+JSON.stringify(vVec));
     } else {
       mv.order4rot = 3;
       vVec = this.conv3vec(mv.startRot,mv.middle1Rot,mv.middle2Rot,mv.endRot,t);
       //console.log("convex rotation - order 3 vec="+JSON.stringify(vVec));
     }
   }
   console.log("convex_rotation(t,ord"+mv.order4rot+") = "+JSON.stringify(vVec));
   return vVec;
 },

 convex_scale: function (t) {
   var mv = this.mover;
   var vVec = {
     "x": 1.0,
     "y": 1.0,
     "z": 1.0
   };
   if (this.coordExist(mv.startScale) == false) {
     //console.warn("convex_scale(t) - startScale not defined");
     return null;
   } else {
     vVec = mv.cloneJSON(mv.startScale);
   }
   if (this.coordExist(mv.endScale) == false) {
     mv.order4scale = 0;
     //console.warn("convex_scale(t) - endScale not defined");
     return vVec;
   }
   if (this.coordExist(mv.middle1Scale) == false) {
     mv.order4rot = 1;
     vVec = this.conv1vec(mv.startScale,mv.endScale,t);
     //console.log("convex scale - order 1");
   } else {
     if (this.coordExist(mv.middle2Scale) == false) {
       mv.order4rot = 2;
       vVec = this.conv2vec(mv.startScale,mv.middle1Scale,mv.endScale,t);
       //console.log("convex scale - order 2");
     } else {
       mv.order4rot = 3;
       vVec = this.conv3vec(mv.startScale,mv.middle1Scale,mv.middle2Scale,mv.endScale,t);
       //console.log("convex scale - order 3");
     }
   }
   console.log("convex_scale(t,ord"+mv.order4rot+") = "+JSON.stringify(vVec));
   return vVec;
 },

 setPosition4Scene: function(pPosition) {
   if (this.el.object3D) {
     if (this.coordExist(pPosition) == true) {
       this.el.object3D.position.x = pPosition.x;
       this.el.object3D.position.y = pPosition.y;
       this.el.object3D.position.z = pPosition.z;
       //var s = pPosition.s || 1.0;
       //this.el.object3D.scale.set(s, s, s);
     }
   } else {
     console.error("this.el.object3D is not defined in setPosition4Scene()");
   }
 },
 setRotation4Scene: function(pRotation) {
   var mv = this.mover;
   if (this.el.object3D) {
     if (this.coordExist(pRotation) == true) {
       this.el.object3D.rotation.x = pRotation.x;
       this.el.object3D.rotation.y = pRotation.y;
       this.el.object3D.rotation.z = pRotation.z;
     }
   } else {
     console.error("this.el.object3D is not defined in setRotation4Scene()");
   }
 },
 setScale4Scene: function(pScale) {
   var mv = this.mover;
   if (this.el.object3D) {
     if (this.coordExist(pScale) == true) {
       this.el.object3D.scale.set(pScale.x,pScale.y,pScale.z);
     }
   } else {
     console.error("this.el.object3D is not defined in setScale4Scene()");
   }
 },
 conv1: function (pStart,pEnd,t) {
   return (1-t)* pStart + t * pEnd
 },

 conv1vec: function (pStart,pEnd,t) {
   var mv = this.mover;
   var vVec = {};
   if (this.coordExist(pStart) == true) {
     vVec = mv.cloneJSON(pStart);
   } else {
     return null;
   }
   if (this.coordExist(pEnd) == true) {
     for (var i = 0; i < this.keys.length; i++) {
       var key =  this.keys[i];
       vVec[key] = this.conv1(pStart[key],pEnd[key],t);
     }
     if (pStart.hasOwnProperty("s")) {
       var key = "s"
       vVec[key] = this.conv1(pStart[key],pEnd[key],t);
     }
   } else {
     return null;
   }
   //console.log("conv1vec(pStart,pEnd,"+t+") - vVec="+JSON.stringify(vVec));
   return vVec
 } ,

 conv2: function (pStart,pMiddle1, pEnd,t) {

   return Math.pow(1-t,2) * pStart + 2 * (1-t)* t * pMiddle1 + Math.pow(t,2)*pEnd
 },

 conv2vec: function (pStart,pMiddle1,pEnd,t) {
   //console.log("conv2vec() - pStart="+JSON.stringify(pStart)+ " middle2Pos="+JSON.stringify(middle2Pos)+" pEnd="+JSON.stringify(pEnd));
   var mv = this.mover;
   var vVec = {};
   if (this.coordExist(pStart) == false) {
     console.error("conv2vec(pStart,pMiddle1,pEnd,"+t+") pStart undefined" );
     return null;
   } else {
     vVec = mv.cloneJSON(pStart);
   }
   if (this.coordExist(pMiddle1) == false) {
     console.error("conv2vec(pStart,pMiddle1,pEnd,"+t+") pMiddle1 undefined" );
     return null;
   }
   if (this.coordExist(pEnd) == false) {
     console.error("conv2vec(pStart,pMiddle1,pEnd,"+t+") pEnd undefined" );
     return null;
   }
   for (var i = 0; i < this.keys.length; i++) {
     var key = this.keys[i]
     vVec[key] = this.conv2(pStart[key],pMiddle1[key],pEnd[key],t)
   }
   if (pStart.hasOwnProperty("s")) {
     var key = "s"
     vVec[key] = this.conv2(pStart[key],pMiddle1[key],pEnd[key],t)
   }
   //console.log("conv2vec(pStart, pMiddle1, pEnd)="+JSON.stringify(vVec));
   return vVec
 },

 conv3: function (pStart,pMiddle1, pMiddle2, pEnd,t) {
   return Math.pow(1-t,3) * pStart + 3* Math.pow(1-t,2)* t * pMiddle1 + 3* (1-t) * Math.pow(t,2) * pMiddle2 + Math.pow(t,3)*pEnd;
 },

 conv3vec: function (pStart,pMiddle1,pMiddle2,pEnd,t) {
   //console.log("conv3vec() - pStart="+JSON.stringify(pStart)+ " pMiddle1="+JSON.stringify(pMiddle1)+ " pMiddle2="+JSON.stringify(pMiddle2)+" pEnd="+JSON.stringify(pEnd));
   var mv = this.mover;
   var vVec = {};
   // iteration over "x", "y", "z"
   if (this.coordExist(pStart) == false) {
     console.error("conv3vec(pStart,pMiddle1,pMiddle2,pEnd,"+t+") pStart undefined" );
     return null;
   } else {
     vVec = mv.cloneJSON(pStart);
   }

   if (this.coordExist(pMiddle1) == false) {
     console.error("conv3vec(pStart,pMiddle1,pMiddle2,pEnd,"+t+") pMiddle1 undefined");
     return null;
   }
   if (this.coordExist(pMiddle2) == false) {
     console.error("conv3vec(pStart,pMiddle1,pEnd,"+t+") pMiddle2 undefined");
     return null;
   }
   if (this.coordExist(pEnd) == false) {
     console.error("conv3vec(pStart,pMiddle1,pMiddle2,pEnd,"+t+") pEnd undefined");
     return null;
   }
   for (var i = 0; i < this.keys.length; i++) {
     var key = this.keys[i]
     vVec[key] = this.conv3(pStart[key],pMiddle1[key],pMiddle2[key],pEnd[key],t)
   }
   if (pStart.hasOwnProperty("s")) {
     var key = "s"
     vVec[key] = this.conv3(pStart[key],pMiddle1[key],pMiddle2[key],pEnd[key],t)
   }
   //console.log("conv3vec(pStart, pMiddle1,pMiddle2, pEnd)="+JSON.stringify(vVec));
   return vVec
 },

});

    }


    startMovement4DOMID(pEntity) {
		    const self = this;
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);
            console.log("Progress: "+progress);
            var x = 0;
            var y = 0;
            var z = 0;

            if (this.middle1Pos) {
              x = (1-progress)**(2) * this.startPos.x + 2 * (1-progress)* progress * this.middle1Pos.x + (progress**2) * this.endPos.x ;
              y = (1-progress)**(2)  * this.startPos.y + 2 * (1-progress)* progress * this.middle1Pos.y + (progress**2) * this.endPos.y ;
              z = (1-progress)**(2)  * this.startPos.z + 2 * (1-progress)* progress * this.middle1Pos.z + (progress**2) * this.endPos.z ;
              //console.log("Ord2 progress^2="+(progress)+" - Point ("+x+","+y+","+z+")");
            } else {
              x = (1-progress) * this.startPos.x + progress * this.endPos.x ;
              y = (1-progress) * this.startPos.y + progress * this.endPos.y ;
              z = (1-progress) * this.startPos.z + progress * this.endPos.z ;
              //console.log("Ord1 - Point ("+x+","+y+","+z+")");
            }
            const rx = this.startRot.x + (this.endRot.x - this.startRot.x) * progress;
            const ry = this.startRot.y + (this.endRot.y - this.startRot.y) * progress;
            const rz = this.startRot.z + (this.endRot.z - this.startRot.z) * progress;

            this.setPosition4Scene(x, y, z);
            this.setRotation4Scene(rx, ry, rz);

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
				        console.log("Check Loop Animation loopBool="+this.loopBool);
				        if (this.loopBool == true) {
					         console.log("Loop Animation loopBool="+this.loopBool);
					         self.startMovement4DOMID();
        		    } else {
					         console.log("Stop Animation loopBool="+this.loopBool);
				        }
			      }
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    stopMovement() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

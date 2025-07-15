/*
 * AR.js Object Mover
 *
 * move objects with a given id in the 3D space of aframe
 * the following code shows how to use the Aframe
		// Create an instance of ObjectMover for the box
        const boxMover = new ARMover('movingBox');

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
        this.order4convex = 1;
        //this.startPos = { x: 0, y: 0, z: 0 };
        this.startPos = null;
        this.middle1Pos = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 2 / 3
        this.middle2Pos = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 3
        this.endPos = null; // { x: 0, y: 0, z: 0 };
        // initRot is base angles startRot is added to convex combination
        this.order4rotation = 1;
        this.initRot = null; // init Rotation is added to rotation
        this.startRot = null; // { x: 0, y: 0, z: 0 };
        this.middle1Rot = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 2 / 3
        this.middle2Rot = null; // e.g. { x: 0, y: 0, z: 0 }; Convex Combination Ord 3
        this.endRot = null; //{ x: 0, y: 0, z: 0 };
        this.duration = 5000; // Default duration in milliseconds 5 sec
        this.animationFrameId = null;
    }

    setLoop(pBoolean) {
        this.loopBool = pBoolean;
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

    setStartPosition(x, y, z) {
        this.startPos = {
          "x": x,
          "y": y,
          "z": z
        };
        this.setPosition4Scene(x,y,z)
    }

    setPosition4Scene(x,y,z) {
      switch (this.mode4vr) {
        case "ar":

        break;
        case "aframe":

        break;
        default:
      }
      if (this.mode4vr == "ar") {
        // mode4vr = "ar"
      } else {
        // mode4vr = "aframe"
        // for compatibility - handling objects with DOM ID
        if (this.id) {
          this.entity = document.getElementById(this.id);
          if (this.entity) {
            console.warn("Moving aframe object with DOM ID.")
            console.log("Position="+JSON.stringify(this.entity.getAttribute('position'),null,4)+" ");
            this.entity.setAttribute('position', this.startPos);
          }
        }
      }
    }

    setMiddlePosition(x, y, z) {
      this.order4convex = 2;
      this.middle1Pos = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setMiddle1Position(x, y, z) {
      this.order4convex = 3;
      this.middle1Pos = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setMiddle2Position(x, y, z) {
      this.order4convex = 3;
      this.middle2Pos = {
          "x": x,
          "y": y,
          "z": z
      };//{ x, y, z };
    }

    setEndPosition(x, y, z) {
        this.endPos = {
          "x": x,
          "y": y,
          "z": z
        };//{ x, y, z };
    }

    setRotation4Scene(x,y,z) {
      //this.entity.setAttribute('rotation', { x: x, y: y, z: z });
      if (this.mode4vr == "ar") {
        // mode4vr = "ar"
      } else {
        // mode4vr = "aframe"
        // for compatibility - handling objects with DOM ID
        if (this.entity) {
          this.entity = document.getElementById(this.id);
          this.entity.setAttribute('rotation', { "x": x, "y": y, "z": z });
        }
      }
    }

    setStartRotation(x, y, z) {
        this.startRot = {
          "x": x,
          "y": y,
          "z": z
        };//{ x, y, z };
        this.setRotation4Scene(x,y,z);
    }

    setEndRotation(x, y, z) {
        this.endRot = {
          "x": x,
          "y": y,
          "z": z
        };//{ x, y, z };
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
        this.startMovement4Aframe(this)
      } else {
        //startMovement4AR(this)
        this.startMovement4AR(this)
      }
    }


    startMovement4AR(pMover) {
      console.log("startMovement4AR() pMover="+JSON.stringify(pMover,null,4));
      var vMoverID = pMover.id.toLowerCase();

      AFRAME.registerComponent(vMoverID , {
        mover: pMover,
        startTime: 0,
        currentTime: 0,

       init: function()
       {
          this.startTime = performance.now();
          var mv = this.mover;
          var startPos = { x: 0, y: 0, z: 0 };
          if (mv.startPos) {
            startPos = mv.startPos;
          } else {
            if (this.el.object3D && this.el.object3D.position) {
              mv.startPos = this.el.object3D.position;
              startPos = this.el.object3D.position;
            }
          };
          var initRot = { x: 0, y: 0, z: 0 };
          if (mv.initRot) {
            initRot = mv.initRot;
          } else {
            if (this.el.object3D && this.el.object3D.rotation) {
              mv.initRot = this.el.object3D.rotation
              initRot = this.el.object3D.rotation
            }
          };
          this.el.object3D.scale.set(0.75, 0.75, 0.75);
          this.el.object3D.position.set(startPos.x, startPos.y, startPos.z);
          this.el.object3D.rotation.set(initRot.x, initRot.y, initRot.z);
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
         var vPos = this.convex_combination(progress);
         var vVisible = mv.getVisible(progress);
         //alert("vVisible["+progress+"]="+vVisible);
         this.el.object3D.visible = vVisible;
         console.log("tick() - vPos="+JSON.stringify(vPos)+" order4convex="+mv.order4convex+" oder4rotation="+mv.order4rotation);
         this.setPosition4Scene(vPos);
         var vRot = this.convex_rotation(progress);
         this.setRotation4Scene(vRot);
         this.currentTime += timeDelta;
         if (progress >= 1.0) {
           if (this.mover.loopBool == true) {
             this.startTime = performance.now();
             this.el.object3D.position.set(mv.startPos.x, mv.startPos.y, mv.startPos.z);
             this.el.object3D.rotation.set(mv.startRot.x + mv.initRot.x, mv.startRot.y + mv.initRot.y, mv.startRot.z + mv.initRot.z);
            }
         }
       },
       convex_combination: function (t) {
         var mv = this.mover;
         var vVec = mv.startPos;

         if (!mv.middle1Pos) {
           mv.order4convex = 1;
           vVec = this.conv1vec(mv.startPos,mv.endPos,t);
           console.log("convex combination - order 1");
         } else {
           if (!mv.middle2Pos) {
             mv.order4convex = 2;
             vVec = this.conv2vec(mv.startPos,mv.middle1Pos,mv.endPos,t);
             console.log("convex combination - order 2");
           } else {
             mv.order4convex = 3;
             vVec = this.conv3vec(mv.startPos,mv.middle1Pos,mv.middle2Pos,mv.endPos,t);
             console.log("convex combination - order 3");
           }
         }
         console.log("convex_combination(t) = "+JSON.stringify(vVec));
         return vVec;
       },
       convex_rotation: function (t) {
         var mv = this.mover;
         var vVec = mv.startRot;

         if (!mv.middleRot1) {
           mv.order4rotation = 1;
           vVec = this.conv1vec(mv.startRot,mv.endRot,t);
           console.log("convex rotation - order 1");
         } else {
           if (!mv.middleRot2) {
             mv.order4rotation = 2;
             vVec = this.conv2vec(mv.startRot,mv.middle1Rot,mv.endRot,t);
             console.log("convex rotation - order 2");
           } else {
             mv.order4rotation = 3;
             vVec = this.conv3vec(mv.startRot,mv.middle1Rot,mv.middle2Rot,mv.endRot,t);
             console.log("convex rotation - order 3");
           }
         }
         console.log("convex_rotation(t) = "+JSON.stringify(vVec));
         return vVec;
       },

       setPosition4Scene: function(pPosition) {
         if (pPosition) {
           this.el.object3D.position.x = pPosition.x;
           this.el.object3D.position.y = pPosition.y;
           this.el.object3D.position.z = pPosition.z;
         }
       },
       setRotation4Scene: function(pRotation) {
         var mv = this.mover;
         if (pRotation) {
           // initRot is the initial rotation setting of object
           // rotation is added to the initial rotation
           this.el.object3D.rotation.x = pRotation.x;
           this.el.object3D.rotation.y = pRotation.y;
           this.el.object3D.rotation.z = pRotation.z;
         }
       },
       conv1: function (pStart,pEnd,t) {
         return (1-t)* pStart + t * pEnd
       },

       conv1vec: function (pStart,pEnd,t) {
         var vVec = {};
         for (var key in pStart) {
           vVec[key] = this.conv1(pStart[key],pEnd[key],t)
         }
         //console.log("conv1vec(pStart,pEnd,"+t+") - vVec="+JSON.stringify(vVec));
         return vVec
       } ,

       conv2: function (pStart,pMiddle1, pEnd,t) {
         return Math.pow(1-t,2) * pStart + 2 * (1-t)* t * pMiddle1 + Math.pow(t,2)*pEnd
       },

       conv2vec: function (pStart,pMiddle1,pEnd,t) {
         //console.log("conv2vec() - pStart="+JSON.stringify(pStart)+ " middle2Pos="+JSON.stringify(middle2Pos)+" pEnd="+JSON.stringify(pEnd));
         var vVec = {};
         for (var key in pStart) {
           vVec[key] = this.conv2(pStart[key],pMiddle1[key],pEnd[key],t)
         }
         console.log("conv2vec(pStart, pMiddle1, pEnd)="+JSON.stringify(vVec));
         return vVec
       },

       conv3: function (pStart,pMiddle1, pMiddle2, pEnd,t) {
         return Math.pow(1-t,3) * pStart + 3* Math.pow(1-t,2)* t * pMiddle1 + 3* (1-t) * Math.pow(t,2) * pMiddle2 + Math.pow(t,3)*pEnd;
       },

       conv3vec: function (pStart,pMiddle1,pMiddle2,pEnd,t) {
         //console.log("conv3vec() - pStart="+JSON.stringify(pStart)+ " pMiddle1="+JSON.stringify(pMiddle1)+ " pMiddle2="+JSON.stringify(pMiddle2)+" pEnd="+JSON.stringify(pEnd));
         var vVec = {};
         // iteration over "x", "y", "z"
         for (var key in pStart) {
           vVec[key] = this.conv3(pStart[key],pMiddle1[key],pMiddle2[key],pEnd[key],t)
         }
         console.log("conv3vec(pStart, pMiddle1,pMiddle2, pEnd)="+JSON.stringify(vVec));
         return vVec
       },


      });

    }


    startMovement4Aframe(pEntity) {
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
					         self.startMovement4Aframe();
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

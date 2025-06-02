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

 function XXstartMovement4AR(pMover) {
   console.log("startMovement4AR() pMover="+JSON.stringify(pMover,null,4));
   var vMoverID = pMover.id.toLowerCase();
   //AFRAME.registerComponent(vMoverID, {

   AFRAME.registerComponent(vMoverID, {
     mover: pMover,
     startTime: 0,
     currentTime: 0,

     init: function() {
       //this.el.object3D.scale.set(0.75, 0.75, 0.75);
       this.startTime = performance.now();
       console.log("init() ");
     },

     tick: function (time, timeDelta) {
       //this.el.object3D.rotation.y += 0.01
       var vPos = null;
       var vRot = null;
       var mv = this.mover;
       this.currentTime = performance.now();
       const elapsedTime = this.currentTime - this.startTime;
       const progress = Math.min(elapsedTime / mv.duration, 1);
       if (progress > 1.0) {
         // check if Loop circle ended
         if (mv.loopBool == true) {
           // start a new loop
           progress = 0.0;
           this.startTime = performance.now();
         }
       }
       // update position if progress <= 1.0
       // this includes loop reset
       if (progress <= 1.0) {
         //console.log("tick("+time+","+timeDelta+") Progress: "+progress+" Duration: "+mv.duration);
         var mv = this.mover;
         console.log("tick("+time+","+timeDelta+") pStart="+JSON.stringify(mv.startPos)+ " pMiddle="+JSON.stringify(mv.middlePos)+" pEnd="+JSON.stringify(mv.endPos));
       if (mv.middlePos) {
           vPos = this.conv2vec(mv.startPos,mv.middlePos,mv.endPos,progress);
         } else {
           vPos = this.conv1vec(mv.startPos,mv.endPos,progress);
         }
         console.log("setPosition4Scene(vPos) - vPos="+JSON.stringify(vPos));
         this.setPosition4Scene(vPos);
         vRot = this.conv2vec(mv.startRot,mv.endRot,progress);
         this.setRotation4Scene(vRot);
       }
     },

     setPosition4Scene: function(pPosition) {
       this.el.object3D.position.x = pPosition.x;
       this.el.object3D.position.y = pPosition.y;
       this.el.object3D.position.y = pPosition.z;
     },

     setRotation4Scene: function(pRotation) {
       this.el.object3D.rotation.x = pRotation.x;
       this.el.object3D.rotation.y = pRotation.y;
       this.el.object3D.rotation.z = pRotation.z;
     },

     conv1: function (pStart,pEnd,t) {
       return (1-t)* pStart + t * pEnd
     },

     conv1vec: function (pStart,pEnd,t) {
       var vVec = {};
       for (var key in pStart) {
         vVec[key] = this.conv1(pStart[key],pEnd[key],t)
       }
       return vVec
     } ,

     conv2: function (pStart,pMiddle, pEnd,t) {
       return Math.pow(1-t,2) * pStart + (1-t)* t * pMiddle + Math.pow(t,2)*pEnd
     },

     conv2vec: function (pStart,pMiddle,pEnd,t) {
       console.log("pStart="+JSON.stringify(pStart)+ " pMiddle="+JSON.stringify(pMiddle)+" pEnd="+JSON.stringify(pEnd));
       var vVec = {};
       for (var key in pStart) {
         vVec[key] = this.conv2(pStart[key],pMiddle[key],pEnd[key],t)
       }
       return vVec
     }

   });
 }


class ARMover {

    constructor(pID,pMode) {
        this.id = pID;
        this.mode4vr = pMode || "aframe";
        alert("ARMover('"+pID+"','"+pMode+"')");
        this.loopBool = false;

        this.order4convex = 1;
        this.startPos = { x: 0, y: 0, z: 0 };
        this.middlePos = null; // e.g. { x: 0, y: 0, z: 0 };
        this.middlePos2 = null; // e.g. { x: 0, y: 0, z: 0 };
        this.endPos = { x: 0, y: 0, z: 0 };
        this.startRot = { x: 0, y: 0, z: 0 };
        this.endRot = { x: 0, y: 0, z: 0 };
        this.duration = 5000; // Default duration in milliseconds 5 sec
        this.animationFrameId = null;
    }

    setLoop(pBoolean) {
        this.loopBool = pBoolean;
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
      if (this.mode4vr == "ar") {
        // mode4vr = "ar"
      } else {
        // mode4vr = "aframe"
        this.entity = document.getElementById(this.id);
        console.log("Position="+JSON.stringify(this.entity.getAttribute('position'),null,4)+" ");
        this.entity.setAttribute('position', this.startPos);
      }
    }

    setMiddlePosition(x, y, z) {
      this.order4convex = 2;
      this.middlePos = {
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
        this.entity = document.getElementById(this.id);
        this.entity.setAttribute('rotation', { "x": x, "y": y, "z": z });
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

    startMovement() {
      alert("startMovement() mode4vr="+this.mode4vr);
      if (this.mode4vr == "aframe") {
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
          var startPos = mv.startPos;
          this.el.object3D.scale.set(0.75, 0.75, 0.75);
          this.el.object3D.position.set(startPos.x, startPos.y, startPos.z);
          console.log("mover="+JSON.stringify(mv,null,4));
       },

       tick: function (time, timeDelta)
       {
         var mv = this.mover;
         this.el.object3D.position.x += 0.01;
         this.currentTime = performance.now();

         const elapsedTime = this.currentTime - this.startTime;
         const progress = Math.min(elapsedTime / this.mover.duration, 1);
         // console.log("Progress: "+progress);
         //var vVec = this.conv2vec(mv.startPos,mv.middlePos,mv.endPos,progress);
         var vPos = this.convex_combination(progress);
         console.log("tick() - vPos="+JSON.stringify(vPos)+" order4convex="+mv.order4convex);
         this.setPosition4Scene(vPos);
         var vRot = this.conv1vec(mv.startRot,mv.endRot,progress);
         this.setRotation4Scene(vRot);
         this.currentTime += timeDelta;
         if (progress >= 1.0) {
           if (this.mover.loopBool == true) {
             this.startTime = performance.now();
             this.el.object3D.position.set(mv.startPos.x, mv.startPos.y, mv.startPos.z);
             this.el.object3D.rotation.set(mv.startRot.x, mv.startRot.y, mv.startRot.z);
            }
         }
       },
       convex_combination: function (t) {
         var mv = this.mover;
         var vVec = mv.startPos;

         if (!mv.middlePos) {
           mv.order4convex = 1;
           vVec = this.conv1vec(mv.startPos,mv.endPos,t);
           console.log("convex combination - order 1");
         } else {
           if (!mv.middlePos2) {
             mv.order4convex = 2;
             vVec = this.conv2vec(mv.startPos,mv.middlePos,mv.endPos,t);
             console.log("convex combination - order 2");
           } else {
             mv.order4convex = 3;
             vVec = this.conv3vec(mv.startPos,mv.middlePos,mv.middlePos2,mv.endPos,t);
             console.log("convex combination - order 3");
         }
         }
         console.log("convex_combination(t) = "+JSON.stringify(vVec));
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
         if (pRotation) {
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

       conv2: function (pStart,pMiddle, pEnd,t) {
         return Math.pow(1-t,2) * pStart + 2 * (1-t)* t * pMiddle + Math.pow(t,2)*pEnd
       },

       conv2vec: function (pStart,pMiddle,pEnd,t) {
         //console.log("conv2vec() - pStart="+JSON.stringify(pStart)+ " pMiddle="+JSON.stringify(pMiddle)+" pEnd="+JSON.stringify(pEnd));
         var vVec = {};
         for (var key in pStart) {
           vVec[key] = this.conv2(pStart[key],pMiddle[key],pEnd[key],t)
         }
         console.log("conv2vec(pStart, pMiddle, pEnd)="+JSON.stringify(vVec));
         return vVec
       },

       conv3: function (pStart,pMiddle1, pMiddle2, pEnd,t) {
         return Math.pow(1-t,3) * pStart + 3* Math.pow(1-t,2)* t * pMiddle1 + 3* (1-t) * Math.pow(t,2) * pMiddle2 + Math.pow(t,3)*pEnd;
       },

       conv3vec: function (pStart,pMiddle1,pMiddle2,pEnd,t) {
         //console.log("conv3vec() - pStart="+JSON.stringify(pStart)+ " pMiddle1="+JSON.stringify(pMiddle1)+ " pMiddle2="+JSON.stringify(pMiddle2)+" pEnd="+JSON.stringify(pEnd));
         var vVec = {};
         for (var key in pStart) {
           vVec[key] = this.conv3(pStart[key],pMiddle[key],pEnd[key],t)
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

            if (this.middlePos) {
              x = (1-progress)**(2) * this.startPos.x + 2 * (1-progress)* progress * this.middlePos.x + (progress**2) * this.endPos.x ;
              y = (1-progress)**(2)  * this.startPos.y + 2 * (1-progress)* progress * this.middlePos.y + (progress**2) * this.endPos.y ;
              z = (1-progress)**(2)  * this.startPos.z + 2 * (1-progress)* progress * this.middlePos.z + (progress**2) * this.endPos.z ;
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

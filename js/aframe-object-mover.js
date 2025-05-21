/*
 * Aframe Object Mover
 * 
 * move objects with a given id in the 3D space of aframe
 * the following code shows how to use the Aframe
		// Create an instance of ObjectMover for the box
        const boxMover = new AframeMover('movingBox');

        // Set start and end positions
        boxMover.setStartPosition(0, 1.6, -5);
        boxMover.setEndPosition(2, 1.6, -10);

        // Set start and end rotations
        boxMover.setStartRotation(0, 0, 0);
        boxMover.setEndRotation(0, 360, 0);

        // Set duration
        boxMover.setDuration(5000); // 5 seconds

        // Start the movement
        boxMover.startMovement();
 */


class AframeMover {
    constructor(pID) {
		this.id = pID
        this.entity = document.getElementById(pID);
        if (this.entity) {
			console.log("Aframe object with the ID ["+this.id+"] exists");
		} else {
			console.error("ERROR: Aframe object with the ID ["+this.id+"] does not exists");
		}		
		this.loopBool = false;
        this.startPos = { x: 0, y: 0, z: 0 };
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
        this.startPos = { x, y, z };
        this.entity.setAttribute('position', this.startPos);
    }
	
    setEndPosition(x, y, z) {
        this.endPos = { x, y, z };
    }

    setStartRotation(x, y, z) {
        this.startRot = { x, y, z };
        this.entity.setAttribute('rotation', this.startRot);
    }

    setEndRotation(x, y, z) {
        this.endRot = { x, y, z };
    }

    setDuration(duration) {
        this.duration = duration;
    }

    startMovement() {
	const self = this;
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);

            const x = this.startPos.x + (this.endPos.x - this.startPos.x) * progress;
            const y = this.startPos.y + (this.endPos.y - this.startPos.y) * progress;
            const z = this.startPos.z + (this.endPos.z - this.startPos.z) * progress;

            const rx = this.startRot.x + (this.endRot.x - this.startRot.x) * progress;
            const ry = this.startRot.y + (this.endRot.y - this.startRot.y) * progress;
            const rz = this.startRot.z + (this.endRot.z - this.startRot.z) * progress;

            this.entity.setAttribute('position', { x, y, z });
            this.entity.setAttribute('rotation', { x: rx, y: ry, z: rz });

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
		console.log("Check Loop Animation loopBool="+this.loopBool);
		if (this.loopBool == true) {
			console.log("Loop Animation loopBool="+this.loopBool);
			self.startMovement();
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

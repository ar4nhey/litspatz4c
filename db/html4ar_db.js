vDataJSON.html4ar = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AR.js - ___TITLE___ - ___MARKER___ </title>
  <script src="___DIR___/js/aframe-1.2.0.js"></script>
  <script src="___DIR___/js/aframe-ar.js"> </script>
  <script src="___DIR___/js/aframe-1.7.0-extras.js"></script>
  <script src="___DIR___/js/ar-object-mover.js"></script>
  <script>
        // Include the ObjectMover class
        // Create an instance of ObjectMover for the box
        // const scale4dist = 1.0;
        const ___MOVEID___Mover = new ARMover('___MOVEID___','ar');
        ___HTML4REF2MOVER___
        // Time stamps alternative hide/show
        // ___MOVEID___Mover.setVisibleTimes([ 0.1 , 0.3 , 0.5 , 0.7 , 0.9]);
        // 0.1 = Hide after 10% of animation time
        // 0.3 = Show after 30% of animation time
        // 0.5 = Hide after 50% of animation time
        // ...
        // All positions are 3D coordinates (x,y,z)
        // x: -left/+right
        // y: -down/+up
        // z: -rear/+front
        // (0,0,0) is the marker position
        ___MOVEID___Mover.setStartPosition___VERTICAL___(___STARTPOS4K___);
        ___MOVEID___Mover.setMiddle1Position___VERTICAL___(___MIDDLE1POS4K___);
        ___MOVEID___Mover.setMiddle2Position___VERTICAL___(___MIDDLE2POS4K___);
        ___MOVEID___Mover.setEndPosition___VERTICAL___(___ENDPOS4K___);
        ___MOVEID___Mover.setLoop(___LOOPBOOL___);

        // Set start and end rotations for x-axis, y-axis, z-axis
        // Set the angles with radians e.g. 3.141593 = 180 degress
        ___MOVEID___Mover.setStartRotation___VERTICAL___(___STARTROT4K___);
        //___MOVEID___Mover.setMiddle1Rotation___VERTICAL___(0 , 3.131593 , 0);
        //___MOVEID___Mover.setMiddle2Rotation___VERTICAL___(0 , -1.5 , 0);
        ___MOVEID___Mover.setEndRotation___VERTICAL___(___ENDROT4K___);

        // Set the scales with 1.0 is not scale
        // var vScale = 1.0;
        //___MOVEID___Mover.setStartScale___VERTICAL___(vScale, vScale, vScale);
        // vScale = 1.0;
        //___MOVEID___Mover.setMiddle1Scale___VERTICAL___(vScale, vScale, vScale);
        // vScale = 1.0;
        //___MOVEID___Mover.setMiddle2Scale___VERTICAL___(vScale, vScale, vScale);
        // vScale = 1.0;
        //___MOVEID___Mover.setEndScale___VERTICAL___(vScale, vScale, vScale);

        // Set duration
        ___MOVEID___Mover.setDuration(___DURATION___); // i.e. ___DURATION___/1000 seconds

        // Start the movement
        ___MOVEID___Mover.startMovement();
  </script>

</head>
<body style="margin : 0px; overflow: hidden;">
  <a-scene embedded arjs>
  <a-marker preset="___MARKER___">
    <a-entity ___MOVEID___ position="___STARTPOS___">
      <a-entity
        position="___STARTPOS___"
        rotation="___STARTROT___"
        scale="___SCALE___ ___SCALE___ ___SCALE___"
        animation-mixer="loop: repeat"
        gltf-model="___DIR___/___GLB___" >
      </a-entity>
    </a-entity>
  </a-marker>
  <a-light type="ambient" color="#FFF" light=""></a-light>
  <a-light type="point" color="#fff" position="0 3 0" light=""></a-light>
  <a-light type="point" color="#fff" position="3 3 0" light=""></a-light>
  <a-light type="point" color="#fff" position="-3 3 0" light=""></a-light>
  <a-light type="point" color="#fff" position="3 3 -3" light=""></a-light>
  <a-light type="point" color="#fff" position="-3 3 -3" light=""></a-light>
  <a-light type="point" color="#fff" position="1.5 3 0" light=""></a-light>

    <!-- Define the camera -->
    <a-entity camera></a-entity>
  </a-scene>
</body>
</html>

`;

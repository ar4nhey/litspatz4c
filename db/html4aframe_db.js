vDataJSON.html4aframe = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>___TITLE___</title>
    <script src="___DIR___/js/aframe-1.7.0.js"></script>
    <script src="___DIR___/js/aframe-extras.js"></script>
    <script src="___DIR___/js/aframe-object-mover.js"></script>
	<script>
        // Include the ObjectMover class
        // Create an instance of ObjectMover for the box
        // const scale4dist = 1.0;
        const ___MOVEID___Mover = new AframeMover('___MOVEID___','ar');
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
        ___MOVEID___Mover.setStartPosition(___STARTPOS4K___);
        ___MOVEID___Mover.setMiddle1Position(___MIDDLE1POS4K___);
        ___MOVEID___Mover.setMiddle2Position(___MIDDLE2POS4K___);
        ___MOVEID___Mover.setEndPosition(___ENDPOS4K___);
        ___MOVEID___Mover.setLoop(___LOOPBOOL___);

        // Set start and end rotations for x-axis, y-axis, z-axis
        // Set the angles with radians e.g. 3.141593 = 180 degress
        ___MOVEID___Mover.setStartRotation(___STARTROT4K___);
        //___MOVEID___Mover.setMiddle1Rotation(0 , 3.131593 , 0);
        //___MOVEID___Mover.setMiddle2Rotation(0 , -1.5 , 0);
        ___MOVEID___Mover.setEndRotation(___ENDROT4K___);

        // Set the scales with 1.0 is not scale
        // var vScale = 1.0;
        //___MOVEID___Mover.setStartScale(vScale, vScale, vScale);
        // vScale = 1.0;
        //___MOVEID___Mover.setMiddle1Scale(vScale, vScale, vScale);
        // vScale = 1.0;
        //___MOVEID___Mover.setMiddle2Scale(vScale, vScale, vScale);
        // vScale = 1.0;
        //___MOVEID___Mover.setEndScale(vScale, vScale, vScale);

        // Set duration
        ___MOVEID___Mover.setDuration(___DURATION___); // i.e. ___DURATION___/1000 seconds

        // Start the movement
        ___MOVEID___Mover.startMovement();
	</script>

</head>
<body>
  <a-scene inspector="" keyboard-shortcuts="" screenshot="" vr-mode-ui="" device-orientation-permission-ui="" visible="">
    <!-- Load the 3D model -->
    <a-assets>
      <a-asset-item id="my3dmodel" src="___DIR___/___GLB___"></a-asset-item>
      <img id="sky" src="___DIR___/___SKY___">
    </a-assets>

    <!-- Add the 3D model to the scene -->
    <a-entity gltf-model="#my3dmodel" ___MOVEID___
      scale="___SCALE___ ___SCALE___ ___SCALE___"
      position="___STARTPOS___"
      rotation="___STARTROT___"
      animation-mixer></a-entity>

    <!-- Add some basic lighting -->
    <a-light type="ambient" color="#FFF" light=""></a-light>
    <a-light type="point" color="#fff" position="0 2 2" light=""></a-light>
	  <a-sky src="#sky"></a-sky>
    <!-- Add a camera e.g. position="0 2 2" rotation="0 0 0" -->
    <a-camera position="___CAMPOS___" camera="" rotation="___CAMROT___" look-controls="" wasd-controls="" data-aframe-inspector-original-camera=""></a-camera>
  <div class="a-loader-title" style="display: none;">___TITLE___</div></a-scene>
</body>
</html>

`;

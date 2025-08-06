vDataJSON.html4argeo = `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>AR.js - ___TITLE___ - Geolocation </title>
        <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
        <!--
        <script src="___DIR___/js/aframe-1.2.0.js"></script>
        <script src="___DIR___/js/aframe-ar.js"> </script>
        <script src="___DIR___/js/aframe-1.7.0-extras.js"></script>
        -->
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

    <body style="margin: 0; overflow: hidden;">
        <a-scene
            renderer="logarithmicDepthBuffer: true;"
            embedded
            loading-screen="enabled: false;"
            arjs="sourceType: webcam; debugUIEnabled: false;"
        >
            <a-assets>
                <a-asset-item
                    id="animated-asset"
                    src="___DIR___/___GLB___"
                ></a-asset-item>
            </a-assets>
            <!-- GEOLOCATION 1 - ___TITLE___
              -- Entity as reference point in scene
            -->
             <a-entity
                    look-at="[gps-camera]"
                    scale="10.0 ___SCALE___ ___SCALE___"
                    gps-entity-place="latitude: ___LAT___; longitude: ___LONG___;">

                    <!-- OBJECT 1 -----
                    placed in scene at (___STARTPOS4K___)
                    with relative coordinate system for geolocation.
                    -->
		    <a-entity ___MOVEID___ position="___STARTPOS___" 
                        animation-mixer="loop: repeat"
                        scale="___SCALE___ ___SCALE___ ___SCALE___"
                        gltf-model="#animated-asset"
                    ></a-entity>
            </a-entity>

            <a-camera gps-camera rotation-reader></a-camera>
        </a-scene>
    </body>
</html>

`;

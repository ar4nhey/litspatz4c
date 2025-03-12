## readme litspatz4c
Dies ist die Datei zum LitSpatz4C

## AR.js

The following 3D models were published by Sketchfab as Creative Commons resources:

### Elf Wizzard

* 3D-Model - [GLB elf\_wizard\_small.glb](model3d/elf_wizard_small.glb)

* AR.js - [elf\_wizard\_small.html - Hiro-Marker](elf_wizard_small.html)

* URL Source:
  <https://sketchfab.com/3d-models/elf-wizard-ca5564a738174feca82c9d89610c017d>

* Licence Info - "Elf Wizard" by Muru is licensed under Creative Commons Attribution (<http://creativecommons.org/licenses/by/4.0/>).

### Running Boy

* 3D-Model - [GLB running\_boy.glb](model3d/running_boy.glb)

* AR.js - [running\_boy.html - Hiro-Marker](running_boy.html)

* URL Source: <https://sketchfab.com/3d-models/running-boy-cc35616b7d064559828cd99d840738f5>

* Licence Info: "Running boy" (<https://skfb.ly/p9ZNB>) by alexeyshadrin80 is licensed under Creative Commons Attribution (<http://creativecommons.org/licenses/by/4.0/>).

### Running Girl

* 3D-Model - [GLB mei.glb](model3d/mei.glb)

* AR.js - [mei.html - Hiro-Marker](mei.html)

* URL Source: <https://sketchfab.com/3d-models/mei-5478ddd14bf044e59e02bda57ec46edb>

* Licence Info: "Mei" by cgart.com is licensed under Creative Commons Attribution (<http://creativecommons.org/licenses/by/4.0/>).

### Wizzard Stick

* 3D-Model - [GLB wizard\_staff.glb](model3d/wizard_staff.glb)

* AR.js - [wizard\_staff.html - Hiro-Marker](wizard_staff.html)

* URL Source: <https://sketchfab.com/3d-models/wizard-staff-873f596fb3cc44998cb75a3dce60181f>

* License Info - Wizzard stick with the name "Wizard Staff" by tpbleu is licensed under Creative Commons Attribution (<http://creativecommons.org/licenses/by/4.0/>).

## Embedding of 3D Models with AR.js

### Used Marker

The used marker for the 3D models is the [Hiro marker](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf). The definition of the marker in the HTML code is done with the `a-marker` tag an the preset definition for the [Hiro marker](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf):

```html
<a-marker preset="hiro">
```

### Entity Tag for 3D model

The following `entity` tag embeds the 3D model

```html
<a-entity
      position="0 0 0"
      rotation="0 90 0"
      scale="2.0 2.0 2.0"
      animation-mixer="loop: repeat"
      gltf-model="./model3d/elf_wizard_small.glb"
      ></a-entity>
```

### Pathname to 3D Model

The 3D model is a GLB file `elf_wizard_small.glb` located in the subdirectory `model3d/`. The attribute `gltf-model` is used to specify the pathname.

```html
<a-entity  
    ...
    gltf-model="./model3d/elf_wizard_small.glb"
   ></a-entity>
```

### Position of the 3D Model

Position of the 3D model on the marker is defined by (x,y,z) coordinates.

* x-axis is left(-) right(+),

* y-axis is up(+) down(-),

* z-axis is front(-) backwards(+)
  with reference to the origin (0,0,0). With the following position the 3D model is placed at the origin over the marker.

```html
<a-entity
    ...
    position="0 0 0"
    ...
   ></a-entity>
```

### Rotation of the 3D Model

Rotation of the 3D model around the x-axis, y-axis and z-axis is defined by the following tag attribute. y-axis rotation with 90 degress is defined by the following angles:

```html
<a-entity
    ...
    rotation="0 90 0"
    ...
   ></a-entity>
```

### Size of the 3D Model

Scaling of the 3D model can be performed for the x-axis, y-axis and z-axis seperately. So you need to specify 3 values that in general equal to have the aspect ratio preserved in the scaled model.
Especially the 3D model `running_boy.glb` was very small on the marker and was visible just as a dot. So scaling was necessary with a scale factor of 120 for the x-axis, y-axis and z-axis with:

```html
<a-entity
    ...
    scale="120.0 120.0 120.0"
    ...
   ></a-entity>
```

In general unscaled models will have the settings for the scale factor `1.0`

```html
<a-entity
    ...
    scale="1.0 1.0 1.0"
    ...
   ></a-entity>
```

In following setting with scale the width by the factor 3.0, the height of the model by the factor `2.0` and the depth of the vector remains unchanged with the scale factor `1.0`

```html
<a-entity
    ...
    scale="3.0 2.0 1.0"
    ...
   ></a-entity>
```

## Folders

* `index.html` is the main starting page of the repository that contains links to all HTML files available in this repository.

* The directory `model3d/` contains all 3D models of the repository, that are listed above.

* all 3D models have a correponding HTML file with the same base name.  E.g. the 3D model `elf_wizard_small.glb` in the folder `model3d/` has the corresponding HTML file `elf_wizard_small.html` that is used to display the 3D model in the browser.

* The directory `js/` contains all Javascript sources required for the showing animated GLB files in a browser with [AR.js](https://ar-js-org.github.io/AR.js-Docs/).

## Usage on a Web Server

Copy the models with the folders `js/` and `model3d/` in folder of you web server (e.g. <https://www.example.com>). If the content is available in the subdirectory `mymodels/` of the server root directory, then you `index.html` will be available under the URL <https://www.example.com/mymodels/index.html> .

## Modification of 3D Models

To modify existing models in the folder `model3d/` it is recommended to
use the Open Source software
[Blender](https://www.blender.org/download/).

* If you are a novice start with a [Blender Cup tutorial](https://www.youtube.com/watch?v=anG15t4od80)

* [Tutorial: Blender MODELLING For Absolute Beginners - Simple Human](https://www.youtube.com/watch?v=9xAumJRKV6A)

* [How to make a Character in Blender - My Full Process in 10 Minutes](https://www.youtube.com/watch?v=TumrA0XsX0A)

* [Rigging - Bones of Character - Animation](https://www.youtube.com/watch?v=m-Obo_nC3SM)


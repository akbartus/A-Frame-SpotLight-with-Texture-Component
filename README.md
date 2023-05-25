# A-Frame-SpotLight-with-Texture-Component
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is an A-Frame component, which demonstrates spotlight with texture. It can also be called as a projected texture because texture is dynamically projected on mesh surfaces. The component was created based on the works by Marco Fugaro named <a href="https://github.com/marcofugaro/three-projected-material">Three Projected Material</a>, <a href="https://github.com/marcofugaro/codrops-texture-projection">Codrops Texture Projection</a> as well as Spotlight example provided in <a href="https://threejs.org/examples/#webgl_lights_spotlight">Three.js library</a>.     

### **Instructions**
In order to use the component attach "spotlight-texture" to "a-scene". The component has the following attributes: 
* <b>headerUrl: { type: "string", default: "vologram/header.vols" }</b> - the URL/link to header.vols file as generated by Volu App of Volograms.
* <b>sequenceUrl: { type: "string", default: "vologram/sequence_0.vols" }</b> - the URL/link to sequence_0.vols file as generated by by Volu App of Volograms.
* <b>videoUrl: { type: "string", default: "vologram/texture_2048_h264.mp4" }</b> - the URL/link to video texture file as generated by by Volu App of Volograms.
* <b>vologramFps: {type: "float", default: 30.0}</b> - frames per second of the vologram file.

The code below shows the sample implementation of the component:
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <Title>A-Frame Component: Volumetric Video</Title>
    <script src='https://aframe.io/releases/1.4.2/aframe.min.js'></script>
    <script src="js/vologram-component.js"></script>
    <style>
        #button-container {
            position: fixed;
            bottom: 0;
            width: 300px;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 5%;
            width: 200px;
            text-align: center;
            z-index: 3;
        }
        #load-vologram,
        #play-vologram,
        #pause-vologram {
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div id="button-container">
        <input type="button" id="load-vologram" value="Load">
        <input type="button" id="play-vologram" value="Play">
        <input type="button" id="pause-vologram" value="Pause">
    </div>

    <a-scene>
        <a-entity id="vologram"
            vologram-component="headerUrl: vologram/header.vols; sequenceUrl: vologram/sequence_0.vols; videoUrl: vologram/texture_2048_h264.mp4; vologramFps: 30.0"
            position="0 0 -3"></a-entity>
        <a-plane position='0 0 -4' rotation='-90 0 0' width='4' height='4' color='#7BC8A4'></a-plane>
        <a-sky color='#ECECEC'></a-sky>
    </a-scene>
</body>
</html>
```
Please note that component has three buttons which do the following: load vologram and plays video; plays vologram video; pauses vologram video.

### **Exporting Volograms from Volu app** 
<a href="https://apps.apple.com/us/app/volu-3d-volumetric-holograms/id1555245459">Volu</a> is the application by Volograms, which is only available for IOS devices at present. It is possible to generate volumetric videos of persons by using this app (it is free) and export related files (it is also free) for using in different development environments. 
In order to export own vologram, consisting of 3 files (header.vols, sequence_0.vols - sequence of meshes, texture_1024_h264.mp4 - video with texture), which are used in this component, do the following:
1. Register free acount and generate own vologram.
2. In the "Edit Vologram" menu (please note that you can only edit own vologram; example volograms do not have such an option), use "Export" button to export vologram. Make sure to save it as .zip file in the local system.
3. Download/copy .zip file to your PC and unzip it. Take resulting 3 files and put them inside vologram folder or any other place you want (make sure that the URL reflects that).

### **Limitations**
The component uses requestVideoFrameCallback() extension, which is needed for synchronous video frame fetching. However this callback is not supported on all <a href="https://caniuse.com/mdn-api_htmlvideoelement_requestvideoframecallback">browsers</a> yet. In my tests it worked well with the following browsers:  Safari (IOS), Samsung (Android). Firefox (Android) does not work well (although texture gets updated mesh remains the same).  Chrome (Android) unfortunately does not work yet (although desktop Chrome browser works well with it).  

### **Texture rendering**
Sometimes texture is not rendered well on the mesh (some glitches emerge). Slight change of fps can solve the issue. For example, making fps 30.02 solves the problem.  

### **Tech Stack**
The project is powered by AFrame and Three.js. Sample vologram was taken from <a href="https://github.com/Volograms/vol_libs">vol_libs</a> repository. 

### **Demo**
See demo of the component here: [Demo](https://volumetric-vid.glitch.me/)

AFRAME.registerComponent('spotlight-texture', {
    schema: {
        lightHelper: { type: 'boolean', default: true },
        spotlightShadow: { type: 'boolean', default: false },
        spotlightDynamic: { type: 'boolean', default: false },
        spotlightColor: { type: 'color', default: '#ffffff' },
        spotlightIntensity: { type: 'float', default: 10 },
        spotlightDistance: { type: 'float', default: 100 },
        spotlightAngle: { type: 'float', default: 0.5 },
        spotlightPenubra: { type: 'float', default: 1 },
        spotlightDecay: { type: 'float', default: 2 },
        spotlightFocus: { type: 'float', default: 1 },
        spotlightPosition: { type: 'vec3', default: { x: 10, y: 35, z: 10 } },
        imgTexture: { type: 'boolean', default: true },
        imgTextureSrc: { type: 'string', default: '' },
        videoTextureSrc: { type: 'string', default: '' },
    },
    init: function () {
        let renderer, scene;
        renderer = this.el.renderer;
        scene = this.el.object3D;

        let videoElement = document.createElement('video');
        videoElement.id = 'video';
        videoElement.crossOrigin = 'anonymous';
        videoElement.type = 'video/mp4';
        videoElement.src = this.data.videoTextureSrc;
        videoElement.autoplay = true;
        videoElement.muted = true; // remove this if necessary
        videoElement.loop = true;
        videoElement.playsInline = true;
        document.body.appendChild(videoElement);
        videoElement.play();
    
        let videoTexture = new THREE.VideoTexture(videoElement);
        
        if (this.data.spotlightShadow == true) {
            renderer.shadowMap.enabled = true;
        } else {
            renderer.shadowMap.enabled = false;
        }
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;

        const loader = new THREE.TextureLoader().setPath('');
        const filename = this.data.imgTextureSrc;
        const texture = loader.load(filename);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        this.spotLight = new THREE.SpotLight(this.data.spotlightColor);
        this.spotLight.intensity = this.data.spotlightIntensity;
        this.spotLight.angle = this.data.spotlightAngle;
        this.spotLight.penumbra = this.data.spotlightPenubra;
        this.spotLight.decay = this.data.spotlightDecay;
        this.spotLight.distance = this.data.spotlightDistance;
        if (this.data.imgTexture == true) {
            this.spotLight.map = texture;
        } else {
            this.spotLight.map = videoTexture;
        }
        this.spotLight.castShadow = true;
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;
        this.spotLight.shadow.camera.near = 10;
        this.spotLight.shadow.camera.far = 200;
        this.spotLight.shadow.focus = this.data.spotlightFocus;
        this.spotLight.position.set(this.data.spotlightPosition.x, this.data.spotlightPosition.y, this.data.spotlightPosition.z);
        scene.add(this.spotLight);

        if (this.data.lightHelper) {
            this.lightHelper = new THREE.SpotLightHelper(this.spotLight);
            scene.add(this.lightHelper);
        }

        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.MeshLambertMaterial({ color: 0x808080 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, - 1, 0);
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
    },
    tick: function () {
        if (this.data.spotlightDynamic == true) {
            const time = performance.now() / 3000;
        this.spotLight.position.x = Math.cos(time) * 25;
        this.spotLight.position.z = Math.sin(time) * 25;
        }
        if (this.data.lightHelper) {
            this.lightHelper.update();
        }
    }
});

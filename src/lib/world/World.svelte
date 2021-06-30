<script>

    import * as THREE from 'three';
    import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
    import { addAlert } from '../stores/alerts.js';
    import { position } from '../stores/position.js';

    let camera, scene, renderer, controls;

    const objects = [];

    let raycaster;

    let playing = false;
    let loaded = false;

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;

    let prevTime = performance.now();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const vertex = new THREE.Vector3();
    const color = new THREE.Color();

    // animate();

    function init( element ) {

        // camera
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 10;

        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        scene.fog = new THREE.Fog( 0xcccccc, 100, 200 );

        // light
        const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        // controls
        controls = new PointerLockControls( camera, document.body );

        controls.addEventListener( 'lock', function () {
            playing = true;
        } );

        controls.addEventListener( 'unlock', function () {
            playing = false;
        } );

        // add scene
        scene.add( controls.getObject() );

        raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        // floor 1 x 1 meter Raster

        const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );

        var geometry = new THREE.BufferGeometry();
        var size = 1000;
        var grid = 10;
        var position = [];
        for ( var i = 0; i <= size; i+= grid ) {
            position.push( i-(size/2), 0, -size/2, i-(size/2), 0, size/2 );
            position.push( -size/2, 0, i-(size/2), size/2, 0, i-(size/2) );
        }
        geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ) );
        var lineSegments = new THREE.LineSegments( geometry, lineMaterial );
        lineSegments.computeLineDistances();
        scene.add( lineSegments );

        // objects

        const solidMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, linewidth: 2 } );

        function random(){
            return Math.ceil( Math.random() * 6 ) * 10;
        }

        for ( let i = 0; i < 200; i ++ ) {

            let height = random();

            const boxGeometry = new THREE.BoxGeometry( 20, height, 20 ).toNonIndexed();
            const wireframe = new THREE.WireframeGeometry( boxGeometry );

            const box = new THREE.Mesh( boxGeometry, solidMaterial );
            const line = new THREE.LineSegments( wireframe, lineMaterial );

            box.position.x = Math.floor( Math.random() * 20 - 10 ) * 30;
            box.position.y = Math.max( height / 2, Math.floor( Math.random() * 20 ) * 4 + (height / 2) - 80 );
            // box.position.y = 10; // vertical
            box.position.z = Math.floor( Math.random() * 20 - 10 ) * 30;

            line.position.x = box.position.x;
            line.position.y = box.position.y;
            line.position.z = box.position.z;

            scene.add( line );
            scene.add( box );
            objects.push( box );

        }

        // renderer

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        element.appendChild( renderer.domElement );

        animate();
        loaded = true;

    }

    // interaction
    const handleKeydown = function ( event ) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
            case 'Space':
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;
        }
    };

    const handleKeyup = function ( event ) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };

    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    let positionX = 0;
    let positionZ = 0;

    $: position.set({ x: positionX, y: positionZ });

    function animate() {

        requestAnimationFrame( animate );

        const time = performance.now();

        if ( controls.isLocked === true ) {

            raycaster.ray.origin.copy( controls.getObject().position );
            raycaster.ray.origin.y -= 10;

            const intersections = raycaster.intersectObjects( objects );

            const onObject = intersections.length > 0;

            const delta = ( time - prevTime ) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            direction.z = Number( moveForward ) - Number( moveBackward );
            direction.x = Number( moveRight ) - Number( moveLeft );
            direction.normalize(); // this ensures consistent movements in all directions

            if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

            if ( onObject === true ) {

                velocity.y = Math.max( 0, velocity.y );
                canJump = true;

            }

            controls.moveRight( - velocity.x * delta );
            controls.moveForward( - velocity.z * delta );

            controls.getObject().position.y += ( velocity.y * delta ); // new behavior

            positionX = Math.round( controls.getObject().position.x / 5 );
            positionZ = Math.round( controls.getObject().position.z / 5 );

            if ( controls.getObject().position.y < 10 ) {

                velocity.y = 0;
                controls.getObject().position.y = 10;

                canJump = true;

            }

        }

        prevTime = time;

        renderer.render( scene, camera );

    }

    function enter(){
        controls.lock();
        addAlert('Press ESC to stop');
    }

</script>

<svelte:window on:resize={handleResize} on:keydown={handleKeydown} on:keyup={handleKeyup} />

{#if playing === false}
    <div class="ui">

        {#if loaded}
            <button class="bubble" on:click={enter}>Enter</button>
        {/if}

    </div>
{/if}

<div class="container" use:init></div>

<style>
    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .ui {
        z-index: 5;
        display: flex;
        background-color: rgba(0,0,0,0.5);
        align-items: center;
        justify-content: center;
    }
</style>

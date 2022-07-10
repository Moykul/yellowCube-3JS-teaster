import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

// const canvas = document.getElementById('ctx');
// canvas.appendChild(renderer.domElement); 

/* DEBUG declared -- note position of debug is important!! ---*/
const gui = new dat.GUI()

//Cursor
const cursor = {
    x: 0,
    y: 0
}
addEventListener('mousemove', (event) =>
{
    cursor.y = event.clientY / sizes.height -0.5
    // // console.log(cursor.y)

    cursor.x = event.clientX / sizes.width - 0.5
    // console.log(cursor.x)
})
//canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener( 'resize', () =>
{
    //update window
    sizes.width = window.innerWidth
    sizes.height = window,innerHeight
    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => 
{
    // console.log('dblClick')
    const fullScreenElement = document.fullscreenElement || document.webkitRequestFullScreen

    if(!fullScreenElement){
           if(canvas.requestFullscreen) 
           {
                canvas.requestFullscreen()
           }
           else if(canvas.webkitRequestFullScreen)
           {
                canvas.webkitRequestFullScreen()
           }
        }
    else
    {
        document.exitFullscreen()
    }
})

// Scene
const scene = new THREE.Scene()


/* DEBUG */
//colour picker
const parameters = {
    color: 0xffbb55,
    // this is cool, having all the functions for various buttons here 
    reset: () => {
        //console.log('reset camera position')
        mesh.position.y = 0
        mesh.position.x = 0
        mesh.rotation.y = 0
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 0
        camera.rotation.x = 0
        camera.rotation.y = 0
        camera.rotation.z = 0
        mesh.position.z = .5
        camera.position.z = -3
        camera.lookAt(mesh.position)
        // lovely little snippet for resetting sliders
        gui.__controllers.forEach(controller => 
            controller.setValue(controller.initialValue));

    },
    spin: () =>
    {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 12})
    }
}

gui.addColor(parameters, 'color')
    .name('pick colour')
    .onChange(()=>{
        material.color.set(parameters.color)
    })

// reset camera position reset cube
gui.add(parameters, 'reset')
    .name('Reset Scene')


// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color})
const mesh = new THREE.Mesh(geometry, material)
// position
// mesh.position.x = 0.6
// mesh.position.y = -0.7
mesh.position.z = .5

scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = -3
camera.lookAt(mesh.position)
scene.add(camera)


// debug UI controls etc..

//sliders
gui.add(mesh.position, 'x', -3, 3, 0.1 )
    .name('move-X')
gui.add(mesh.position, 'y', -3, 3, 0.1 )
    .name('move-Y')
gui.add(mesh.rotation, 'y', -3, 3, 0.1 )
    .name('Rot-Y')


// spin button
gui.add(parameters, 'spin')
    .name('Spin Cube')



    

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Controls
// const controls = new OrbitControls(camera, canvas)
const controls = new OrbitControls( camera, renderer.domElement )
// camera.position.set( 0, 5, 1 );
controls.update();


//gsap - animation library(has its own animation tick)
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
// gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})

// animTick
const clock = new THREE.Clock()

const animTick = () =>
{
    //clock
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)
    
    //update objects
    // mesh.rotation.y += 0.01;
    //console.log(animTick)
//*******************************************************
    //UPDATE CAMERA - camera controls without controls library
    // camera.position.x = cursor.x * -10
    // camera.position.y = cursor.y * 10
    // camera.position.x = Math.sin(cursor.x*Math.PI*2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI*2) * -2

    // camera.position.y = Math.sin(cursor.y*Math.PI*2) * 2
    // //camera.position.z = Math.cos(cursor.y * Math.PI*2) * 2
    
    // camera.lookAt(mesh.position)
    // // camera.lookAt(new THREE.Vector3())
//********************************************************
    window.requestAnimationFrame(animTick)

    // render
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
}
animTick()

/*************************************************/


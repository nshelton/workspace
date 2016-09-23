// Global variables we can access and use anywhere
// in our script

// The cubes array will be used to store all of our cube objects
var cubes = [];

// These will be used for our THREE.js scene
// We made them global so they could be easily accessed
// by the animate function which runs in a loop
var camera, scene, renderer;
var scene3dHeight = 200;
var scene3dWidth = 600;

// created to keep track of our current frame
// no real use other than for stats display
var currentFrame = 0;

$( document ).ready(function() {
  // This code will run once the browser has finished
  // everything it needs to do to load our page

  // Once our page/document is ready we run the following
  // 4 functions

  // this function creates and defines all of our cubes
  initCubes();

  // this function renders our cubes array in simple html
  printCraigsList();

  // this function creates a simple 3d sceen containing our cubes
  init3dScene();

  // this function runs in a loop and updates the rotation of our cubes
  animate3dScene();
  //$("#divResults").html("asdfasdf");


  // ----------------------------------------------------------------------
  // Now we define each function

  // initCubes creates 3 new custom objects
  // we decided to call them cubes
  // and gave them 4 attributes
  // that will be later used for styling
  // and 3d behavior
  function initCubes(){
    // this creates an empty object named cube1
    var cube1 = {};
      // once the object is created we can add any atributes we like
      // and refer to them later when needed
      cube1.x = -220;
      cube1.rotateSpeed = 0.01;
      cube1.size = 100;
      cube1.color = '0000FF'; // Blue

    // this addes the newly created cube to our global cubes array
    cubes.push(cube1);

    // Same thing as above but for a new cube
    var cube2 = {};
      cube2.x = 0;
      cube2.rotateSpeed = 0.02;
      cube2.size = 125;
      cube2.color = 'ff0000'; // Red

    cubes.push(cube2);

    // And yet another cube :)
    // You could create as many custom cubes as you like
    var cube3 = {};
      cube3.x = 220;
      cube3.rotateSpeed = 0.05;
      cube3.size = 100;
      cube3.color = '008000'; //Green

    cubes.push(cube3);
  }

   // This function iterates through our cubes
   // and creates a html mark up
   // that is added to the divResults div
   function printCraigsList(){
     // we create an empty string variable to store
     // html we later want to display
     var htm = '';
      // we walk through each cube in our cubes array
      // insdie this code block key will give you a 0 based index of the current item/cube
      // value will give you our current cube object
      $.each( cubes, function( key, value ) {
        // create outer div with style atributes
        htm += '<div class="craigsCube" style="';
        htm += 'height:' + value.size + 'px;';
        htm += 'width:' + value.size + 'px;';
        htm += 'background-color:' + value.color + '">';
        // create message for each div
        htm += '<b>Cube at Index ' + key + '</b><br/>';
        htm += 'Size: <b>' + value.size + '</b><br/>';
        htm += 'Position: <b>' + value.x + '</b><br/>';
        htm += 'Speed: <b>' + value.rotateSpeed + '</b>';

        htm += '</div>';
      });
      htm += '<br/>';

      // now that we have html formated displaying all of our cubes
      // in a basic craigs list like style
      // we can insert that html into the divResults div
      $("#divResults").html(htm);
   }

   // This function creates the basic elements needed for a Three.js scene
   // It also creates a cube mesh for each of our cubes
   // and sets their properites based on our early cubes definition
   function init3dScene() {

     // basic setup of a three.js camera
     // it asks for focal lenght aspect ration and close/far distances
     // this can be a little confusing at first
     // but in our case dosent really need to change much
     // if you understand we are creating a virtual camera to look at our scene widt
     // that should be good enough for now
     camera = new THREE.PerspectiveCamera( 40, scene3dWidth / scene3dHeight, 1, 1000 );
     camera.position.z = 400;

     // In addition to a camera we need to have a scene
     // this of this like a stage for a play
     // all of your geometry will go here
     scene = new THREE.Scene();

     // now we just need to add our cubes to the scene
     // we use our familiar each loop to work with each cube in order

     $.each( cubes, function( key, value ) {

       // adding a new new 3d element requires 3 things
       //  geometry - what is the objects shape like in a 3d space
       //  material - what is the shape made of... this drives things like color, shine, shadows, etc.
       //  mesh - this combines the geometry and material into something we can add to a scene

       var geometry = new THREE.BoxBufferGeometry( value.size, value.size, value.size );
       var material = new THREE.MeshPhongMaterial( );

       // this is where we change the color of the new cube
       // to reflect the color of our current cube in the cubes array
       material.color.setHex("0x" + value.color + "");

       var mesh = new THREE.Mesh( geometry, material );

       // this is where we set the position of the cube based on our
       // current cube in the cubes array
       mesh.position.x = value.x;
       scene.add( mesh );
       value.mesh = mesh;

     });

     // We dont really need lights for a basic scene
     // but since we used a matiral that cast shadows we do need lights
     // the point light acts somewhat like a spot light
     // create a point light
     var pointLight =
       new THREE.PointLight(0xFFFFFF);
       scene.add(pointLight);

     // set where to point the new point/spot light
     pointLight.position.x = 200;
     pointLight.position.y = 100;
     pointLight.position.z = 400;

     // since the other light was a spot light
     // areas that did not get directly hit by the light will
     // be in dark shadow
     // adding an ambient light will add a little bit of light to the whole scene
     // for our case this just prevents shadows from being completely black
     var light = new THREE.AmbientLight( 0x404040 ); // soft white light
     scene.add( light );

     // add to the scene
     // this step just tells Three.js to take all of the
     // stuff we added to the scene and render it
     // we provide a div named divThreeJsResults to hold the output scene image
     renderer = new THREE.WebGLRenderer();
     renderer.setPixelRatio( window.devicePixelRatio );
     renderer.setSize( scene3dWidth, scene3dHeight );
     $("#divThreeJsResults").append( renderer.domElement );

   }

   // This function runs every frame and animates the cubes
   // New positions are set and the scene is drawn/rendered again
   // We are also displaying some stats to help illustrate what is happening
   function animate3dScene() {
     // variable to store stats message we show at the bottom of the 3d cubes
     // it keeps current rotation and frame
     // no functional use for display only
     var statsHtm = '';

     // this tells the browser to call animate3dScene again once it has finished
     // this will create a never ending loop of animate3dScene
     // it will also gaurantee that we dont call animate3dScene when the browser
     // is still working on painting the previous frame.
     requestAnimationFrame( animate3dScene );

     // variable for stats display only
     currentFrame++
     statsHtm += '<table style="font-size:12px;width:' + scene3dWidth + 'px"><tr>';

     // loop through each cube in our cubes array
     $.each( cubes, function( key, value ) {

       // adjust the x and y rotation by the cube speed
       value.mesh.rotation.x += value.rotateSpeed;
       value.mesh.rotation.y += value.rotateSpeed;

       // more stats formating stuff
       statsHtm += '<td style="color:#' + value.color + ';text-align:center">';
       statsHtm += 'mesh.rotation: <b>';
       statsHtm += Math.round(value.mesh.rotation.x) + '</br>';
       statsHtm += '</b></td>';


     });
     statsHtm += '</tr></table>';

     statsHtm += '<div style="width:' + scene3dWidth + 'px;text-align:center;font-size:12px;">'
     statsHtm += 'current frame: <b>' + currentFrame + '</b>';
     statsHtm += '</div>';

     // tells THREE.js you are ready for it to paint the scene with
     // your new values
     // in our case the new rotation position
     // this happens fast enough that the cubes appear to move
     renderer.render( scene, camera );
     $("#divThreeJsStats").html(statsHtm);

   }

});


$( document ).ready(function() {
  // Handler for .ready() called.
  var cubes = [];
  var cube1 = {};

  cube1.x = 1;
  cube1.y = 1;
  cube1.z = 1;
  cube1.h = 100;
  cube1.w = 100;
  cube1.c = 'green';


  cubes.push(cube1);

  var cube2 = {};
  cube2.x = 1;
  cube2.y = 2;
  cube2.z = 1;
  cube2.h = 100;
  cube2.w = 100;
  cube2.c = 'blue';
  cubes.push(cube2);

  var cube3 = {};
  cube3.x = 1;
  cube3.y = 3;
  cube3.z = 1;
  cube3.h = 100;
  cube3.w = 100;
  cube3.c = 'red';
  cubes.push(cube3);

  printCraigsList();
  //$("#divResults").html("asdfasdf");


   function printCraigsList(){
     var htm = '<h1>Craigs list mode:</h1>';
      $.each( cubes, function( key, value ) {
        htm += '<div draggable="true" style="height:' + value.h + 'px;width:' + value.w + 'px;background-color:' + value.c + '">New Cube: x: ' + value.x + ' y: ' + value.y + ' z:' + value.z + '</div>';

        $("#divResults").html(htm);
      });
   }

});

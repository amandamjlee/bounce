if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}



var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);

var camera = new THREE.PerspectiveCamera (30, window.innerWidth/window.innerHeight,1,2000);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
var scene = new THREE.Scene();


var ambient = new THREE.AmbientLight( 0x111111 );

var spotLight1 = createSpotlight( 0xFF7F00 );
var spotLight2 = createSpotlight( 0x00FF7F );
var spotLight3 = createSpotlight( 0x7F00FF );


var matFloor = new THREE.MeshPhongMaterial();
var matSphere= new THREE.MeshPhongMaterial({color:0xaaaaaa});

var geoFloor = new THREE.PlaneBufferGeometry (2000,2000);

var sphere1, sphere2, sphere3, sphere4, sphere5, sphere6, sphere7,sphere8;

var SpherePosY=4;
var SpherePosZ=0;
var geoSphere =new THREE.SphereGeometry(1.5,25,25);


var mshFloor = new THREE.Mesh( geoFloor, matFloor );
mshFloor.rotation.x= -Math.PI *0.5;
var mshSphere = [];

//create spheres
// for(var i=1; i<8; i++){
//  mshSphere[i]= new THREE.Mesh( geoSphere, matSphere);
//  mshSphere[i].position.y=SpherePosY;
//  mshSphere[i].position.z=SpherePosZ;
//  mshSphere[i].castShadow = true;
//  mshSphere[i].receiveShadow = true;

//  scene.add( mshSphere[i] );
//  SpherePosZ+= -5;


// }

var group = new THREE.Group();
				
var vertices = new THREE.DodecahedronGeometry( 2).vertices;

var meshMaterial = new THREE.MeshLambertMaterial( {
					color: 0xffffff,
					opacity: 0.9,
					transparent: true
				} );
var meshGeometry = new THREE.ConvexBufferGeometry( vertices );


for(var i=1; i<8; i++){
 mshSphere[i]=new THREE.Mesh( meshGeometry, meshMaterial );
 				mshSphere[i].material.side = THREE.BackSide; // back faces
				mshSphere[i].renderOrder = 0;
				mshSphere[i].material.side = THREE.FrontSide; // front faces
				mshSphere[i].renderOrder = 1;
				
				group.add( mshSphere[i] );
 mshSphere[i].position.y=SpherePosY;
 mshSphere[i].position.z=SpherePosZ;
 mshSphere[i].castShadow = true;
 mshSphere[i].receiveShadow = true;
 mshSphere[i].rotation.y=Math.random(10);
 mshSphere[i].rotation.x=Math.random(10);
 mshSphere[i].rotation.y=Math.random(10);
			
 scene.add( mshSphere[i] );
 SpherePosZ+= -7;


}


// var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
// 				mesh.material.side = THREE.BackSide; // back faces
// 				mesh.renderOrder = 0;
// 				group.add( mesh );

// var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
// 				mesh.material.side = THREE.FrontSide; // front faces
// 				mesh.renderOrder = 1;
// 				group.add( mesh );				

// group.position.y=4;


//sphere animation
function sphereAnimation(){


	sphere1=new TimelineMax({repeat: -1 , repeatDelay:0});
	sphere1.to(mshSphere[1].position, 0.3, {y: 10, ease: Power2.easeOut});
	sphere1.to(mshSphere[1].position, 0.3, {y: 0, ease: Circ.easeIn});


	sphere2=new TimelineMax({repeat: -1 , repeatDelay:0});
	sphere2.to(mshSphere[2].position, 0.3, {y: 10, ease: Power2.easeOut});
	sphere2.to(mshSphere[2].position, 0.3, {y: 0, ease: Circ.easeIn});


	sphere3=new TimelineMax({repeat: -1 , repeatDelay:0});
	sphere3.to(mshSphere[3].position, 0.3, {y: 10, ease: Power2.easeOut});
	sphere3.to(mshSphere[3].position, 0.3, {y: 0, ease: Circ.easeIn});
	
	
	sphere4=new TimelineMax({repeat: -1 , repeatDelay:0});
	sphere4.to(mshSphere[4].position, 0.3, {y: 10, ease: Power2.easeOut});
	sphere4.to(mshSphere[4].position, 0.3, {y: 0, ease: Circ.easeIn});
	


	
	$('#SpeedRange1').change(function(){  
        console.log(this.value);
     	sphere1.timeScale(this.value/50);

    });

    $('#SpeedRange2').change(function(){  
        console.log(this.value);
     	sphere2.timeScale(this.value/50);

    });

    $('#SpeedRange3').change(function(){  
        console.log(this.value);
     	sphere3.timeScale(this.value/50);

    });

    $('#SpeedRange4').change(function(){  
        console.log(this.value);
     	sphere4.timeScale(this.value/50);

    });

	


	}

init();
animate();


function init(){
	renderer.shadowMap.enabled =true;
	renderer.shadowMap.type =THREE.PCFSoftShadowMap;

	renderer.gammaInput =true;
	renderer.gammaOutput =true;

	camera.position.set (140,22,120);

	spotLight1.position.set( 15, 40, 45 );
	spotLight2.position.set( 0, 40, 35 );
	spotLight3.position.set( - 15, 40, 45 );

	matFloor.color.set( 0x808080 );
	mshFloor.receiveShadow = true;
	mshFloor.position.set( 0, - 0.05, 0 );

	scene.add( mshFloor );
	
	scene.add( ambient );
	scene.add( spotLight1, spotLight2, spotLight3 );

	document.body.appendChild( renderer.domElement );
	onResize();
	window.addEventListener( 'resize', onResize, false );
				
	controls.target.set( 0, 7, 0 );
	controls.maxPolarAngle = Math.PI / 2;
	controls.update();

}
function createSpotlight( color ) {
	var newObj = new THREE.SpotLight( color, 2 );
	newObj.castShadow = true;
	newObj.angle = 1;
	newObj.penumbra = 0.2;
	newObj.decay = 2;
	newObj.distance = 100;
	newObj.shadow.mapSize.width = 1024;
	newObj.shadow.mapSize.height = 1024;
	return newObj;
	}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	}

function tween( light ) {
	new TWEEN.Tween( light ).to( {
	angle: ( Math.random() * 0.7 ) + 0.5,
	penumbra: Math.random() + 1
	}, Math.random() * 3000 + 2000 )
	.easing( TWEEN.Easing.Quadratic.Out ).start();
	new TWEEN.Tween( light.position ).to( {
	x: ( Math.random() * 30 ) - 15,
	y: ( Math.random() * 10 ) + 15,
	z: ( Math.random() * 30 ) - 15
	}, Math.random() * 3000 + 2000 )
	.easing( TWEEN.Easing.Quadratic.Out ).start();
	}

function animate() {
	tween( spotLight1 );
	tween( spotLight2 );
	tween( spotLight3 );


	
	setTimeout( animate, 5000 );
    




	

	}


function render() {
	TWEEN.update();
	
	// console.log(mshSphere[1].position.y);

	if(mshSphere[1].position.y<3){
		console.log("Kick!");
		var drumkick = new Audio();
		drumkick.src = "drumkick.wav";
		drumkick.play();
	}

	if(mshSphere[2].position.y<3){
		console.log("clap!");
		var clap = new Audio();
		clap.src = "clap.wav";
		clap.play();
	}

	if(mshSphere[3].position.y<3){
		console.log("hat!");
		var hat = new Audio();
		hat.src = "hat.wav";
		hat.play();
	}

	if(mshSphere[4].position.y<3){
		console.log("clinck!");
		var clinck = new Audio();
		clinck.src = "clinck.wav";
		clinck.play();
	}


	mshSphere[1].rotation.y += 0.008;
  	mshSphere[2].rotation.y += -0.008;
   	mshSphere[3].rotation.y += 0.008;
   	mshSphere[4].rotation.y += 0.008;
   	mshSphere[5].rotation.y += -0.008;
   	mshSphere[6].rotation.y += 0.008;
   	mshSphere[7].rotation.y += -0.008;


	

	renderer.render( scene, camera );
	requestAnimationFrame( render );

	}

	render();









	// - Phaser's rendering type
	// - Sets the Game's default Width
	// - Sets the Game's default Height
	// - Sets the Game's Background Color
	// - Turn `pixelArt` on or off
	// - Sets the Physics system's default Gravity
	// - Parent element to attach Game to
	// - Sets the Scale mode of the Game
	//   -   Sets which Axis the Game should 
	//   --- be centered on
	//   -   Specifies which scene{s} to use
	//   --- This can be either 1 scene or an `array` or `object` of scene{s}
	// - Sets which default type of Physics to use 
	// ( values can be "arcade", "impact", or "matter" )

	this.__PHASER_TYPE = Phaser.AUTO;
	this.__GAME_WIDTH = window.innerWidth; // ( Takes up the whole window's width )
	this.__GAME_HEIGHT = window.innerHeight; // ( Takes up the whole window's height )
	this.__GAME_BACKGROUND_COLOR = "#1d212d"; // ( Set to dark blue background color )
	this.__GAME_PIXEL_ART = true;
	this.__GAME_PHYSICS_GRAVITY = 500; // Default value is `500`
	this.__PHASER_PARENT = "game-container";
	this.__PHASER_SCALE_MODE = Phaser.Scale.RESIZE;
	this.__PHASER_SCALE_AUTOCENTER = Phaser.Scale.CENTER_BOTH;
	this.__GAME_SCENES = PlatformerScene;
	this.__GAME_PHYSICS_DEFAULT = "arcade";

	// Game's Configuration
	this.__config =

	{

		type: this.__PHASER_TYPE, 
		width: this.__GAME_WIDTH, 
		height: this.__GAME_HEIGHT, 
		parent: this.__PHASER_PARENT, 
		pixelArt: this.__GAME_PIXEL_ART, 
		backgroundColor: this.__GAME_BACKGROUND_COLOR, 
		scene: this.__GAME_SCENES, 

		scale: 

		{

			mode: this.__PHASER_SCALE_MODE, 
			autoCenter: this.__PHASER_SCALE_AUTOCENTER, 

		}, 

		physics: {
			default: this.__GAME_PHYSICS_DEFAULT, 
			arcade: {
				debug: true, 
				gravity: {
					y: this.__GAME_PHYSICS_GRAVITY, 
				}
			}
		}

	}

	this.__game = new Phaser.Game(this.__config);



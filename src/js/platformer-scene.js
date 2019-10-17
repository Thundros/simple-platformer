
	/**
	 * A class that extends Phaser.Scene & wraps up 
	 * the core logic for the platformer level
	 */
	class PlatformerScene extends Phaser.Scene

	{

		__LoadAllAssets()

		{

			// Load our Player's spritesheet

			__m.LoadSpriteSheet

			(

				{

					load: this.load,
					key: 'player',
					entityName: 'ayumi',
					fileLocation: 'assets/spritesheets/0x72-industrial-player-32px-extruded.png',
					frameWidth: 32,
					frameHeight: 32,
					frameMargin: 1,
					frameSpacing: 2,

				},

				1

			);

			// Load Tileset

			__m.LoadImage

			(

				{

					load: this.load,
					key: 'tiles',
					entityName: 'tiles',
					fileLocation: 'assets/tilesets/platformPack_tilesheet.png',

				},

				1

			);

			// Load Tilemap

			__m.LoadTileMap

			(

				{

					load: this.load,
					key: 'tiles',
					fileLocation: 'assets/tilemaps/platformer.json',

				},

				1

			);

		}

		// Preload Asset{s} to be used in Game

		preload()

		{

			this.__LoadAllAssets();

		}

		// Create Asset{s} / Set Variable{s} for Game

		create()

		{

			// Set whether or not the Player is dead { Default :: false }

			this.isPlayerDead = false;

			// Create our Tilemap

			const map = this.make.tilemap

			(

				{

					// Set the Map's `ID key`

					key: "tiles",

				}

			);

			// Set Camera's DeadZone Width

			this.__CAMERA_DEADZONE_WIDTH = (__GAME_WIDTH / 32);

			// Set Camera's DeadZone Height

			this.__CAMERA_DEADZONE_HEIGHT = (__GAME_HEIGHT / 32);

			// Add Tileset to Tilemap

			const tiles = map.addTilesetImage("platformPack_tilesheet", "tiles");

			// Create the `Collision Wall {64x64}` Tile from the Tiled map

			const collisionWall64x64 = map.createDynamicLayer("collisionWall{64x64}", tiles, 0, 0);

			// There are many ways to set collision between tiles and players
			// As we want players to collide with all of the 64x64 Collision Walls, we tell Phaser to
			// set collisions for every tile in our ground layer whose index isn't -1.
			// Tiled indices can only be >= 0, therefore we are colliding with all of
			// the `collisionWall{64x64}` layer

			collisionWall64x64.setCollisionByExclusion(-1, true);

			// Create `Dynamic` `background` Layer
			// map.createDynamicLayer("Background", tiles);

			// Create `Dynamic` `ground` Layer

			this.groundLayer = map.createDynamicLayer("ground", tiles);

			// Create `Dynamic` `foreground` Layer
			// map.createDynamicLayer("Foreground", tiles);

			// Grab the `Spawn Point` Object from the Tiled map

			const spawnPoint = map.findObject("player-spawn-point", obj => obj.name === "Spawn Point");

			// Create a Player Instance at the location of the "Spawn Point" object in the Tiled map

			this.player = new Player(this, spawnPoint.x, spawnPoint.y);

			// Collide the player against the ground layer - here we are grabbing the sprite property from
			// the player ( since the Player class is not a Phaser.Sprite )

			/*

				this.groundLayer.setCollisionByProperty

				(

					{

						// Set `groundLayer` to collide with player

						collides : true, 

					}

				);

			*/

			this.groundLayer.setCollisionByExclusion(-1, true);

			// Add Physics Collision between the `player` & the `groundLayer`

			this.physics.world.addCollider(this.player.sprite, this.groundLayer);

			// Add Physics Collision between the `player` & the `collisionWall{64x64}` layer

			this.physics.add.collider(this.player.sprite, collisionWall64x64);

			// The map contains a row of spikes. The spike only take a small sliver of the tile graphic, so
			// if we let arcade physics treat the spikes as colliding, the player will collide while the
			// sprite is hovering over the spikes. We'll remove the spike tiles and turn them into sprites
			// so that we give them a more fitting hitbox.

			this.spikeGroup = this.physics.add.staticGroup();

			// For each Ground Layer in the Game Map

			this.groundLayer.forEachTile

			(

				tile =>

				{

					// If the `ID` of the `tile` is `77`
					if (tile.index === 77)

					{

						// Create a `spikeGroup` at the center of tile{s} with `ID` `77`

						const spike = this.spikeGroup.create

						(

							tile.getCenterX(), tile.getCenterY(), "spike"

						);

						// The map has spikes rotated in Tiled (z key), so parse out that angle to the correct body
						// placement

						spike.rotation = tile.rotation;

						// If the angle of the `spike` is `0`, scale the spike to 32, 6
						// & offset X/Y position to 0, 26

						if (spike.angle === 0)

						{

							spike.body.setSize(32, 6)
								.setOffset(0, 26);

						}

						// Otherwise, if the `spike` angle is `-90`, scale the spike to 6, 32
						// & offset X/Y position to 26, 0

						else if (spike.angle === -90)

						{

							spike.body.setSize(6, 32)
								.setOffset(26, 0);

						}

						// Otherwise, if the `spike` angle is `90`, scale the sprite to 6, 32
						// & offset the X/Y position to 0, 0

						else if (spike.angle === 90)

						{

							spike.body.setSize(6, 32)
								.setOffset(0, 0);

						}

						// Remove the `groundLayer` tile located at
						// `groundLayer`'s current X/Y position

						this.groundLayer.removeTileAt(tile.x, tile.y);

					}

				}

			);

			// Make the `camera` follow the `player`
			this.cameras.main.startFollow(this.player.sprite, true, 0.05, 0.05);

			// Set the `camera` Zoom Level
			this.cameras.main.setZoom(2, 2);

			// Set the `camera` Viewport
			this.cameras.main.setViewport(0, 0, __GAME_WIDTH, __GAME_HEIGHT);

			// Set the Physics Object{s} to stay within Game bounds
			this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);

			// Set the `camera` to stay within the Game bounds
			this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

			console.log("__GAME_WIDTH : " + __GAME_WIDTH);
			console.log("__GAME_HEIGHT : " + __GAME_HEIGHT);

			console.log("map.widthInPixels : " + map.widthInPixels);
			console.log("map.heightInPixels : " + map.heightInPixels);

			console.log("( map.widthInPixels / 66 ) : " + (map.widthInPixels / 66));
			console.log("( map.heightInPixels / 66 ) : " + (map.heightInPixels / 66));

			// Set the `camera` Dead Zone
			// this.cameras.main.setDeadzone ( this.__CAMERA_DEADZONE_WIDTH, this.__CAMERA_DEADZONE_HEIGHT );

			// Help text that has a "fixed" position on the screen

			this.add.text

			(

				10, 64, "Arrow/WASD to move & jump",

				{

					font: "18px monospace",

					fill: "#000000",

					padding:

					{

						x: 20,

						y: 10,

					},

					backgroundColor: "#ffffff",

				}

			).setScrollFactor(0);

		}

		render()

		{

			stats.update();

			// If the `player` is `dead`, break out of the loop
			// NOTE : { When the Player dies & restarts, 
			// Player movement speed doubles }
			// This needs to be fixed

			if (this.isPlayerDead) return;

			// Update the player
			this.player.update();

			// If the `player`'s Y-position is greater than the `groundLayer`'s
			// height OR the `player` touches any of the spikes, 

			if

			(

				this.player.sprite.y > this.groundLayer.height ||
				this.physics.world.overlap(this.player.sprite, this.spikeGroup)

			)

			{

				// Flag that the player is dead so that we can stop update 
				// from running in the future
				this.isPlayerDead = true;

				// Get the Camera's `ID`
				const cam = this.cameras.main;

				// `Shake` the Camera to show `death`
				cam.shake(100, 0.05);

				// `Fade` the Camera out with a 250 millisecond delay
				cam.fade(250, 0, 0, 0);

				// Freeze the player to leave them on screen while fading but remove the marker immediately
				this.player.freeze();

				// Once the Camera is done `fading`, 
				cam.once("camerafadeoutcomplete", () =>
				{

					// Destroy the `Player`'s memory from Game
					this.player.destroy();

					// Restart the Scene & Play again
					this.scene.restart();

				});

			}

		}

		// Update Game Logic with current Time & delta Time
		update(timestamp, elapsed)

		{

			this.render(timestamp, elapsed);

		}

	}




   /**
	* A class that wraps up our 2D platforming player logic. It creates, animates and moves a sprite in
	* response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
	* method when you're done with the player.
	*/

	class Player

	{

		// Setup our Player's constructor
		constructor(scene, x, y)

		{

			// Get the `ID` of the `Scene`
			this.scene = scene;

			// Create the animations we need from the player spritesheet
			const anims = scene.anims;

			// Player's `Idle` Animation
			anims.create(
			{
				key: "player-idle",
				frames: anims.generateFrameNumbers("player",
				{
					start: 0,
					end: 3
				}),
				frameRate: 3,
				repeat: -1
			});

			// Player's `Run` Animation
			anims.create(
			{
				key: "player-run",
				frames: anims.generateFrameNumbers("player",
				{
					start: 8,
					end: 15
				}),
				frameRate: 12,
				repeat: -1
			});

			// Create the physics-based sprite that we will move 
			// around & animate
			this.sprite = scene.physics.add
				.sprite(x, y, "player", 0)
				.setDrag(1000, 0)
				.setMaxVelocity(300, 400)
				.setSize(18, 24)
				.setOffset(7, 9);

			// Track the arrow keys & WASD
			const

			{

				LEFT,
				RIGHT,
				UP,
				W,
				A,
				D

			} = Phaser.Input.Keyboard.KeyCodes;

			// Add Key{s} from `object` to `keyboard` logic
			this.keys = scene.input.keyboard.addKeys(

			{

				left: LEFT,
				right: RIGHT,
				up: UP,
				w: W,
				a: A,
				d: D

			});

		}

		// `Freeze` our `Player` in place
		freeze()

		{

			// Sets the `Player` to not be able to move
			this.sprite.body.moves = false;

		}

		// Update our Player
		update()

		{

			// Setup `keys`, `sprite` variable{s} as `this` variable{s}
			const
			{
				keys,
				sprite
			} = this;

			// Check whether or not the Player is touching the ground
			const onGround = sprite.body.blocked.down;

			// Set the Player's Acceleration either if on ground or not
			// on ground
			const acceleration = onGround ? 600 : 200;

			// Apply horizontal acceleration when left/a or right/d 
			// keys are applied
			if (keys.left.isDown || keys.a.isDown)
			{

				// Set Player's Negative X-Acceleration
				sprite.setAccelerationX(-acceleration);

				// No need to have a separate set of graphics for running to the 
				// left & right
				// We can just mirror the sprite
				sprite.setFlipX(true);

			}

			// Otherwise, if the `right` key or `D` key is being 
			// held down
			else if (keys.right.isDown || keys.d.isDown)

			{

				// Set Character's Positive X-Acceleration
				sprite.setAccelerationX(acceleration);

				// Do NOT flip the Player's Sprite
				sprite.setFlipX(false);

			}

			// Otherwise, if NOT holding down 
			// left/right or A/D, 
			else

			{

				// Stop Player's current X-Acceleration
				sprite.setAccelerationX(0);

			}

			// If the Player is touching the ground
			// & the `up` key or `W` key
			// is being held
			if (onGround && (keys.up.isDown || keys.w.isDown))

			{

				// Set Player's Y-Acceleration to -500 
				// ( which is `up` in terms of 
				// Player movement )
				sprite.setVelocityY(-500);

			}

			// If the Player `IS` touching the Ground
			if (onGround)

			{

				// If the Player's X-Velocity `IS NOT` `0`, 
				// play the Player's
				// `running` Animation
				if (sprite.body.velocity.x !== 0) sprite.anims.play("player-run", true);

				// Otherwise, if the Player's X-Velocity `IS` `0`, 
				// play the Player's 
				// `idle` Animation
				else sprite.anims.play("player-idle", true);

			}

			// Otherwise, if the Player `IS NOT` touching the ground
			else

			{

				// Stop Animating the Player
				sprite.anims.stop();

				// Set the Player's current Frame 
				// to `idle`
				sprite.setTexture("player", 10);

			}

		}

		// Destroy the Player's `Memory` from Game
		destroy()

		{

			// Destroys the Player's current Sprite 
			// from the Game
			this.sprite.destroy();

		}

	}



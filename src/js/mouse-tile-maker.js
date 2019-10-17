
	/**
	 * A class that visualizes the mouse position within a tilemap. Call its update method from the
	 * scene's update and call its destroy method when you're done with it
	 */

	class MouseTileMarker

	{

		// Setup our Tile drawer's constructor
		constructor(scene, map)

		{

			// Get the `ID` of the `Map`
			this.map = map;

			// Get the `ID` of the `Scene`
			this.scene = scene;

			// Add Graphic{s} to `Scene`
			this.graphics = scene.add.graphics();

			// Set the `style` of the 1st drawn Line
			this.graphics.lineStyle(5, 0xffffff, 1);

			// Create a `rectangle` the size of the `Map`'s 
			// Width & Height
			this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);

			// Set the `style` of the 2nd drawn Line
			this.graphics.lineStyle(3, 0xff4f78, 1);

			// Create a `rectangle` the size of the `Map`'s 
			// Width & Height
			this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);

		}

		// Update our Tile Drawer's logic
		update()

		{

			// Get the current Mouse Pointer
			const pointer = this.scene.input.activePointer;

			// Get where the Mouse Pointer is in the `world`
			const worldPoint = pointer.positionToCamera(this.scene.cameras.main);

			// Set the Mouse Pointer's World Coordinates 
			// to Tile Coordinates
			const pointerTileXY = this.map.worldToTileXY(worldPoint.x, worldPoint.y);

			// Set the Mouse Pointer's `snapped` World Coordinates 
			// from Tile Coordinates
			const snappedWorldPoint = this.map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

			// Set the drawn Tile's position to the `snapped` Tile
			// World Coordinates
			this.graphics.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

		}

		// Destroy the Tile Drawer's Graphic{s}
		destroy()

		{

			// Remove the Tile Drawer's Graphic{s}
			// from the Scene
			this.graphics.destroy();

		}

	}



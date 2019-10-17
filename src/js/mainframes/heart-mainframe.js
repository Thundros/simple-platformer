
	this.__resizeApp = function ( __objData )

	{

		this.__objData = __objData;

			// Width & Height Ratio of Game Resolution

			this.__width = ( this.__objData.__GAME_WIDTH );
			this.__height = ( this.__objData.__GAME_HEIGHT );

		this.__game_ratio = 

		(

			( this.__width ) / ( this.__height )

		);

		// Make div full Height of Browser & keep the Ratio 
		// of Game Resolution

		this.__div = document.getElementById

		(

			this.__objData.__elementName

		);

		this.__div.style.width = ( this.__objData.__GAME_HEIGHT * this.__game_ratio ) + 'px';
		this.__div.style.height = this.__objData.__GAME_HEIGHT + 'px';

		// Check if device DPI messes up the Width & Height Ratio

		this.__canvas = document.getElementsByTagName ( 'canvas' ) [ 0 ];

		this.__dpi_w = ( parseInt ( this.__div.style.width ) / this.__canvas.width );
		this.__dpi_h = ( parseInt ( this.__div.style.height ) / this.__canvas.height );

		this.__height = ( this.__height * ( this.__dpi_w / this.__dpi_h ) );
		this.__width = ( this.__height * 0.6 );

		this.__canvas.style.width = this.__width + 'px';
		this.__canvas.style.height = this.__height + 'px';

	}



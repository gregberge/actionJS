/**
 * NeoSpace - Bullet class
 * @author berge
 */
 
if(typeof NS == "undefined")
{
   NS = {};	
}

/**
 * A simple bullet
 * @class Bullet
 */
NS.Bullet = aj.Sprite.extend(
{
	/**
	 * The bullet's speed
	 * @type number
	 */
	_speed : 8,
	
	/**
	 * Constructor
	 * @param {int} x x coord
	 * @param {int} y y coord
	 */
	init : function(x, y)
	{
		this._super();
		var img = new aj.Image(NS.Main.stage.library.get("bullet"));
		this.addChild(img);
		
		this.x =  x;
		this.y = y;
		
		this.width = 5;
		this.height = 5;
		
		this.addEventListener(aj.Event.ENTER_FRAME, this.onEnterFrame, this);
		
		NS.Bullet.arBullets.push(this);
	},
	
	/**
	 * Call on enter frame
     */
	onEnterFrame : function()
	{
		this.y -= this._speed;
		
		this.gb();
	},
	
	/**
	 * The garbage collector
	 */
	gb : function()
	{
		if(this.y < this.height)
		{
			this.dispose();
		}
	},
	
	/**
	 * Remove completely the objet
	 */
	dispose : function()
	{
		//Remove events
		this.removeEventListener(aj.Event.ENTER_FRAME, this.onEnterFrame, this);
		
		//Remove object
		this.stage.removeChild(this);
		
		for(var i in NS.Bullet.arBullets)
		{
			if(NS.Bullet.arBullets[i] === this)
			{
				NS.Bullet.arBullets.splice(i, 1);
			}
		}
		
		delete this;
	}
});

/**
 * Bullets
 * @static
 * @public
 */
NS.Bullet.arBullets = [];
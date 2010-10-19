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
NS.Bullet = aj.DisplayObjectContainer.extend(
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
		
		this.addEventListener(aj.Event.ENTER_FRAME, $.proxy(this.onEnterFrame, this));
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
		this.removeEventListener(aj.Event.ENTER_FRAME, $.proxy(this.onEnterFrame, this));
		
		//Remove object
		this.stage.removeChild(this);
		
		delete this;
	}
});
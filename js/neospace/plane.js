/**
 * NeoSpace - Plane class
 * @author berge
 */
 
if(typeof NS == "undefined")
{
   NS = {};	
}

/**
 * The plane
 * @class Plane
 */
NS.Plane = aj.Sprite.extend(
{
	/**
	 * The plane's speed
	 * @type number
	 */
	_speed : 2,
	
	/**
	 * Constructor
	 */
	init : function()
	{
		this._super();
		var img = new aj.Image(NS.Main.stage.library.get("plane"));
		this.addChild(img);
		
		this.addEventListener(aj.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.addEventListener(aj.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	},
	
	/**
	 * Call after added on the stage
	 * @private
	 */
	onAddedToStage : function()
	{
		this.removeEventListener(aj.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		
		this.x = this.stage.width / 2 - this.width / 2;
		this.y = 300;
		
		this.stage.addEventListener(aj.KeyboardEvent.KEY_DOWN, this.onKeyDown, this);
	},
	
	/**
	 * Called on enter frame
	 * @private
     */
	onEnterFrame : function()
	{
		this.keyManager();
	},
	
	/**
	 * Called on key down
	 * @private
	 * @param {aj.Event} event The event
	 */
	onKeyDown : function(event)
	{
		if(event.keyCode == aj.Key.SPACE)
		{
			this.shoot();
		}
	},
	
	/**
	 * Shoot
	 * @public
	 */
	shoot : function()
	{
		var bullet = new NS.Bullet(this.x + 13, this.y);
		this.stage.addChild(bullet);
	},
	
	/**
	 * The key manager called on enter frame
	 * @private
	 */
	keyManager : function()
	{
		var key = aj.Key.getCurrentInstance();
		
		if(key.isDown(aj.Key.RIGHT))
		{
			this.x += this._speed;
		}
		
		if(key.isDown(aj.Key.LEFT))
		{
			this.x -= this._speed;
		}
		
		if(key.isDown(aj.Key.DOWN))
		{
			this.y += this._speed;
		}
		
		if(key.isDown(aj.Key.UP))
		{
			this.y -= this._speed;
		}
	},
	
	/**
	 * Remove completely the object
	 * @public
	 */
	dispose : function()
	{
		this.removeEventListener(aj.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.stage.removeEventListener(aj.KeyboardEvent.KEY_DOWN, this.onKeyDown, this);
		
		this.parent.removeChild(this);
	}
	
});
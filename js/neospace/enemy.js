/**
 * NeoSpace - Ennemy class
 * @author berge
 */
 
if(typeof NS == "undefined")
{
   NS = {};	
}

/**
 * An enemy
 * @class Enemy
 */
NS.Enemy = aj.Sprite.extend(
{
	/**
	 * The enemy's speed
	 * @type number
	 */
	_speed : 2,
	
	/**
	 * Constructeur
	 */
	init : function()
	{
		this._super();
		
		var img = new aj.Image(NS.Main.stage.library.get("meteorite"));
		this.addChild(img);
		
		this.addEventListener(aj.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		this.addEventListener(aj.Event.ENTER_FRAME, this.onEnterFrame, this);
	},
	
	/**
	 * Called after added on the stage
	 * @private
	 */
	onAddedToStage : function()
	{
		this.removeEventListener(aj.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		this.x = (this.stage.width - this.width) * Math.random();
	},
	
	/**
	 * Called on enter frame
	 * @private
	 */
	onEnterFrame : function()
	{
		if(!NS.Main.main.gameEnd)
		{
			this.move();
			this.checkColPlane();
			this.checkBullet();
			this.gb();
		}
	},
	
	/**
	 * Check the colision with the plane
	 */
	checkColPlane : function()
	{
		var point = this.localToGlobal();
		var testPoint = new aj.Point(this.x + this.width / 2, this.y + this.height / 2);
		if(NS.Main.main.plane.hitTestPoint(testPoint))
		{
			NS.Main.main.finish();
		}
	},
	
	/**
	 * Check the colision with the bullets
 	 */
	checkBullet : function()
	{
		for(var i in NS.Bullet.arBullets)
		{
			if(NS.Bullet.arBullets[i].hitTestObject(this))
			{
				this.dispose();
				break;
			}
		}
	},
	
	/**
	 * Move
	 * @private
	 */
	move : function()
	{
		this.y += this._speed;
	},
	
	/**
	 * The garbage collector
	 */
	gb : function()
	{
		if(this.stage != null)
		{
			if(this.y > this.stage.height)
			{
				this.dispose();
			}
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
		
		delete this;
	}
});
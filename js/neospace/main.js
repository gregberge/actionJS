/**
 * NeoSpace - Main class
 * @author berge
 */
 
if(typeof NS == "undefined")
{
   NS = {};	
}

NS.Main = Class.extend({
	
	/**
	 * Stage
	 * @type aj.Stage
	 */
	stage : null,
	
	/**
	 * Plane
	 * @type NS.Plane
	 */
	plane : null,
	
	/**
	 * Interval enemy
	 * @type int
     */
	enemyInterval : null,
	
	/**
	 * End of game
	 * @type boolean
	 */
	gameEnd : false,
	
	/**
	 * End of loading
	 * @type boolean
	 */
	loadingEnd : false,
	
	/**
	 * Start of game
	 * @type boolean
	 */
	gameStart : false,
	
	
	/**
	 * Constructor
	 */
	init : function()
	{
		this.stage = new aj.Stage("neospace-aj");
		this.stage.library.addImage("plane", "http://asset1.rentability.com/images/transport/plane.png");
		this.stage.library.addImage("bullet", "http://www.cs.utk.edu/~berry/Bullets/orange-bullet.gif");
		this.stage.library.addImage("meteorite", "http://www.sail.enxt.net/cleanup/Tech/GameMaker/Sprites/Space/meteorite_medium2.png");
		
		this.stage.addEventListener(aj.Event.COMPLETE, this.finishLoading, this);
		this.stage.addEventListener(aj.MouseEvent.CLICK, this.start, this);
		
		this.stage.showFps = true;
		
		this.stage.load();
		
		NS.Main.stage = this.stage;
		NS.Main.main = this;
	},
	
	/**
	 * Finish the loading
	 */
	finishLoading : function()
	{
		this.loadingEnd = true;
		
		if(this.gameStart)
		{
			this.start();
		}
	},
	
	/**
	 * Start
	 */
	start : function()
	{
		this.stage.removeEventListener(aj.MouseEvent.CLICK, this.start, this);
		this.gameStart = true;
		
		if(this.loadingEnd)
		{
			this.plane = new NS.Plane();
			this.stage.addChild(this.plane);
		
			this.enemyInterval = setInterval($.proxy(this.addEnemy, this), 500);
		}
	},
	
	/**
	 * Finish
	 */
	finish : function()
	{
		if(!this.gameEnd)
		{
			this.gameEnd = true;
			this.plane.dispose();
			clearInterval(this.enemyInterval);
		}
	},
	
	/**
	 * Add enemy on the scene
	 */
	addEnemy : function()
	{
		var enemy = new NS.Enemy();
		this.stage.addChild(enemy);
	}
	
});
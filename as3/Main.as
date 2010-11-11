package NS
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.utils.clearInterval;
	import flash.utils.setInterval;
	
	[SWF(width='500',height='500',backgroundColor='#ffffff',frameRate='50')]
	
	public class Main extends Sprite
	{
		/**
		 * The plane
		 */
		public var plane:Plane;
		
		/**
		 * The library
		 */
		public var library:Library;
		
		/**
		 * Interval enemy
		 */
		private var enemyInterval:int;
		
		/**
		 * End of game
		 */
		public var gameEnd:Boolean = false;
		
		/**
		 * End of loading
		 */
		private var loadingEnd:Boolean = false;
		
		/**
		 * Start of game
		 */
		private var gameStart:Boolean;
		
		/**
		 * The main object
		 */
		public static var main:Main;
		
		public function Main()
		{			
			this.library = new Library();
			this.library.addImage("plane", "images/plane.png");
			this.library.addImage("bullet", "images/orange-bullet.gif");
			this.library.addImage("meteorite", "images/meteorite_medium2.png");
			
			this.library.addEventListener(Event.COMPLETE, this.finishLoading);
			
			this.stage.addEventListener(MouseEvent.CLICK, this.start);
			
			Main.main = this;
			
			Key.initialize(this.stage);
			
			this.library.load();
		}
		
		/**
		 * Finish the loading
		 */
		private function finishLoading(e:Event):void
		{
			this.loadingEnd = true;
			
			if(this.gameStart)
			{
				this.start();
			}
		}
		
		/**
		 * Start
		 */
		public function start(e:Event = null):void
		{
			this.stage.removeEventListener(MouseEvent.CLICK, this.start);
			
			this.gameStart = true;
			
			if(this.loadingEnd)
			{
				this.plane = new Plane();
				this.stage.addChild(this.plane);
				
				this.enemyInterval = setInterval(this.addEnemy, 500);
			}
		}
		
		/**
		 * Finish
		 */
		public function finish():void
		{
			if(!this.gameEnd)
			{
				this.gameEnd = true;
				this.plane.dispose();
				clearInterval(this.enemyInterval);
			}
		}
		
		/**
		 * Add enemy on the scene
		 */
		public function addEnemy():void
		{
			var enemy:Enemy = new Enemy();
			this.stage.addChild(enemy);
		}
	}
}
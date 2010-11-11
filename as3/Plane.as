package NS
{
	import flash.display.Bitmap;
	import flash.display.Loader;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	
	public class Plane extends Sprite
	{
		
		/**
		 * The speed of the plane
		 */
		private var _speed:Number = 2;
		
		public function Plane()
		{
			super();
			
			var img:Bitmap = Main.main.library.getObject("plane");
			this.addChild(img);
			
			this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
			this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
		}
		
		/**
		 * Called on added to stage
		 */
		private function onAddedToStage(e:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
			
			this.x = this.stage.stageWidth / 2 - this.width / 2;
			this.y = 300;
			
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, this.onKeyDown);
		}
		
		/**
		 * Called on enter frame
		 */
		private function onEnterFrame(e:Event):void
		{
			this.keyManager();
		}
		
		/**
		 * Called on key down
		 */
		private function onKeyDown(event:KeyboardEvent):void
		{
			if(event.keyCode == Keyboard.SPACE)
			{
				this.shoot();
			}
		}
		
		/**
		 * Shoot
		 */
		public function shoot():void
		{
			var bullet:Bullet = new Bullet(this.x + 13, this.y);
			this.stage.addChild(bullet);
		}
		
		/**
		 * The key manager called on enter frame
		 */
		private function keyManager():void
		{
			if(Key.isDown(Keyboard.RIGHT))
			{
				this.x += this._speed;
			}
			
			if(Key.isDown(Keyboard.LEFT))
			{
				this.x -= this._speed;
			}
			
			if(Key.isDown(Keyboard.DOWN))
			{
				this.y += this._speed;
			}
			
			if(Key.isDown(Keyboard.UP))
			{
				this.y -= this._speed;
			}
		}
		
		/**
		 * Remove completely the objet
		 */
		public function dispose():void
		{
			this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
			
			this.parent.removeChild(this);
		}
	}
}
/**
 * Animation
 * Represent an animation
 * @package aj.display
 */
define(["aj/Obj", "aj/display/Stage", "aj/events/Event"], function(Obj, Stage, Event) {
   var Animation = new JS.Class(Obj, {
      
      /**
       * Last called time
       * @type number
       */
      _lastCalledTime : null,
      
      /**
       * Last compute fps
       * @type number
       */
      _lastComputeFpsTime : null,
      
      /**
       * _fps
       * @type number
       */
      _fps : null,
      
      /**
       * FPS actif ou non
       * @type boolean
       */
      _fpsActive : false,
      
      /**
       * Create a stage
       */
      initialize : function(width, height) {
         
         if(typeof width !== "number" || typeof height !== "number")
            throw "you must specify width and height";
         
         this.stage = new Stage(this);
         this.stage.canvas.width = width;
         this.stage.canvas.height = height;
      },
      
      /**
       * Attach the element to the DOM
       * @param string domRootElementId The id of the root element
       */
      attachTo : function(domRootElementId) {
         var domRootElement = document.getElementById(domRootElementId);
         
         if(domRootElement === null) {
            throw new Exception("root element id doesn't exist");
         }
         
         domRootElement.appendChild(this.stage.canvas);
      },
      
      /**
       * Animation cycle
       */
      animationCycle : function()
      {
         this.stage.dispatchEvent(new Event(Event.ENTER_FRAME));
         
         if(this._fpsActive)
         {
            this._computeFps();
            this._showFps();
         }
         window.requestAnimationFrame(this.animationCycle.bind(this), this.canvas);
      },
      
      _computeFps : function()
      {
         if(this._lastCalledTime === null)
         {
            this._lastCalledTime = new Date().getTime();
            this._fps = 0;
            return;
         }
         
         var delta = (new Date().getTime() - this._lastCalledTime)/1000;
         this._lastCalledTime = new Date().getTime();
         
         if(!this._lastComputeFpsTime || new Date().getTime() - this._lastComputeFpsTime > 300)
         {
            this._fps = ~~(1/delta + 0.5);
            this._lastComputeFpsTime = new Date().getTime();
         }
      },
      
      _showFps : function()
      {
         this.stage.ctx.clearRect(0, 0, 50, 15);
         this.stage.ctx.fillStyle = '#000';
         this.stage.ctx.font = 'italic bold 12px sans-serif';
         this.stage.ctx.fillText("FPS " + this._fps, 0, 10);
      },
      
      /**
       * Start animation
       */
      start : function()
      {
         this.animationCycle();
      },
      
      clear : function()
      {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      
      /**
       * Show FPS
       * @param boolean val
       */
      showFps : function(val)
      {
         val = val || true;
         this._fpsActive = val;
      },
      
   });
   
   return Animation;
});
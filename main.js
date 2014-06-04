var gameState = "stop";
var score     = "0&nbsp;&nbsp;s";
var scoreTime = 0;
var startTime = 0;
var csTime    = "";
var upTime    = "";

// start game when the start button is pressed
function startGame()
{
  changeContent("startGame");
  score       = document.getElementById("score").innerHTML;
  scoreTime   = Number(score.slice(0, score.length - 13));
  startTime   = new Date().getTime();
  countTime();
  createWall();
}

// pause game when the pause button is pressed
function pauseGame()
{
  changeContent("pauseGame");
  clearTimeout(csTime);
}

// reset(clear game to restart) game when the reset button is pressed down
function resetGame()
{
  changeContent("resetGame");
}

// create a wall randomly
function createWall()
{
  var wallNumUp   = 0;
  var wallNumDown = 0;
  (function(){
    if(gameState == "start")
    {
      var rWall = Math.random();
      if (rWall < 1)
      {
        var rWhere = Math.random();
        if(rWhere < 0.5)
        {
          var wall = makeWall(wallNumUp, "up");
          document.getElementById("wall-up").appendChild(wall);
          moveWall(wall, "up");
          wallNumUp++;
        }
        else
        {
          var wall = makeWall(wallNumDown, "down");
          document.getElementById("wall-down").appendChild(wall);
          moveWall(wall, "down");
          wallNumDown++;
        }
      }
      window.setTimeout(arguments.callee, 600);
    }
  })();
}
// create a wall object at the right area of wall
function makeWall(id, where)
{
  var wallWidth = Math.ceil(Math.random()*30) + 'px';
  var wallHeight= Math.ceil(Math.random()*100)+ 'px';
  var wall = document.createElement("div");
  wall.style.position         = "absolute";
  wall.style.right            = "0px";
  wall.style.bottom           = "0px";
  wall.style.width            = wallWidth;
  wall.style.height           = wallHeight;
  wall.style.backgroundColor  = "#000";
  wall.id                     = "wall-" + id + "-" + where;
  return wall;
}
// move wall
function moveWall(wall, where)
{
  (function(){
    if(gameState == "start")
    {
      var pWallH = wall.style.right;
      var wWall  = wall.style.width;
      var pWallV = wall.style.height;
      pWallH = 850 - Number(pWallH.slice(0, pWallH.length - 2)) - Number(wWall.slice(0, wWall.length - 2));
      pWallV = Number(pWallV.slice(0, pWallV.length -2));
      var man    = document.getElementById("man-" + where);
      var pManV  = man.style.bottom;
      pManV      = Number(pManV.slice(0, pManV.length - 2));
      wall.style.right = (Number(wall.style.right.slice(0, wall.style.right.length -2)) + 10) + 'px';
      if(pWallH <= 250 && pWallH >= (200 - Number(wWall.slice(0, wWall.length - 2))))
      {
        if(pManV <= pWallV) {gameState = "over";}
      }
      if(pWallH <= Number(wWall.slice(0, wWall.length - 2)))
      {
        document.getElementById("wall-" + where).removeChild(document.getElementById(wall.id));
        return;
      }
      setTimeout(arguments.callee, 25);
    }
  })();
}
//takeoff man when relavant key is pressed down
function takeoff(key)
{
  var keyName = "";
  if(window.event)
  {
    keyName = key.keyCode;
  }
  else if(key.which)
  {
    keyName = key.which;
  }
  if (keyName == "102")
  {
    var k = 0;
    var manPosition = document.getElementById("man-up").style.bottom;
    if(manPosition != "10px") {return;}
    else
    {
      (function(){
        if(k > 32) {return;}
        var manPosition = document.getElementById("man-up").style.bottom;
        manPosition = Number(manPosition.slice(0, manPosition.length - 2)) + 16 - k;
        document.getElementById('man-up').style.bottom = manPosition + 'px';
        k++;
        window.setTimeout(arguments.callee, 20);
      })();
    }
  }
  if (keyName == "106")
  {
    var k = 0;
    var manPosition = document.getElementById("man-down").style.bottom;
    if(manPosition != "10px") {return;}
    else
    {
      (function(){
        if(k > 32) {return;}
        var manPosition = document.getElementById("man-down").style.bottom;
        manPosition = Number(manPosition.slice(0, manPosition.length - 2)) + 16 - k;
        document.getElementById('man-down').style.bottom = manPosition + 'px';
        k++;
        window.setTimeout(arguments.callee, 20);
      })();
    }
  }
  return;
}
function upMan(k, keyName)
{
  if(k < 33 && keyName == "102")
  {
  }
  upTime = setTimeout(upMan(k, keyName), 1000);
}

// count time when start game
function countTime()
{
  if(gameState  == "start")
  {
    var thisTime  = new Date().getTime();
    var thisScore = (thisTime - startTime)/1000;
    var totalScore= (thisScore + scoreTime).toString(10);
    var point     = totalScore.lastIndexOf(".");
    var deciPart  = (totalScore.substring(point + 1, totalScore.length) + "000").slice(0, 3);
    score         = totalScore.slice(0, point + 1) + deciPart + "&nbsp;&nbsp;s";
    document.getElementById("score").innerHTML = score;
    csTime        = setTimeout("countTime()", 29);
  }
  else
  {
    return;
  }
}

// change element content when start/pause/reset game, include the state of score div, the innerHTML of div#st and the src of the man, this is the simplist thing!
function changeContent(type)
{
  switch(type)
  {
    case "startGame":
      gameState = "start";
      document.getElementById("st").innerHTML = "Pause";
      document.getElementById("st").onmousedown = function(){pauseGame()};
      document.getElementById("score").style.visibility = "visible";
      document.getElementById("man-img-up").src = "./media/man.gif";
      document.getElementById("man-img-down").src = "./media/man.gif";
      break;
    case "pauseGame":
      gameState = "pause";
      document.getElementById("st").innerHTML = "Start";
      document.getElementById("st").onmousedown = function(){startGame()};
      document.getElementById("score").style.visibility = "visible";
      document.getElementById("man-img-up").src = "./media/mans.png";
      document.getElementById("man-img-down").src = "./media/mans.png";
      break;
    case "resetGame":
      gameState = "stop";
      document.getElementById("st").innerHTML = "Start";
      document.getElementById("st").onmousedown = function(){startGame()};
      document.getElementById("score").innerHTML = "0&nbsp;&nbsp;s";
      document.getElementById("man-img-up").src = "./media/mans.png";
      document.getElementById("man-img-down").src = "./media/mans.png";
      break;
  }
  return;
}

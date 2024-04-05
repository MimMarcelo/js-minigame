let time = 500
let timer = setInterval(loop, time);
let direction = 39; //right
let snake = [$("#snake")];
let pieceOn = false;
let piece = null;

$("body").keyup(function (e) {
  if(e.which >= 37 && e.which <=40)
    direction = e.which;
});

function loop(){
  gameOver();
  createPiece();
  getPiece();
  refreshTail();
  goTo();
}

function goTo(){
  switch (direction) {
    case 37: //left
      snake[0].animate({ left: "-=20px" });
      break;
    case 38: // up
      snake[0].animate({ top: "-=20px" });
      break;
    case 39: // right
      snake[0].animate({ left: "+=20px" });
      break;
    case 40: // down
      snake[0].animate({ top: "+=20px" });
      break;
  }
}

function createPiece(){
  if(!pieceOn){
    let left = Math.floor(Math.random() * 9) * 20;
    let top = Math.floor(Math.random() * 9) * 20;
    piece = $("<div>");
    $(piece).addClass("piece");
    $(piece).css({left: left+"px", top: top+"px"});
    $(snake[0]).before(piece);
    pieceOn = true;
  }
}

function gameOver(){
  let left = getPosition(snake[0], "left");
  let top = getPosition(snake[0], "top");
  if(left < 0 || left > 180 || top < 0 || top > 180){
    clearInterval(timer);
    alert("Game Over");
  }
  else{
    snake.forEach(function(piece, index, array){
      if(index > 0){
        if(colision(snake[0], piece)){
          clearInterval(timer);
          alert("Game Over");
        }
      }
    });
  }
}

function getPiece(){
  if(colision(snake[0], piece)){
    pieceOn = false;
    // $(piece).remove();
    $(piece).addClass("tail");
    snake.push(piece);

    // clearInterval(timer);
    // time -= 10
    // timer = setInterval(loop, time);
  }
}

function refreshTail(){
  snake.forEach(function(piece, index, array){
    if(index > 0){
      if(array.length > index+1){
        $(piece).css({left: getPosition(array[index+1], "left")+"px", top: getPosition(array[index+1], "top")+"px"})
      }
      else{
        $(piece).css({left: getPosition(snake[0], "left")+"px", top: getPosition(snake[0], "top")+"px"})
      }
    }
  });
}

function colision(objA, objB){
  let aLeft = getPosition(objA, "left");
  let aTop = getPosition(objA, "top");
  let bLeft = getPosition(objB, "left");
  let bTop = getPosition(objB, "top");
  
  return (aLeft == bLeft && aTop == bTop)
}

function getPosition(obj, p){
  return parseInt(obj.css(p))
}
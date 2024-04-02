let time = 500
let timer = setInterval(loop, time);
let direction = 39; //right
let snake = $("#snake");
let tail = [];
let pieceOn = false;
let piece = null;

$("body").keyup(function (e) {
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
      snake.animate({ left: "-=20px" });
      break;
    case 38: // up
      snake.animate({ top: "-=20px" });
      break;
    case 39: // right
      snake.animate({ left: "+=20px" });
      break;
    case 40: // down
      snake.animate({ top: "+=20px" });
      break;
  }
}

function gameOver(){
  let left = getPosition(snake, "left");
  let top = getPosition(snake, "top");
  if(left < 0 || left > 180 || top < 0 || top > 180){
    clearInterval(timer);
    alert("Game Over");
  }
  else{
    tail.forEach(function(piece, index, array){
      if(index == array.length -1) return;
      let pieceLeft = getPosition(piece, "left");
      let pieceTop = getPosition(piece, "top");
      if(left == pieceLeft && top == pieceTop){
        clearInterval(timer);
        alert("Game Over");
      }
    });
  }
}

function createPiece(){
  if(!pieceOn){
    let left = Math.floor(Math.random() * 9) * 20;
    let top = Math.floor(Math.random() * 9) * 20;
    piece = $("<div>");
    $(piece).addClass("piece");
    $(piece).css({left: left+"px", top: top+"px"});
    $(snake).before(piece);
    pieceOn = true;
  }
}

function getPiece(){
  let snakeLeft = getPosition(snake, "left");
  let snakeTop = getPosition(snake, "top");
  let pieceLeft = getPosition(piece, "left");
  let pieceTop = getPosition(piece, "top");
  
  if(snakeLeft == pieceLeft && snakeTop == pieceTop){
    pieceOn = false;
    // $(piece).remove();
    $(piece).addClass("tail");
    tail.push(piece);

    clearInterval(timer);
    time -= 10
    timer = setInterval(loop, time);
  }
}

function refreshTail(){
  tail.forEach(function(piece, index, array){
    if(array.length > index+1){
      $(piece).css({left: getPosition(array[index+1], "left")+"px", top: getPosition(array[index+1], "top")+"px"})
    }
    else{
      $(piece).css({left: getPosition(snake, "left")+"px", top: getPosition(snake, "top")+"px"})
    }
  })
}

function getPosition(obj, p){
  return parseInt(obj.css(p))
}
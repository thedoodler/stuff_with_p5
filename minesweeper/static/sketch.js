var block_size = 50;
var block_padding = 25;
var the_board;

var bg_col = 'white';

var mine_count = 15;
var delay = 9;// frames between clicks

var row_count = 10;
var column_count = 10;

var game_state = 'run';

var start_frame;
var end_frame;


const mine_col = 'red';
const safe_col = 'blue';
const flag_col = 'grey';
const empty_col = bg_col;
const closed_col = 'black';

function random_color(){
  thecol = color(random(0,255),random(0,255),random(0,255));
  return thecol;
}

function reportsize(){
	resizeCanvas(windowWidth,windowHeight);
}

window.addEventListener('resize', reportsize);

function zero_flood_fill(x,y){
  the_board.flood_fill(x,y);
}

function start_counter(){
    start_frame = frameCount;
}

function end_counter(){
  end_frame = frameCount;
  return (end_frame - start_frame);
}

function mousePressed(event){
  // console.log(event);
  start_counter();
  // the_board.clicked();
}

function mouseReleased(event){
  fr_count = end_counter();
  if (event.button == 0){
    the_board.clicked(fr_count);
  }
  else {
    the_board.right_clicked();
  }
}

function end(){
  game_state = 'end';
  the_board.ender();
}

function set_board(){
  game_state = 'run';
  startpos = createVector(bx,by);
  the_board = new Board(row_count,column_count,startpos);
  the_board.create_list();
  the_board.add_items();
  the_board.set_mines();
  the_board.set_numbers();
  // the_board.check_mine(the_board.block_list[5][6]);

}

function init(){
  ww = windowWidth;
  wh = windowHeight;
  canvas = createCanvas(ww,wh);
  canvas.style('z-index','-1');
  canvas.position(0,0);

  bx = ww/2 - (row_count/2 -1)*(block_size + block_padding);
  by = wh/2 - (column_count/2)*(block_size + block_padding) + block_size + block_padding;
  background(bg_col);

  set_board();
}

function setup(){
  rectMode(CENTER);
  textStyle(BOLD);
  textAlign(CENTER);
  frameRate(30);
  init();

  restart_button = createButton('restart');
  restart_button.position(ww/2,(block_size + block_padding));
  restart_button.mousePressed(init);
}

function draw(){
  // circle(mouseX,mouseY,100);
  the_board.render();
  the_board.is_end();
  if (game_state == 'win'){
    // background(0);
    // circle(mouseX,mouseY,100);
    fill('black');
    textSize(50);
    text("you win babie",ww/2,block_size);
  }
}

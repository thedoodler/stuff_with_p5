function Bubble(start_x,start_y,depth,direction){
  this.start = createVector(start_x,start_y);
  this.xpos = this.start.x;
  this.ypos = this.start.y;
  this.depth = depth;
  this.decval = wh/(max_limit_val**(this.depth+1));
  this.std_velocity = (-1+Math.sqrt(1+(8*this.decval/gravity_value)))/2;
  this.max_limit = (wh)-(this.decval);
  this.size = max_bubble_size/(2**depth);
  this.radius = this.size/2;
  this.y_velocity = -15 ;
  this.direction = direction;
  this.genesis = true;

  this.alive = true;
}

Bubble.prototype.show = function(){
  this.genesis = false;
  circle(this.xpos,this.ypos,this.size);
}

Bubble.prototype.collision = function(){
  // if (this.genesis == false && this.ypos <= this.max_limit && this.y_velocity != 0){
  //   this.y_velocity = gravity_value;
  // }
  if ((this.ypos + this.radius) >= bound_box.high_y){

    // this.y_velocity = -this.y_velocity-gravity_value;
    this.y_velocity = -this.std_velocity * gravity_value;
  }
  if ((this.xpos + this.radius) >= bound_box.high_x  || (this.xpos - this.radius) <= bound_box.low_x){
    this.direction *= -1;
  }
}

Bubble.prototype.gravity = function(){
  this.y_velocity += gravity_value;
  this.ypos += this.y_velocity;

  // console.log(this.y_velocity);

}

Bubble.prototype.move = function(){
  this.xpos += bubble_speed*this.direction;
}

Bubble.prototype.playered = function(){
  let player = player_1;
  val = false;
  dist_x = Math.abs(this.xpos - player.xpos);
  dist_y = Math.abs(this.ypos - player.ypos);

  if ((dist_x < player.width/2 + this.radius) && (dist_y < player.height/2)){
    val = true;
  }
  if ((dist_y < player.height/2 + this.radius) && (dist_x < player.width/2)){
    val = true;
  }

  d = dist(this.xpos,this.ypos,player.xpos,player.ypos);

  if (d < this.radius + dist(player.xpos,player.ypos,player.xpos+player.width/2,player.ypos+player.height/2)){
    val = true;
  }
  return val;

}

Bubble.prototype.wired = function(){
  val = false;
  for (wire of wire_array){
    val = false;
    dist_x = Math.abs(this.xpos - wire.xpos);
    dist_y = Math.abs(this.ypos - wire.ypos);

    if (dist_x > (this.radius + wire.width/2)) { continue; };
    if (dist_y > (this.radius + wire.height/2)) { continue; };

    if ((dist_x < wire.width/2 + this.radius) && (dist_y < wire.height/2)){
      val = true;
      wire.live = false;
      break;
    }
    if ((dist_y < wire.height/2 + this.radius) && (dist_x < wire.width/2)){
      val = true;
      wire.live = false;
      break;
    }

    d = dist(this.xpos,this.ypos,wire.xpos,wire.ypos);

    if (d < this.radius + dist(wire.xpos,wire.ypos,wire.xpos+wire.width/2,wire.ypos+wire.height/2)){
      val = true;
      wire.live = false;
      break;
    }
    else{
      continue;
    }
    // dx = dist_x - wire.width/2;
    // dy = dist_y - wire.width/2;

  }
  return val;
}

Bubble.prototype.clicked = function(){
  this.alive = false;
  this.destroy();
}

Bubble.prototype.destroy = function(){
  if (this.depth<=max_depth){
    l_bub = new Bubble(this.xpos,this.ypos,this.depth+1,-1);
    r_bub = new Bubble(this.xpos,this.ypos,this.depth+1,1);
    temp_array.push(l_bub,r_bub);
  }
}

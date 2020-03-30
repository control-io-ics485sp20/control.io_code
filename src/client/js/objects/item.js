function Item(id) {
    this.id = id;
    this.position.x = 0;
    this.position.y = 0;

    this.image = "";
}

function Ship(id) {
    Item.call(this, id);

    //these are ideas. Not sure if our ships will use these statistics.
    this.health = 0;
    this.deployables = 0;
    this.fuel = 0;   //might not need fuel. 
}

function Asteroid(id) {
    Item.call(this, id);

    this.health = 0;
    this.damage = 0;
}

function Station(id) {
    Item.call(this, id);

    // this.health = 0;
    this.status = "unclaimed";
    this.owner = null;
}

function Planet() {

}
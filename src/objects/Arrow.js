import GameObject from "./GameObject.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { context, images } from "../globals.js";
import Vector from "../../lib/Vector.js";
import Player from "../entities/Player.js";
import Hitbox from "../../lib/Hitbox.js";
export default class Arrow extends GameObject {
	static WIDTH = 16;
	static HEIGHT = 15;


	constructor(position, current) {
        const dimensions = { x: 8, y: 8 };
		super(dimensions, position);
		this.hitbox.position.y = this.position.y + 20
		this.hitbox.dimensions.y = this.dimensions.y - 8
        this.isCollidable = true;
		this.isSolid = true;
		//this.hitbox = new Hitbox(this.position.x , this.position.y + 8, this.dimensions.x , this.dimensions.y);
		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Arrows),
			Arrow.WIDTH,
			Arrow.HEIGHT
		);
		this.currentFrame = current;
		
	}
	update(){
		this.hitbox.position.y = this.position.y + 10
		this.hitbox.position.x = this.position.x
		this.hitbox.dimensions.y = this.dimensions.y - 4
		this.hitbox.dimensions.x = this.dimensions.x
	}
    render(offset = { x: 0, y: 0 }) {
        super.render(offset = { x: -4, y: -2 })
    }

	break(){
        this.isSolid = false;
        this.isCollidable = false;
        this.isBroken = true;           

        this.cleanUp = true;
    }
}

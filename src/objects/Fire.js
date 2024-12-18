import GameObject from "./GameObject.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { images } from "../globals.js";
import Vector from "../../lib/Vector.js";
import Player from "../entities/Player.js";
import Hitbox from '../../lib/Hitbox.js';
import MeatType from "../enums/MeatType.js";
import Animation from "../../lib/Animation.js";
import SoundName from "../enums/SoundName.js";
import { sounds } from "../globals.js";
export default class Fire extends GameObject {
	static WIDTH = 32;
	static HEIGHT = 39;
	static HIT = 0;
	static NOT_HIT = 1;

	/**
	 * A toggle that the player can hit to open the dungeon doors.
	 *
	 * @param {Vector} dimensions
	 * @param {Vector} position
	 */
	constructor(dimensions, position, room) {
		super(dimensions, position);

		this.isCollidable = true;
		this.isSolid = true;

		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Fire), 
			Fire.WIDTH,
			Fire.HEIGHT 
		);
		this.currentFrame = Fire.NOT_HIT;
		this.room = room;
		this.collided = false;
		this.animation = null;
		this.doors = false
		
	}

	onCollision(collider) {
		super.onCollision(collider);

		if (collider instanceof Player && collider.meat !== null && !this.collided) {
			this.player = collider
			this.collided = true
			switch (collider.meat) {
				case MeatType.Cow:
					collider.heal();
					break;
		
				case MeatType.Rabbit:
					collider.increaseSpeed();
					break;
		
				case MeatType.Sheep:
					collider.increaseHealth()
					break;
			}
			this.animation = new Animation([0,1,2,3,4,5,6,7], 0.2, 5)
			sounds.play(SoundName.BBQ);
			if(!this.doors)
			{this.room.openDoors(); this.doors = true}
			this.currentFrame = Fire.HIT;
		}
	}

	update(dt) { 
		this.hitbox.set(
			this.position.x + this.hitboxOffsets.position.x,
			this.position.y + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
		);
		if(this.animation !== null)
		{
			this.animation.update(dt)
			this.currentFrame = this.animation.currentFrame
			if(this.animation.isDone())
			{
				this.collided = false;
				this.animation = null;
				this.player.meat = null;
			} 
			
		}
		
	}

	
}

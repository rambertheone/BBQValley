import GameObject from './GameObject.js';
import { context, sounds } from '../globals.js';
import SoundName from '../enums/SoundName.js';
import Sprite from '../../lib/Sprite.js';
import ImageName from '../enums/ImageName.js';
import Tile from './Tile.js';
import { images } from "../globals.js";
export default class Meat extends GameObject {
    static WIDTH = 16;
    static HEIGHT = 16;


    constructor(meatType, position) {
        const dimensions = { x: Meat.WIDTH, y: Meat.HEIGHT };
        super(dimensions, position);
        this.meatType = meatType;
        this.sprites =  Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Meat),
			Meat.WIDTH,
			Meat.HEIGHT
		);
         
    }


    onConsume(consumer) {
        super.onConsume(consumer); // Mark as consumed
        if(consumer.meat === null)
        {
            consumer.meat = this.meatType;
        }
        
        this.cleanUp = true; 
    }


    render(offset = { x: 0, y: 0 }) {
        const x = this.position.x + offset.x;
		const y = this.position.y + offset.y;
        this.sprites[this.meatType].render(Math.floor(x), Math.floor(y))
        
    }
}
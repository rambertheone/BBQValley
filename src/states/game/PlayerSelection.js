import GameStateName from '../../enums/GameStateName.js'; 
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	input,
	sounds,
	stateMachine,
    images,
} from './../../globals.js';
import State from '../../../lib/State.js';
import { roundedRectangle } from '../../../lib/Drawing.js';
import Input from '../../../lib/Input.js';
import SoundName from '../../enums/SoundName.js';
import ImageName from '../../enums/ImageName.js';
import Sprite from '../../../lib/Sprite.js';
import Animation from '../../../lib/Animation.js';


export default class PlayerSelectionState extends State {
    static sword = { x: CANVAS_WIDTH / 2 - 100, y: 60, width: 64, height: 64 };
    static bow = { x: CANVAS_WIDTH / 2 + 50, y: 60, width: 64, height: 64 };
    
	constructor() {
		super();
        this.idlingSwordSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.PlayerSelectionSword),
			64,
			64
		);

        this.idlingBowSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.PlayerSelectionBow),
			64,
			64
		);

        this.animation = new Animation([0,1,2,3],0.2)

		// Start the music the very first time showing this state.
		sounds.play(SoundName.Music);
	}

	enter() {
	}

	exit() {
		sounds.pause(SoundName.Music);
	}

	update(dt) {
		this.animation.update(dt)

        if (input.isKeyPressed(Input.KEYS[1])) {
            localStorage.setItem('selectedCharacter', "sword-swinging");
            const character = localStorage.getItem('selectedCharacter');
            console.log(character)
            stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Play],
			});
		}
        if (input.isKeyPressed(Input.KEYS[2])) {
            localStorage.setItem('selectedCharacter', "bow");
            const character = localStorage.getItem('selectedCharacter');
            console.log(character)

			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Play],
			});
		}
	}

    drawBallChoice() {
        context.fillStyle = 'rgb(255, 255, 255, 0.5)';
        
        roundedRectangle(context, PlayerSelectionState.sword.x, PlayerSelectionState.sword.y, PlayerSelectionState.sword.width, PlayerSelectionState.sword.height, 5, true, false);
        this.drawCharacter(1, PlayerSelectionState.sword, this.animation.currentFrame); 

        roundedRectangle(context, PlayerSelectionState.bow.x, PlayerSelectionState.bow.y, PlayerSelectionState.bow.width, PlayerSelectionState.bow.height, 5, true, false);
        this.drawCharacter(2, PlayerSelectionState.bow, this.animation.currentFrame); 

        context.font = '25px serif';
		context.fillStyle = 'white';
		context.fillText(
			'Press 1 or 2 to select the character',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 15
		);
    }

    drawCharacter(spriteName, area, index = 0) {
        
        let scale = 1
        context.save();

        context.scale(scale, scale);
        if(spriteName == 1)
        {
            this.idlingSwordSprites[index].render(area.x / scale, area.y / scale);
        }
        else
        {
            this.idlingBowSprites[index].render(area.x / scale, area.y / scale);
        }

        context.restore();
    }


	
	isMouseInsideArea(mousePos, area) {
		return (
			mousePos.x >= area.x &&
			mousePos.x <= area.x + area.width &&
			mousePos.y >= area.y &&
			mousePos.y <= area.y + area.height
		);
	}

	render() {
        this.drawBallChoice();
	}

}
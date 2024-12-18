import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import GameStateName from '../../enums/GameStateName.js';
import SoundName from '../../enums/SoundName.js';
import ImageName from '../../enums/ImageName.js';
import PlayState from './PlayState.js';
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	input,
	sounds,
	stateMachine,
	timer,
} from '../../globals.js';

export default class VictoryState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to the title screen.
	 */
	constructor() {
		super();
	}

	enter() {
        sounds.stop(SoundName.Music);
		sounds.play(SoundName.Victory);
	}

	update() {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.states[GameStateName.Play] = new PlayState()
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.TitleScreen],
			});
		}
	}


    render() {
        images.render(ImageName.Victory, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.font = '50px serif';
        context.fillStyle = '#FFD700';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
    
        context.font = '20px serif';
        context.fillStyle = 'black';
        context.fillText(
            'Thank you for playing!',
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2 + 40
        );
        context.font = '24px serif';
        context.fillStyle = 'black';
        context.fillText(
            'Press Enter to play again',
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT - 40
        );
    
        
    }
}

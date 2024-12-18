import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import GameStateName from '../../enums/GameStateName.js';
import SoundName from '../../enums/SoundName.js';
import PlayState from './PlayState.js';
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	input,
	sounds,
	stateMachine,
} from '../../globals.js';

export default class GameOverState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to the title screen.
	 */
	constructor() {
		super();
	}

	enter() {
		sounds.stop(SoundName.Music);
		sounds.play(SoundName.Over);
	}

	update() {
		
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.states[GameStateName.Play] = new PlayState()
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.TitleScreen],
			});
			sounds.stop(SoundName.Over);
		}
	}


	render() {
		context.font = '50px serif';
		context.fillStyle = '#8B4513';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('You Have Fallen...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);
	
		context.font = '30px serif';
		context.fillStyle = '#228B22';
		context.fillText('You Will Starve To Death...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
	
		context.font = '24px serif';
		context.fillStyle = '#DAA520';
		context.fillText(
			'Press Enter to start a new season',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 60
		);
	}
}

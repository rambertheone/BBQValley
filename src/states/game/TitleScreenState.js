import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import GameStateName from '../../enums/GameStateName.js';
import ImageName from '../../enums/ImageName.js';
import SoundName from '../../enums/SoundName.js';
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

export default class TitleScreenState extends State {
	/**
	 * Displays a title screen where the player
	 * can press enter to start a new game.
	 */
	constructor() {
		super();
	}

	enter() {
		sounds.play(SoundName.Cool);
		localStorage.setItem('selectedCharacter', "sword-swinging");
	}

	exit() {
		sounds.stop(SoundName.Cool);
	}

	update(dt) {
		timer.update(dt);

		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Play],
			});
		}
		if(input.isKeyPressed(Input.KEYS.E))
		{
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.SelectionState],
			});
		}
	}


	render() {
		images.render(ImageName.Background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
		context.font = '70px serif';
		context.fillStyle = 'black';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('BBQ Valley', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);
	
		
		context.font = '28px serif';
		context.fillStyle = '#8B4513';
		context.fillText('Grill To Survive!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
	
	
		context.font = '25px serif';
		context.fillStyle = 'white';
		context.fillText(
			'Press Enter to start the hunt!',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 40
		);
		context.font = '25px serif';
		context.fillStyle = 'black';
		context.fillText(
			'Press E to select a character',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 15
		);
	
		
	}
}

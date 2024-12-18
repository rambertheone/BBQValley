import Animation from '../../../../lib/Animation.js';
import State from '../../../../lib/State.js';
import Player from '../../../entities/Player.js';
import Direction from '../../../enums/Direction.js';
import PlayerStateName from '../../../enums/PlayerStateName.js';
import { input } from '../../../globals.js';
import Input from '../../../../lib/Input.js';

export default class PlayerIdlingState extends State {
	/**
	 * In this state, the player is stationary unless
	 * a directional key or the spacebar is pressed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([4,5,6,7], 0.5),
			[Direction.Down]: new Animation([0, 1, 2, 3], 0.5),
			[Direction.Left]: new Animation([12, 13, 14, 15], 0.5),
			[Direction.Right]: new Animation([8,9,10,11], 0.5),
		};
	}

	enter() {
		if(this.player.weapon === PlayerStateName.Bow)
		{
			this.player.sprites = this.player.idlingBowSprites
		}
		else{
			this.player.sprites = this.player.idlingSwordSprites;
		}
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update() {
		this.checkForMovement();
		this.checkForSwordSwing();
		this.handleBow();
	}

	checkForMovement() {
		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.W)) {
			this.player.direction = Direction.Up;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
	}

	checkForSwordSwing() {
		if (input.isKeyPressed(Input.KEYS.SPACE)) {
			this.player.changeState(PlayerStateName.SwordSwinging);
		}
	}

	handleBow() {
		if (input.isKeyPressed(Input.KEYS.SPACE) && this.player.weapon === PlayerStateName.Bow)
		{
			this.player.changeState(PlayerStateName.Bow)
		}
	}


}

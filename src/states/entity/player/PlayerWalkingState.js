import Animation from '../../../../lib/Animation.js';
import Input from '../../../../lib/Input.js';
import State from '../../../../lib/State.js';
import Player from '../../../entities/Player.js';
import Direction from '../../../enums/Direction.js';
import PlayerStateName from '../../../enums/PlayerStateName.js';
import { input } from '../../../globals.js';
import Room from '../../../objects/Room.js';

export default class PlayerWalkingState extends State {
	/**
	 * In this state, the player can move around using the
	 * directional keys. From here, the player can go idle
	 * if no keys are being pressed. The player can also swing
	 * their sword if they press the spacebar.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([4,5,6,7], 0.2),
			[Direction.Down]: new Animation([0, 1, 2, 3], 0.2),
			[Direction.Left]: new Animation([12, 13, 14, 15], 0.2),
			[Direction.Right]: new Animation([8,9,10,11], 0.2),
		};
	}

	enter() {
		if(this.player.weapon === PlayerStateName.Bow)
		{
			this.player.sprites = this.player.walkingBowSprites
		}
		else
		{
			this.player.sprites = this.player.walkingSprites;
		}
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update(dt) {
		this.handleMovement(dt);
		this.handleSwordSwing();
		this.handleBow();
	}

	handleMovement(dt) {
		this.player.currentAnimation = this.animation[this.player.direction];

		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
			this.player.position.y += this.player.speed * dt;

			if (
				this.player.position.y + this.player.dimensions.y >=
				Room.BOTTOM_EDGE + 5
			) {
				this.player.position.y =
					Room.BOTTOM_EDGE - this.player.dimensions.y + 5;
			}
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.position.x += this.player.speed * dt;

			if (
				this.player.position.x + this.player.dimensions.x >=
				Room.RIGHT_EDGE - 5
			) {
				this.player.position.x =
					Room.RIGHT_EDGE - 5 - this.player.dimensions.x;
			}
		} else if (input.isKeyPressed(Input.KEYS.W)) {
			this.player.direction = Direction.Up;
			this.player.position.y -= this.player.speed * dt;

			if (
				this.player.position.y <=
				Room.TOP_EDGE - this.player.dimensions.y
			) {
				this.player.position.y =
					Room.TOP_EDGE - this.player.dimensions.y;
			}
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.position.x -= this.player.speed * dt;

			if (this.player.position.x <= Room.LEFT_EDGE - 10) {
				this.player.position.x = Room.LEFT_EDGE - 10;
			}
		} else {
			this.player.changeState(PlayerStateName.Idle);
		}
	}

	handleSwordSwing() {
		if (input.isKeyPressed(Input.KEYS.SPACE) && this.player.weapon === PlayerStateName.SwordSwinging) {
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

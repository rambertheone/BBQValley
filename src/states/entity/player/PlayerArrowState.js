import Animation from '../../../../lib/Animation.js';
import State from '../../../../lib/State.js';
import Player from '../../../entities/Player.js';
import Direction from '../../../enums/Direction.js';
import PlayerStateName from '../../../enums/PlayerStateName.js';
import { timer, sounds } from '../../../globals.js';
import Room from '../../../objects/Room.js';
import Vector from '../../../../lib/Vector.js';
import SoundName from '../../../enums/SoundName.js';
import Sounds from '../../../../lib/Sounds.js';
import Arrow from '../../../objects/Arrow.js';
import Easing from '../../../../lib/Easing.js';
export default class PlayerArrowState extends State {
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
			[Direction.Up]: new Animation([4,5,6,7], 0.1,1),
			[Direction.Down]: new Animation([0, 1, 2, 3], 0.1,1),
			[Direction.Left]: new Animation([12, 13, 14, 15], 0.1,1),
			[Direction.Right]: new Animation([8,9,10,11], 0.1,1),
		};
	}
	
	async enter() {
		this.player.sprites = this.player.bowAttackSprites;
		this.player.currentAnimation = this.animation[this.player.direction];
		this.throwDistance = 50;
        this.arrow();

	}
    async arrow(){
		let targetX = 0
		let targetY = 0
		let arrow = null
		switch (this.player.direction) {
			case Direction.Up:
				arrow = new Arrow(new Vector(this.player.position.x + 10, this.player.position.y - 6), 2)
				this.player.room.objects.push(arrow)

				await timer.addTask(() => {
					if(arrow.isCollidable)
					{
						arrow.position.y -= 3
					}
				}, 0.1, 3, () => {
					arrow.cleanUp = true;
				});
				
				break;
			case Direction.Down:
				arrow = new Arrow(new Vector(this.player.position.x + 10, this.player.position.y + 16), 3)
				this.player.room.objects.push(arrow)

				await timer.addTask(() => {
					if(arrow.isCollidable)
					{
						arrow.position.y += 3
					}
				}, 0.1, 3, () => {
					arrow.cleanUp = true;
				});

				break;
			case Direction.Left:
				arrow = new Arrow(new Vector(this.player.position.x, this.player.position.y + 10), 1)
				this.player.room.objects.push(arrow)

				await timer.addTask(() => {
					if(arrow.isCollidable)
					{
						arrow.position.x -= 3
					}
				}, 0.1, 3, () => {
					arrow.cleanUp = true;
				});

				break;
			case Direction.Right:
				arrow = new Arrow(new Vector(this.player.position.x + 22, this.player.position.y + 10), 0)
				this.player.room.objects.push(arrow)

				await timer.addTask(() => {
					if(arrow.isCollidable)
					{
						arrow.position.x += 3
					}
				}, 0.1, 3, () => {
					arrow.cleanUp = true;
				});
				break;
		}
		this.player.changeState(PlayerStateName.Idle);
    }

	update() {
		// Idle once one sword swing animation cycle has been played.
		if (this.player.currentAnimation.isDone()) {
			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idle);
		}
	}
}
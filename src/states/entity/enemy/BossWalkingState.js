import Animation from '../../../../lib/Animation.js';
import {
	didSucceedChance,
	getRandomPositiveInteger,
	pickRandomElement,
} from '../../../../lib/Random.js';
import State from '../../../../lib/State.js';
import Enemy from '../../../entities/enemies/Enemy.js';
import Direction from '../../../enums/Direction.js';
import EnemyStateName from '../../../enums/EnemyStateName.js';
import { timer } from '../../../globals.js';
import Room from '../../../objects/Room.js';
import EnemyWalkingState from './EnemyWalkingState.js';

export default class BossWalkingState extends EnemyWalkingState {
	static IDLE_CHANCE = 0.5;
	static MOVE_DURATION_MIN = 2;
	static MOVE_DURATION_MAX = 6;

	/**
	 * In this state, the enemy moves around in random
	 * directions for a random period of time.
	 *
	 * @param {Enemy} enemy
	 * @param {Animation} animation
	 */
	constructor(enemy, animation) {
		super(enemy, animation);
	}

	// enter() {
	// 	super.enter()
	// }

	// update(dt) {
	// 	super.update(dt)
	// }

	// async startTimer() {
	// 	super.startTimer()
	// }

	// /**
	//  * 50% chance for the snail to go idle for more dynamic movement.
	//  * Otherwise, start the movement timer again.
	//  */
	// decideMovement() {
	// 	super.decideMovement()
	// }

	// /**
	//  * 25% chance for the enemy to move in any direction.
	//  * Reset the movement timer to a random duration.
	//  */
	// reset() {
	// 	super.
	// }

	move(dt) {
		if (this.enemy.direction === Direction.Down) {
			this.enemy.position.y += this.enemy.speed * dt;

			if (
				this.enemy.position.y + this.enemy.dimensions.y >
				Room.BOTTOM_EDGE - 40
			) {
				this.enemy.position.y =
					Room.BOTTOM_EDGE - this.enemy.dimensions.y - 40;
				this.reset();
			}
		} else if (this.enemy.direction === Direction.Right) {
			this.enemy.position.x += this.enemy.speed * dt;

			if (
				this.enemy.position.x + this.enemy.dimensions.x >
				Room.RIGHT_EDGE - 50
			) {
				this.enemy.position.x =
					Room.RIGHT_EDGE - 50 -this.enemy.dimensions.x;
				this.reset();
			}
		} else if (this.enemy.direction === Direction.Up) {
			this.enemy.position.y -= this.enemy.speed * dt;

			if (
				this.enemy.position.y <
				Room.TOP_EDGE - this.enemy.dimensions.y / 2
			) {
				this.enemy.position.y =
					Room.TOP_EDGE - this.enemy.dimensions.y / 2;
				this.reset();
			}
		} else if (this.enemy.direction === Direction.Left) {
			this.enemy.position.x -= this.enemy.speed * dt;

			if (this.enemy.position.x < Room.LEFT_EDGE ) {
				this.enemy.position.x = Room.LEFT_EDGE ;
				this.reset();
			}
		}
	}
}

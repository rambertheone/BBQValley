import EnemyType from "../enums/EnemyType.js";
import Cow from "../entities/enemies/Cow.js";
import Rabbit from "../entities/enemies/Rabbit.js";
import Sheep from "../entities/enemies/Sheep.js";
import Boss from "../entities/enemies/Boss.js";

/**
 * Encapsulates all definitions for instantiating new enemies.
 */
export default class EnemyFactory {
	/**
	 * @param {string} type A string using the EnemyType enum.
	 * @param {array} sprites The sprites to be used for the enemy.
	 * @returns An instance of an enemy specified by EnemyType.
	 */
	static createInstance(type) {
		switch (type) {
			case EnemyType.Cow:
				return new Cow()
			case EnemyType.Rabbit:
				return new Rabbit()
			case EnemyType.Sheep:
				return new Sheep()
			case EnemyType.Boss:
				return new Boss()
		}
	}
}

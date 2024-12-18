import EnemyType from "../enums/EnemyType.js"
import Meat from "../objects/Meat.js"
import MeatType from "../enums/MeatType.js"
export default class MeatFactory {

	static createInstance(enemyType, position) {
		switch (enemyType) {
			case EnemyType.Cow:
				return new Meat(MeatType.Cow, position);
			case EnemyType.Rabbit:
				return new Meat(MeatType.Rabbit, position);
			case EnemyType.Sheep:
				return new Meat(MeatType.Sheep, position);
			case EnemyType.Boss:
				return new Meat(MeatType.Boss, position);
		}
	}
}
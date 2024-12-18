import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";
import Sprite from "../../../lib/Sprite.js";
import { images } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import EnemyType from "../../enums/EnemyType.js";
export default class Sheep extends Enemy {
	static SPEED = 20;

	constructor() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.BiggerAnimal),
			42,
			36
		);
		super(sprites);
		this.type = EnemyType.Sheep;
		this.hitboxOffsets.set(3, 10, 3, -10);
		this.speed = Sheep.SPEED;

		const animations = {
			[EnemyStateName.Idle]: {
				[Direction.Up]: new Animation([37], 1),
				[Direction.Down]: new Animation([1], 1),
				[Direction.Left]: new Animation([13], 1),
				[Direction.Right]: new Animation([25], 1),
			},
			[EnemyStateName.Walking]: {
				[Direction.Up]: new Animation([36, 37, 38, 37], 0.2),
				[Direction.Down]: new Animation([0, 1, 2, 1], 0.2),
				[Direction.Left]: new Animation([12, 13, 14, 13], 0.2),
				[Direction.Right]: new Animation([24, 25, 26, 25], 0.2),
			}
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}
	render(offset = { x: 0, y: 0 }) {
        super.render(offset = { x: -8, y: -20 })
    }
}
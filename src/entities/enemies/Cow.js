import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";
import Sprite from "../../../lib/Sprite.js";
import { images } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import EnemyType from "../../enums/EnemyType.js";
export default class Cow extends Enemy {
	static SPEED = 20;

	constructor() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.BigAnimal),
			42,
			36
		);
		super(sprites);
		this.type = EnemyType.Cow;
		this.hitboxOffsets.set(-1, 10, 6, -10);
		this.speed = Cow.SPEED;

		const animations = {
			[EnemyStateName.Idle]: {
				[Direction.Up]: new Animation([40], 1),
				[Direction.Down]: new Animation([4], 1),
				[Direction.Left]: new Animation([16], 1),
				[Direction.Right]: new Animation([28], 1),
			},
			[EnemyStateName.Walking]: {
				[Direction.Up]: new Animation([39, 40, 41, 40], 0.2),
				[Direction.Down]: new Animation([3, 4, 5, 4], 0.2),
				[Direction.Left]: new Animation([15, 16, 17, 16], 0.2),
				[Direction.Right]: new Animation([27, 28, 29, 28], 0.2),
			}
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}
	render(offset = { x: 0, y: 0 }) {
        super.render(offset = { x: -10, y: -20 })
    }
}
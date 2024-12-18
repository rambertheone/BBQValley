import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";
import Sprite from "../../../lib/Sprite.js";
import { images } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import EnemyType from "../../enums/EnemyType.js";
export default class Rabbit extends Enemy {
	static SPEED = 20;

	constructor() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.MediumAnimal),
			42,
			36
		);
		super(sprites);
		this.type = EnemyType.Rabbit;
		this.hitboxOffsets.set(5, 10, -6, -10);
		this.speed = Rabbit.SPEED;

		const animations = {
			[EnemyStateName.Idle]: {
				[Direction.Up]: new Animation([46], 1),
				[Direction.Down]: new Animation([10], 1),
				[Direction.Left]: new Animation([22], 1),
				[Direction.Right]: new Animation([34], 1),
			},
			[EnemyStateName.Walking]: {
				[Direction.Up]: new Animation([45, 46, 47, 46], 0.2),
				[Direction.Down]: new Animation([9, 10, 11, 10], 0.2),
				[Direction.Left]: new Animation([21, 22, 23, 22], 0.2),
				[Direction.Right]: new Animation([33, 34, 35, 34], 0.2),
			}
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}
	render(offset = { x: 0, y: 0 }) {
        super.render(offset = { x: -10, y: -20 })
    }
}
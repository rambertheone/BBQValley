import EnemyStateName from "../../enums/EnemyStateName.js";
import Enemy from "./Enemy.js";
import StateMachine from '../../../lib/StateMachine.js';
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";
import Sprite from "../../../lib/Sprite.js";
import { images } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import EnemyType from "../../enums/EnemyType.js";
import BossWalkingState from "../../states/entity/enemy/BossWalkingState.js";
import EnemyIdlingState from "../../states/entity/enemy/EnemyIdlingState.js";
export default class Boss extends Enemy {
	static SPEED = 100;
    static HEIGHT = 80;
    static WIDTH = 80;

	constructor() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Boss),
			Boss.HEIGHT,
			Boss.WIDTH
		);
		super(sprites);
		this.health = 20
		this.type = EnemyType.Boss;
		this.hitboxOffsets.set(25, 47, 15, 0);
		this.speed = Boss.SPEED;
        this.damage = 4;
        
		const animations = {
			[EnemyStateName.Idle]: {
				[Direction.Up]: new Animation([60,61,62,63], 0.5),
				[Direction.Down]: new Animation([36,37,38,39], 0.5),
				[Direction.Left]: new Animation([43,44,45,46], 0.5),
				[Direction.Right]: new Animation([52,53,54], 0.5),
			},
			[EnemyStateName.Walking]: {
				[Direction.Up]: new Animation([24,25,26,27,28,29,30,31], 0.2),
				[Direction.Down]: new Animation([0,1,2,3,4,5,6,7], 0.2),
				[Direction.Left]: new Animation([8,9,10,11,12,13,14,15], 0.2),
				[Direction.Right]: new Animation([16,17,18,19,20,21,22,23], 0.2),
			}
		};

		this.stateMachine = this.initializeStateMachine(animations);
	}
	render(offset = { x: 0, y: 0 }) {
        super.render(offset = { x: 0, y: 0 })
    }

    initializeStateMachine(animations) {
		const stateMachine = new StateMachine();

		stateMachine.add(
			EnemyStateName.Idle,
			new EnemyIdlingState(this, animations[EnemyStateName.Idle])
		);
		stateMachine.add(
			EnemyStateName.Walking,
			new BossWalkingState(this, animations[EnemyStateName.Walking])
		);

		stateMachine.change(EnemyStateName.Walking);

		return stateMachine;
	}
}
import EnemyControl from './EnemyControl';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {
	@property
	speed: number = 400;

	onLoad() {
		// 开启碰撞
		// cc.director.getCollisionManager().enabled = true;
	}

	start() {
    }

	update(dt) {
		this.node.y += this.speed * dt;


		if (this.node.y > 820) {
			this.node.destroy();
		}
	}

	onCollisionEnter(other) {
		if (other.tag == 1) {
			other.getComponent(EnemyControl).die();
			this.node.destroy();
		}
	}
}

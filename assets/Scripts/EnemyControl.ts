const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {
	isDie: boolean = false;

	@property(cc.Prefab)
	enemyButtlePrefab: cc.Prefab = null;

	start() {
		 // 生产子弹
		 this.schedule(() => {
			let bullet = cc.instantiate(this.enemyButtlePrefab);
			bullet.setParent(cc.director.getScene());
			bullet.x = this.node.x;
			bullet.y = this.node.y - 80;
		}, 0.5);
	}

	update (dt) {
        if(this.isDie == false) {
            this.node.y -= 300 *dt;
        }

        if(this.node.y < -850) {
            this.node.destroy();
        }
    }

	die() {
        this.isDie = true;
		cc.loader.loadRes('enemy0_die', cc.SpriteFrame, (err, res) => {
			this.node.getComponent(cc.Sprite).spriteFrame = res;
		});
		setTimeout(() => {
			this.node.destroy();
		}, 300);
	}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {
	@property(cc.Prefab)
	buttlePrefab: cc.Prefab = null;

	start() {
        // 鼠标移动
		this.node.on(cc.Node.EventType.TOUCH_MOVE, (e) => {
			this.node.setPosition(e.getLocation());
		});
        // 生产子弹
		this.schedule(() => {
			let bullet = cc.instantiate(this.buttlePrefab);
			bullet.setParent(cc.director.getScene());
			bullet.x = this.node.x;
			bullet.y = this.node.y + 80;
		}, 0.5);
		// 开启碰撞
		cc.director.getCollisionManager().enabled = true;
		cc.director.getCollisionManager().enabledDebugDraw = true;
	}
	update (dt) {
		
	}

	onCollisionEnter(other) {
		if (other.tag == 5) {
			cc.loader.loadRes('hero1_die', cc.SpriteFrame, (err, res) => {
				this.node.getComponent(cc.Sprite).spriteFrame = res;
			});
			setTimeout(() => {
				this.node.destroy()
			}, 300);
		}
	}
} 

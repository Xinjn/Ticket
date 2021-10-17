//sc6界面
function SC6UI() {
    SC6UI.super(this);
    console.log("进入sc6界面");

    //随着屏幕尺寸改变适配UI位置
    Laya.stage.on(Laya.Event.RESIZE, this, resizeFn);

    function resizeFn() {
        let w = Laya.stage.width;
        let h = Laya.stage.height;
        if (Laya.stage.scaleMode == "fixedheight") {
            this.x = (Laya.stage.width - this.width) / 2
            this.bigTitle.x = Laya.stage.width / 2
            this.smallTitle.x = Laya.stage.width / 2
        }
    }

    //声明音频
    var SoundManager = Laya.SoundManager;
    console.log("播放音乐");
    SoundManager.playMusic("res/sounds/bgm2.mp3", 1, new Laya.Handler(this, onComplete));

    function onComplete() {
        console.log("播放完成");
    }

    //使用微信端的API去进行音频的管理
    try {
        if (wx.createInnerAudioContext) {
            SoundManager.stopMusic()
            this.bgm_01 = wx.createInnerAudioContext();
            this.bgm_01.src = "res/sounds/bgm2.mp3";
            this.bgm_01.loop = true;
            this.bgm_01.play();
        }
    } catch (error) {}

    //获取舞台宽高
    let w = Laya.stage.width;
    let h = Laya.stage.height;
    //设置蒙版的宽高
    this.black.width = w;
    //设置文本居中对齐
    this.bigTitle.x = w / 2
    this.smallTitle.x = w / 2

    //设置层级
    this.blackIn.zOrder = 0;
    //过渡动画
    this.blackIn.play(0, false)

    //哈希表(设置特定动画跳转)
    var obj = {
        1: "0",
        2: "190",
        3: "400",
        4: "0"
    };

    //船底波纹
    this.ripple.play();

    //旗帜进入
    this.flag_in.play(0, false);

    //旗帜进入监听
    this.flag_in.on(Laya.Event.COMPLETE, this, onFlagIn);

    //切换旗帜摇晃动画
    function onFlagIn() {
        this.flag_shake.play(0, true);
    }

    //前进/暂停开关
    var toggle = false;

    //获取flag属性
    var flag = this.flag;
    //获取flag前进title
    var forward = this.forward;
    //获取flag暂停title
    var suspend = this.suspend;

    //记录背景当前帧
    var indexBg = 0;
    //获取背景动画
    var move = this.move;
    //获取背景动画播放帧间隔（速度）
    move.interval = 50;

    //监听旗帜点击事件
    flag.on(Laya.Event.MOUSE_DOWN, this, onFlag);
    //触发点击事件：前进/暂停动画
    function onFlag() {
        //清除旗帜摇晃动画
        this.flag_shake.clear();
        //旗帜静止动画
        this.flag_static.play(0, false);

        //切换开关
        toggle = !toggle
        if (toggle) {
            console.log("前进");
            //记录背景当前帧
            indexBg = move.index;
            //播放
            move.play(indexBg, false);
            //切换title
            forward.visible = false
            suspend.visible = true

        } else {
            console.log("暂停");
            //暂停
            move.stop();
            //记录背景当前帧
            indexBg = move.index;
            //切换title
            forward.visible = true;
            suspend.visible = false;

            //实例化PartPageUI页面
            this.PartUI = new PartUI(onplay);
            //将PartPageUI插入到舞台
            Laya.stage.addChild(this.PartUI);
        }
    }

    //监听特定标签事件
    move.on(Laya.Event.LABEL, this, onLabelMove);
    //触发标签事件
    function onLabelMove(label) { //注意传参数
        switch (label) {
            case "tip":
                console.log("触发标签事件:" + label);
                //暂停动画
                move.stop();
                console.log("暂停动画", indexBg);
                console.log("暂停动画", move.indexBg);
                //记录当前帧
                indexBg = move.index;
                //切换旗帜title
                forward.visible = true;
                suspend.visible = false;
                //dialog界面
                //将dialog页面插入到舞台
                Laya.stage.addChild(new DialogUI(onplay));
                break;
            case "title2":
                this.bigTitle.text = "第一枪"
                this.smallTitle.text = "1927年，南昌起义打响武装反抗国民党反动派的第一枪"
                break;
            case "title3":
                this.bigTitle.text = "星星之火，可以燎原"
                this.smallTitle.text = "1927年，首个农村革命根据地在井冈山建立"
                break;
            case "laba":
                SoundManager.playSound("res/sounds/laba.mp3", 1);
                break;
            case "biu":
                SoundManager.playSound("res/sounds/biu.mp3", 1);
                break;
            default:
                break;
        }
    }

    //继续播放 / 播放特定动画
    function onplay(part) {
        console.log("继续播放")
            //设置开关
        toggle = true;
        //切换旗帜title
        forward.visible = false
        suspend.visible = true
            //index必须+1不然标签事件会循环触发
        indexBg++

        if (part) { //播放特定动画
            console.log("跳转到" + part + "帧数" + parseInt(obj[part]))
            move.play(parseInt(obj[part]), false);

        } else { //继续播放
            console.log("继续播放", indexBg)
            move.play(indexBg, false);

        }
    }

}
Laya.class(SC6UI, "SC6UI", SC6PageUI)
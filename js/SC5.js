//sc5界面（登录页面）
function SC5UI() {
    SC5UI.super(this);

    this.x = (Laya.stage.width - this.width) / 2
    Laya.stage.on(Laya.Event.RESIZE, this, resizeFn);
    //随着屏幕尺寸改变适配UI位置
    function resizeFn() {
        let w = Laya.stage.width;
        let h = Laya.stage.height;
        if (Laya.stage.scaleMode == "fixedheight") {
            this.x = (Laya.stage.width - this.width) / 2
        }
    }
    //获取舞台宽高
    let w = Laya.stage.width;
    let h = Laya.stage.height;
    //设置蒙版的宽高
    this.black.width = w
    this.black.height = h
        //设置蒙版层级
    this.blackIn.zOrder = 0;
    //播放蒙版动画
    this.blackIn.play(0, false)

    //背景动画
    //实例化Animation
    this.xhAni = new Laya.Animation();
    //加载Animation
    this.xhAni.loadAnimation("res/ani/xh_bg.ani"); //注意引入路径和后缀名称
    //设置位置
    this.xhAni.pos(640, 360); //居中

    //设置层级
    this.xhAni.zOrder = -1;
    //播放动画
    this.xhAni.play();
    //设置背景动画系数
    this.xhAni.scaleX = this.xhAni.scaleY = 1.5;
    //背景动画插入到LoadingUI
    // this.addChild(this.xhAni);


    //声明数字1
    var but1 = this.but1;
    //声明数字2
    var but2 = this.but1;
    //声明数字3
    var but3 = this.but1;
    //声明数字4
    var but4 = this.but1;
    //声明数字5
    var but5 = this.but1;
    //声明数字6
    var but6 = this.but1;
    //声明数字7
    var but7 = this.but1;
    //声明数字8
    var but8 = this.but1;
    //声明数字9
    var but9 = this.but1;
    //声明数字0
    var but0 = this.but1;
    //声明数字delete
    var butDelete = this.delete;
    //声明数字按钮
    var buts = this.buts;
    //监听按钮
    buts.on(Laya.Event.MOUSE_DOWN, this, onClick);
    //获取展示总列表
    var list = this.labels._childs;

    //圆圈sk
    var skeleton = this.skeleton
    skeleton = new Laya.Skeleton();
    skeleton.load("res/sk/quan.sk", Laya.Handler.create(this, onComplete), 1)

    function onComplete() {
        skeleton.zOrder = 1;
        skeleton.paused()
    }

    //触发点击事件
    function onClick(e) {

        var value = e.target.name
        if (value) {
            //传入输入展示
            onLabs(value)
        }

        // 触发圆圈sk动画
        if (value === "delete") {
            e.target.addChild(skeleton)
            skeleton.x = 87
            skeleton.y = 45
            skeleton.play(0, false)
        } else {
            e.target.addChild(skeleton)
            skeleton.x = 45
            skeleton.y = 45
            skeleton.play(0, false)
        }

    }

    //声明数值
    var number = '';
    //声明星星
    var start = this.start;
    //声明正确回答
    var success = this.success;
    //声明错误提示
    var error = this.error;
    //声明出发
    var go = this.go;
    //声明出发动画
    var ticketAni = this.ticketAni;


    //输入展示函数
    function onLabs(value) {
        //输入逻辑
        if (value === "delete") {
            console.log("点击删除");
            if (number.length > 0) {
                var newValue = number.split('');
                newValue.pop();
                number = newValue.join("");
                //UI删除展示:倒叙遍历
                for (let i = list.length - 1; i < list.length; i--) {
                    if (list[i].text) {
                        list[i].text = ''
                        return
                    }
                }

            } else {
                return console.log("无数字")
            }

        } else {
            console.log("输入数字", value);

            number += value;

            //UI展示:遍历
            for (var i = 0; i < list.length; i++) {
                if (!list[i].text) {
                    list[i].text = value
                    break
                }
            }
        }

        console.log("number:", number);

        //验证逻辑
        if (number.length === 4) {
            console.log("开启验证")
            if (number === "1921") {
                console.log("回答正确");
                //展示星星
                start.visible = true;
                //展示正确回答
                success.visible = true;

                setTimeout(() => {
                    //展示出发
                    go.visible = true;
                    //展示出发动画
                    ticketAni.play(0, false);
                }, 1000)
            } else {
                console.log("正确答案1921年,请随我们一起重回百年征程");
                //展示错误提示
                error.visible = true;

                setTimeout(() => {
                    //展示出发
                    go.visible = true;
                    //展示出发动画
                    ticketAni.play(0, false);
                }, 1000)
            }

        }

    };

    //声明出发按钮
    var go = this.go;
    //监听触发事件
    go.on(Laya.Event.MOUSE_DOWN, this, onGo);
    //回调函数：进入下一场景
    function onGo(e) {
        console.log("出发");
        //触发圆圈sk动画
        e.target.addChild(skeleton)
        skeleton.x = 87
        skeleton.y = 45
        skeleton.play(0, false)
            //进入下一场景
        setTimeout(() => {
            //加载sc6界面
            //实例sc6界面
            this.SC6UI = new SC6UI();
            //将sc6插入到舞台
            Laya.stage.addChild(this.SC6UI);

            //移除自身
            skeleton.removeSelf();

            //移除舞台
            console.log("移除舞台");
            this.removeSelf();
        }, 500)
    }

}
Laya.class(SC5UI, "SC5UI", SC5PageUI)
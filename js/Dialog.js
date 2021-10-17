//Dialog界面
function DialogUI(onplay) {
    DialogUI.super(this);
    console.log("运行Dialog界面")

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

    //圆圈sk
    var skeleton = this.skeleton
    skeleton = new Laya.Skeleton();
    skeleton.load("res/sk/quan.sk", Laya.Handler.create(this, onComplete), 1)

    function onComplete() {
        skeleton.zOrder = 1;
        skeleton.paused()
    }


    var that = this;

    //获取舞台宽高
    let w = Laya.stage.width;
    let h = Laya.stage.height;
    console.log(w, h)

    //蒙版
    var Mask = this.Mask;
    //设置蒙版的宽高
    Mask.width = w
    Mask.height = h
    Mask.visible = true;

    //进场动画
    this.dialogIn.play(0, false)

    var ticket = this.ticket;

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
    //输入列表
    var list = this.labels._childs;
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
    };

    //声明数值
    var number = '';
    //声明星星
    var start = this.start;
    //声明正确回答
    var success = this.success;
    //声明错误提示
    var error = this.error;
    //输入展示函数
    function onLabs(value) {
        //输入逻辑
        if (value === "delete") {
            console.log("点击删除");

            //逻辑
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

                //出场动画
                that.dialogOut.play(0, false);
                //监听出场动画完成事件
                that.dialogOut.on(Laya.Event.COMPLETE, this, onDialogOut)

                function onDialogOut() {
                    //回调函数：继续播放动画
                    onplay();

                    // 移除自身
                    that.removeSelf();
                    skeleton.removeSelf();
                }

            } else {
                console.log("正确答案1921年,请随我们一起重回百年征程");
                //展示错误提示
                error.visible = true;
                //出场动画
                that.dialogOut.play(0, false);
                //监听出场动画完成事件
                that.dialogOut.on(Laya.Event.COMPLETE, this, onDialogOut)

                function onDialogOut() {
                    //回调函数：继续播放动画
                    onplay();

                    // 移除自身
                    that.removeSelf();
                    skeleton.removeSelf();
                }
            }

        }
    }
}
Laya.class(DialogUI, "DialogUI", DialogPageUI)
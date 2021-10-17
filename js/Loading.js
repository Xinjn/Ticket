    //加载界面
    function Loading(value) {
        Loading.super(this);
        console.log("进入Loading页面")

        //固定this指向
        var that = this;

        //初始化屏幕自适应
        this.x = (Laya.stage.width - this.width) / 2;
        Laya.stage.on(Laya.Event.RESIZE, this, resizeFn);
        //随着屏幕尺寸改变适配UI位置
        function resizeFn() {
            let w = Laya.stage.width;
            let h = Laya.stage.height;
            if (Laya.stage.scaleMode == "fixedheight") {
                this.x = (Laya.stage.width - this.width) / 2
            }
        }

        //声明所有资源
        var resBag = [
            "res/atlas/sc1.atlas",
            "res/atlas/sc5.atlas",
            "res/atlas/sc6.atlas",
            "res/atlas/dialog.atlas",
            "res/atlas/part.atlas",
        ];

        //设置progress Handler的第4个参数默认为true，根据加载文件个数获取加载进度,设置false则展示加载进度
        Laya.loader.load(resBag, null, Laya.Handler.create(this, onLoad, null, false));

        function onLoad(value) {
            var number = Math.floor(value * 100)
            console.log("进度:" + number);
            this.card.y = 310
            this.card.y -= number

            //设置IDE进度文本
            this.progress.text = number + "%";

            //加载完成执行回调
            if (number === 100) {
                console.log("加载完成");
                this.skeleton.visible = true
                    //播放船票飞
                this.skeleton.play(0, false);
                //隐藏船票
                this.clear.play(0, false);
            }
        }

        //生成Skeleton实例
        this.skeleton = new Laya.Skeleton();
        //放入到舞台中
        Laya.stage.addChild(this.skeleton);
        //sk图集加载完成
        this.skeleton.load("res/sk/loading.sk", Laya.Handler.create(this, onComplete), 0); //（0不允许换肤，1允许换肤）

        //sk图集加载完成
        function onComplete() {
            //设置帧速率
            this.skeleton.playbackRate(0.5)

            //求系数(X/Y)
            var xishuX = 660 / 1280;
            var xishuY = 360 / 720;
            //获取舞台大小
            var w = Laya.stage.width;
            var h = Laya.stage.height;
            //动态设置sk位置
            this.skeleton.pos(w * xishuX, h * xishuY);

            //设置帧速率
            this.skeleton.paused();
            this.skeleton.visible = false
        }

        //防抖
        function debounce(func, delay) {
            let timeout = null
            return function() {
                clearTimeout(timeout) // 如果持续触发，那么就清除定时器，定时器的回调就不会执行。
                timeout = setTimeout(() => {
                    func.apply(this, arguments)
                    timeout = null
                }, delay)
            }
        }

        //声明防抖
        const debounced = debounce(onSkeleton, 10);

        this.skeleton.on(Laya.Event.STOPPED, this, debounced);

        function onSkeleton() {
            console.log("播放完成");
            //移除自身界面(1s后)
            this.removeSelf();
            Laya.stage.addChild(new SC1UI())
        }


    };
    //继承LoadingPageUI
    Laya.class(Loading, "Loading", LoadingPageUI);
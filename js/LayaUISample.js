//TS或JS版本初始化微信小游戏的适配
Laya.MiniAdpter.init();
//初始化引擎
Laya.init(1280, 720);

Laya.stage.scaleMode = "fixedheight";
Laya.stage.screenMode = "horizontal";

//垂直
Laya.stage.alignV = "center";
//水平
Laya.stage.alignH = "center";

// 网络动态资源加载
Laya.URL.basePath = "https://xinjn.github.io/TicketRemote/"; //请把XXXX换成自己的真实网址；

//声明音频
var SoundManager = Laya.SoundManager;
console.log("播放音乐");
SoundManager.playMusic("res/sounds/bgm1.mp3", 1, new Laya.Handler(this, onComplete));

function onComplete() {
    console.log("播放完成");
}

//设置舞台stage颜色
// Laya.stage.bgColor = "#ffcccc";
Config.isAlpha = true; //设置画布是否透明，只对2D(WebGL)、3D有效。
Laya.stage.bgColor = "none"; //背景透明

//背景动态
//背景资源
var bgBag = "res/atlas/xh.atlas";
//加载完背景资源执行onProBg方法
Laya.loader.load(bgBag, Laya.Handler.create(this, onBgBag));

//背景动画
//实例化Animation
var xhAni = new Laya.Animation();
//回调函数：背景动画
function onBgBag() {
    //加载Animation
    xhAni.loadAnimation("res/ani/xh_bg.ani"); //注意引入路径和后缀名称
    //设置层级
    xhAni.zOrder = -1;
    //初始系数
    xhAni.scaleX = 1;
    //播放动画
    xhAni.play();
    //背景动画插入到舞台
    Laya.stage.addChild(xhAni);
    //获取舞台宽高
    var w = Laya.stage.width;
    //求相对系数
    var xishu = 1280 / w;
    //计算最终系数填充整个屏幕
    var value = 1 / xishu;
    //赋予新的系数给Ani动画
    xhAni.scaleX = xhAni.scaleY = value;
}

Laya.stage.on(Laya.Event.RESIZE, this, resizeFn);
//随着屏幕尺寸改变适配UI位置
function resizeFn() {
    let w = Laya.stage.width;
    if (Laya.stage.scaleMode == "fixedheight") {
        //求相对系数
        var xishu = 1280 / w;
        //计算最终系数填充整个屏幕
        var value = 1 / xishu;
        //赋予新的系数给Ani动画
        xhAni.scaleX = xhAni.scaleY = value;
    }
}

//加载页资源
var loadBag = "res/atlas/loading.atlas";
//加载完背景资源执行onProBg方法
Laya.loader.load(loadBag, Laya.Handler.create(this, onLoadBag));
//回调函数：加载页
function onLoadBag() {
    //加载界面
    //实例LoadingUI界面
    //将加载页面插入到舞台
    Laya.stage.addChild(new Loading());
}
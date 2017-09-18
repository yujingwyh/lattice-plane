# lattice-plane
格子飞机游戏 <br>

浏览地址（建议使用移动端）：[http://lp.honglisite.com/](http://lp.honglisite.com/)

##开发说明
1. 文件结构 
    src                     源码目录
    src/game                核心目录
    src/game/bmob           子弹相关
    src/game/controller     控制
    src/game/guns           坦克和各种类型的飞机的实例
    src/game/config.js      配置
    src/game/leave.js       关卡
    src/game/run.js         运行
    src/game/status.js      游戏状态
    src/lib                 一些库
    src/lib/canvas.js       画布相关
    src/lib/coordinate.js   坐标相关
    src/lib/event.js        事件
    src/lib/exterior.js     外观类
    src/lib/motion.js       运动物体类
    src/lib/substance.js    物体类
    src/lib/util.js         零散函数单元
    src/main.js             入口文件
    web/    
    web/dist                编译到的目录
    web/libs                第三方库
2. 关于运行
motion类会有初始位移，水平速度，竖直速度，竖直加速度和时间属性，每个飞机都是motion类的实例。整个程序只有一个setInterval来间隔的跑motion实例对象的run方法。run方法中每次time都会+1，然后计算出坐标并设置。

3. 关于碰撞
大类型有背景，坦克，坦克子弹，飞机，飞机子弹5种类型，初始画布的时候，会创建一个保存每种类型二维数组，坦克飞机等运动后会把它所占的区域映射到这个二维数组中，运动前会把它要占的区域中存在的每种物体类型交给该物体处理，返回是否会碰撞。

4. 关于关卡
每一关卡都会有对应的关卡处理文件，比如1级会有controller/leave1.js文件，在leave中分别有onWheel,onCreatePlane,onRun三个函数。

- onCreatePlane
在创建飞机的时候会调用，可以设置该飞机的速度，加速度等。
- onRun
在所有飞机run执行后触发
- onWheel
每个关卡中会有轮这个概念，当所有类型的飞机数被击杀为0时轮数会+1，然后触发该回调，返回每种类型飞机总数，最多同时出现数，和对应的子弹类型，如果返回false则会增加新关卡。

## bug

## 待优化
1. 飞机速度

## 一些需求
1. 增加更多的飞机
2. 增加道具

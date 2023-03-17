<template>
  <div class="pop-up-main">
    <div class="paln-box">
      <div
        class="movableItem"
        :style="{width:width,height:height}"
        @mousewheel="rollImg($event)"
        @mousedown="drag($event,1)"
        ref="bigImage"
      >
        <!-- 图片不可选中 或不可拖拽到新标签打开-->
        <img
          :src="imgUrl"
          oncontextmenu="return false;"
          onselectstart="return false;"
          draggable="false"
          alt
        />
        <template v-if="isEdit &&iconWidth">
          <!-- <i
            ref="signImage"
            @mousedown="dragSign($event,key)"
            v-for="(item,key) in equipment"
            :key="key"
            :style="{top:equipment[key].top+'%',left:equipment[key].left+'%',}"
            @dblclick="getkey(key)"
            class="el-icon-video-camera-solid equipment"
          >{{item.tog}}</i>-->
          <img
            ref="signImage"
            :src="iconImgUrl"
            @mousedown="dragSign($event,key)"
            v-for="(item,key) in equipment"
            :key="key"
            :style="{top:equipment[key].top+'%',left:equipment[key].left+'%',width:iconWidth,height:iconHeight}"
            class="equipment"
          />
        </template>
        <!-- <i
          v-else
          ref="signImage"
          v-for="(item,key) in equipment"
          :key="key"
          :style="{top:equipment[key].top+'%',left:equipment[key].left+'%',}"
          :class="[equipment[key].iconImgUrl==''? 'el-icon-video-camera-solid':'', 'equipment']"
        >{{item.tog}}</i>-->
        <!-- v-else-if="!isEdit &&iconWidth" -->

        <!-- <img
          v-else-if="!isEdit&&iconWidth &&arrIcon.length==equipment.length"
          ref="signImage"
          :src="$baseUrl + equipment[key].iconImgUrl"
          v-for="(item,key) in equipment"
          :key="key"
          :style="{top:equipment[key].top+'%',left:equipment[key].left+'%',width:arrIcon[key].iconWidth,height:arrIcon[key].iconHeight}"
          class="equipment"
        />-->

        <el-popover
          width="200"
          placement="bottom-start"
          trigger="hover"
          :close-delay="100"
          content="暂无描述"
          v-else-if="!isEdit&&iconWidth &&arrIcon.length==equipment.length "
          v-for="(item,key) in equipment"
          :key="key"
          popper-class="preview-popover"
        >
          <!-- &&arrIcon.length==equipment.length -->
          <template>
            <div v-if="equipment[key].describe" class="describe">
              <p class="describe-top">{{equipment[key].describe.deviceName}}</p>
              <p class="describe-center">{{equipment[key].describe.remark}}</p>
              <p class="describe-bottom">{{equipment[key].describe.location}}</p>
            </div>
          </template>
          <img
            oncontextmenu="return false;"
            onselectstart="return false;"
            draggable="false"
            slot="reference"
            ref="signImage"
            :src="$baseUrl + equipment[key].iconImgUrl"
            :style="{top:equipment[key].top+'%',left:equipment[key].left+'%',width:arrIcon[key].iconWidth,height:arrIcon[key].iconHeight}"
            class="equipment"
          />
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // imgWidth: {
    //   default: "1000px"
    // },
    // imgHeight: {
    //   default: "600px"
    // },
    equipment: {
      type: Array,
      default: () => {
        return [
          {
            // 位置
            // tog: "1",
            iconImgUrl: "",
            top: 0,
            left: 0,
            // // 设备类型
            // type: "",
            // // 设备描述
            // describe: ""
          },
        ];
      },
    },
    isEdit: {
      default: false,
    },
    imgUrl: {},
    
  },

  data() {
    return {
      // 定时器
      timer: "",
      // 图片加载失败
      imgOnerror: false,
      imgIndex: 0,
      isChange: true,
      // 图片显示默认大小
      width: "",
      height: "",
      // 可缩小倍数,为空则可无限缩小
      minification: 3,
      // 可放大倍数 为空则可无限放大
      magnification: "",
      bigMaxWidth: 1600,
      bigMaxHeight: 800,

      // 小图标信息
      iconImgUrl: "",
      iconWidth: "",
      // 存储每个小图标处理好的宽高
      iconHeight: "",
      arrIcon: [],
      iconMaxWidth: 32,
      iconMaxHeight: 32,
      // 是否可编辑
      // isEdit: false,
      // 设备数量
      tog: 1,
      // 设备数据
      // equipment: [
      //   {
      //     // 位置
      //     tog: "1",
      //     top: 0,
      //     left: 0,
      //     // 设备类型
      //     type: "",
      //     // 设备描述
      //     describe: ""
      //   }
      // ]
    };
  },
  // watch:{
  //   locationVisible(){
  //     this.disableRightClick();
  //   }
  // },
  methods: {
    // 获取图片大小
    // ,objWidth,objHeight
    getImgInfo(
      imgUrl,
      MaxWidth,
      MaxHeight,
      StrWidth,
      StrHeight,
      Array = false,
      arr,
      num = 0
    ) {
      // console.log("objWidthName", this[StrWidth], this[StrHeight]);
      var img = new Image();

      img.src = imgUrl;
      // const vm = this;
      let _this = this;
      img.onerror = () => {
        // console.log("加载失败！！", _this.arrIcon.length);
        // console.log(imgUrl, MaxWidth, MaxHeight, StrWidth, StrHeight);
        _this.imgOnerror = true;
        _this.imgIndex =
          _this.arrIcon.length - 1 < 0 ? 0 : _this.arrIcon.length - 1;
        this.timer = setTimeout(() => {
          if (num <= 5) {
            _this.getImgInfo(
              imgUrl,
              MaxWidth,
              MaxHeight,
              StrWidth,
              StrHeight,
              Array,
              arr,
              num + 1
            );
          }
          clearInterval(this.timer);
        }, 2000);
      };
      img.onload = function (e) {
        //  显示时 初始 最大宽度
        let maxWidth = MaxWidth;
        //  显示时 初始 最大高度
        let maxHeight = MaxHeight;
        if (
          e.path[0].naturalWidth <= maxWidth &&
          e.path[0].naturalHeight <= maxHeight
        ) {
          _this[StrWidth] = e.path[0].naturalWidth + "px";
          _this[StrHeight] = e.path[0].naturalHeight + "px";
        } else {
          _this[StrWidth] = e.path[0].naturalWidth + "px";
          _this[StrHeight] = e.path[0].naturalHeight + "px";
          if (
            e.path[0].naturalWidth > maxWidth &&
            e.path[0].naturalHeight <= maxHeight
          ) {
            let ratio = e.path[0].naturalWidth / e.path[0].naturalHeight;
            _this[StrWidth] = "1600px";
            _this[StrHeight] = maxWidth / ratio + "px";
          } else if (
            e.path[0].naturalWidth <= maxWidth &&
            e.path[0].naturalHeight > maxHeight
          ) {
            let ratio = e.path[0].naturalWidth / e.path[0].naturalHeight;
            _this[StrWidth] = maxHeight * ratio + "px";
            _this[StrHeight] = "800px";
          } else if (
            e.path[0].naturalWidth > maxWidth &&
            e.path[0].naturalHeight > maxHeight
          ) {
            let ratio = e.path[0].naturalWidth / e.path[0].naturalHeight;
            let w = maxWidth;
            let h = w / ratio;
            if (h > maxHeight) {
              let ratio2 = w / h;
              h = maxHeight;
              w = h * ratio2;
            }
            _this[StrWidth] = w + "px";
            _this[StrHeight] = h + "px";
          }
        }
        if (Array) {
          _this[arr].push({
            iconWidth: _this[StrWidth],
            iconHeight: _this[StrHeight],
          });
        //   console.log(
        //     "tow#################################arrIcon",
        //     _this[arr].length
        //   );
        }
        // _this[StrWidth] = `${e.path[0].naturalWidth}px`;
        // _this[StrHeight] = `${e.path[0].naturalHeight}px`;
        // vm.$set(vm.imgInfo, "width", img.width);
        // vm.$set(vm.imgInfo, "height", img.height);
        // console.log("打印图片信息", imgUrl, _this[StrWidth], _this[StrHeight]); // 打印图片信息

        // console.log("打印图片信息", e.path[0].naturalHeight); // 打印图片信息
        // console.log("打印图片信息", e); // 打印图片信息
        // console.log("打印图片信息this.width", _this[StrWidth]); // 打印图片信息
        // console.log("打印图片信息this.height", _this[StrHeight]); // 打印图片信息
      };
    },
    // 缩放
    rollImg() {
      // var oImg = document.getElementsByClassName("movableItem")[0];
      var oImg = this.$refs.bigImage;
    //   console.log(
    //     "length",
    //     document.getElementsByClassName("movableItem").length
    //   );
    //   console.log("oImg", oImg);
      var _this = this;
      function fnWheel(obj, fncc) {
        obj.onmousewheel = fn;
        if (obj.addEventListener) {
          obj.addEventListener("DOMMouseScroll", fn, false);
        }
        function fn(ev) {
          var oEvent = ev || window.event;
          var down = true;
          if (oEvent.detail) {
            down = oEvent.detail > 0;
          } else {
            down = oEvent.wheelDelta < 0;
          }
          if (fncc) {
            fncc.call(this, down, oEvent);
          }
          if (oEvent.preventDefault) {
            oEvent.preventDefault();
          }
          return false;
        }
      }
      fnWheel(oImg, function (down, oEvent) {
        var oldWidth = this.offsetWidth;
        var oldHeight = this.offsetHeight;
        var oldLeft = this.offsetLeft;
        var oldTop = this.offsetTop;
        var parent = oEvent.path[2];
        // 获取父元素距离页面可视区域的位置
        var parentLeft = parent.getBoundingClientRect().left;
        var parentTop = parent.getBoundingClientRect().top;
        // 比例 = （点击位置距离可视窗口位置 - 父元素距离可视窗口位置 - 相对定位的left）/ 本身宽度
        var scaleX = (oEvent.clientX - parentLeft - oldLeft) / oldWidth; //比例
        var scaleY = (oEvent.clientY - parentTop - oldTop) / oldHeight;

        let nowWidth = this.style.width.split("p")[0];
        let initWidth = _this.width.split("p")[0];
        let initHeight = _this.height.split("p")[0];

        let miniFlag = true;
        let magniFlag = true;
        if (_this.minification) {
          // 限制缩小范围
          if (nowWidth <= parseInt(initWidth / _this.minification)) {
            miniFlag = false;
            // console.log("限制缩小范围");
            // console.log(
            //   "限制缩小范围",
            //   nowWidth,
            //   parseInt(initWidth / _this.minification)
            // );
            this.style.width = parseInt(initWidth / _this.minification) + "px";
            this.style.height =
              parseInt(initHeight / _this.minification) + "px";
          }
          if (_this.magnification) {
            // 限制放大范围
            if (nowWidth >= parseInt(initWidth * _this.magnification)) {
              magniFlag = false;
            //   console.log("限制放大范围");
              this.style.width =
                parseInt(initWidth * _this.magnification) + "px";
              this.style.height =
                parseInt(initHeight * _this.magnification) + "px";
            }
          }
        }

        if (down && miniFlag) {
        //   console.log("缩小");
          this.style.width = parseInt(this.offsetWidth * 0.9) + "px";
          this.style.height = parseInt(this.offsetHeight * 0.9) + "px";
        } else if (!down && magniFlag) {
        //   console.log("放大");
          this.style.width = parseInt(this.offsetWidth * 1.1) + "px";
          this.style.height = parseInt(this.offsetHeight * 1.1) + "px";
        }
        var newWidth = this.offsetWidth;
        var newHeight = this.offsetHeight;

        // 新的相对位置left = 原先的相对位置left - 比例 *（本身新的宽度-旧的宽度）
        this.style.left =
          Math.round(this.offsetLeft - scaleX * (newWidth - oldWidth)) + "px";
        this.style.top =
          Math.round(this.offsetTop - scaleY * (newHeight - oldHeight)) + "px";
      });
    },
    // },
     //拖拽
    drag(ev) {
      // var ie = document.all;
    //   console.log(ev / 0);

    //   console.log("点击图片");
      var nn6 = document.getElementById && !document.all;
      var isdrag = false;
      var y, x;
      var nTY, nTX;
      var oDragObj;
      function moveMouse(e) {
        // console.log("oDragObj.style.top1", oDragObj.style.top);
        if (isdrag) {
          oDragObj.style.top =
            (nn6 ? nTY + e.clientY - y : nTY + event.clientY - y) + "px";
          oDragObj.style.left =
            (nn6 ? nTX + e.clientX - x : nTX + event.clientX - x) + "px";
          // console.log("oDragObj.style.top2", oDragObj.style.top);
          // console.log(`nTY+e.clientY-y=${nTY}+${e.clientY}-${y}`);
          // console.log(`nTY+e.clientY-y=${nTY + e.clientY - y}`);

          return false;
        }
      }
      function initDrag(e) {
        // console.log("点击图片initDrag");
        var oDragHandle = nn6 ? e.target : event.srcElement;
        var topElement = "HTML";
        while (
          oDragHandle.tagName != topElement &&
          oDragHandle.className != "movableItem"
        ) {
          oDragHandle = nn6
            ? oDragHandle.parentNode
            : oDragHandle.parentElement;
        }
        if (oDragHandle.className == "movableItem") {
          isdrag = true;
          oDragObj = oDragHandle;
          // 父元素宽高
          let width = e.path[2].offsetWidth;
          let height = e.path[2].offsetHeight;
          // console.log(width, height);
          // console.log(oDragObj.style);
          // 这里判断第一次获取不到style 样式 默认为 居中50%
          if (oDragObj.style.top == "") {
            // console.log(
            //   '进入了oDragObj.style.top.indexOf("%")',
            //   oDragObj.style.top
            // );
            nTY = parseInt((50 * height) / 100 + 0);
            nTX = parseInt((50 * width) / 100 + 0);
          } else {
            nTY = parseInt(oDragObj.style.top + 0);
            nTX = parseInt(oDragObj.style.left + 0);
          }
          y = nn6 ? e.clientY : event.clientY;
          x = nn6 ? e.clientX : event.clientX;
          oDragObj.style.cursor = "move";
          document.onmousemove = moveMouse;
          return false;
        }
      }
      document.onmousemove = initDrag;
      // document.onmouseup = new Function("isdrag=false");
      document.onmouseup = function (e) {
        isdrag = false;
        document.onmousemove = null;
        document.onmouseup = null;
        var oDragHandle = nn6 ? e.target : event.srcElement;
        var topElement = "HTML";
        while (
          oDragHandle.tagName != topElement &&
          oDragHandle.className != "movableItem"
        ) {
          oDragHandle = nn6
            ? oDragHandle.parentNode
            : oDragHandle.parentElement;
        }
        if (oDragHandle.className == "movableItem") {
          oDragObj = oDragHandle;
          oDragObj.style.cursor = "Default";
        }
      };
      ev = event || window.event;

      // 取消事件冒泡行为
      // window.event ? (window.event.cancelBubble = true) : ev.stopPropagation();
    },
    // 拖拽标记
    // eslint-disable-next-line no-unused-vars
    dragSign(ev, key) {
      var nn6 = document.getElementById && !document.all;
      var isdrag = false;
      var y, x;
      var nTY, nTX;
      var oDragObj;
      let _this = this;
      function moveMouse(e) {
      
        if (isdrag) {
          this.equipmentKey = key;
          // console.log("thisequipmentKey", this.equipmentKey);

          let widthItem = e.path[1].style.width.split("p");
          let heightItem = e.path[1].style.height.split("p");
          let width = widthItem[0];
          // eslint-disable-next-line no-unused-vars
          let height = heightItem[0];
          // console.log("oDragObj.style.top2", oDragObj.style.top);
          let top =
            ((nn6
              ? (nTY / 100) * height + e.clientY - y
              : (nTY / 100) * height + event.clientY - y) /
              height) *
            100;
          let left =
            ((nn6
              ? (nTX / 100) * width + e.clientX - x
              : (nTX / 100) * width + event.clientX - x) /
              width) *
            100;
            
          if (top >= 0 && top <= 100) {
            _this.equipment[key].top = top;
          }
          if (left >= 0 && left <= 100) {
            _this.equipment[key].left = left;
          }
          
          return false;
        }
      }
      // eslint-disable-next-line no-unused-vars
      function initDrag(e) {
        // console.log("_this", _this);
        var oDragHandle = nn6 ? e.target : event.srcElement;
        var topElement = "HTML";
        while (
          oDragHandle.tagName != topElement &&
          oDragHandle.className.indexOf("equipment") == -1
        ) {
          oDragHandle = nn6
            ? oDragHandle.parentNode
            : oDragHandle.parentElement;
        }
        // console.log("initDrag");
        // console.log(oDragHandle);
        // console.log(oDragHandle.className);
        if (oDragHandle.className.indexOf("equipment") != -1) {
          isdrag = true;
          oDragObj = oDragHandle;
          // 父元素宽高
          let width = e.path[1].offsetWidth;
          let height = e.path[1].offsetHeight;
          // console.log(width, height);
        //   console.log("oDragObj.style", oDragObj.style);
          // 这里判断第一次获取不到style 样式 默认为 居中50%
          if (oDragObj.style.top == "") {
            nTY = parseInt((50 * height) / 100 + 0);
            nTX = parseInt((50 * width) / 100 + 0);
          } else if (oDragObj.style.top.indexOf("%") != -1) {
            nTY = oDragObj.style.top.split("%")[0];
            nTX = oDragObj.style.left.split("%")[0];
          } else {
            nTY = parseInt(oDragObj.style.top + 0);
            nTX = parseInt(oDragObj.style.left + 0);
          }
          y = nn6 ? e.clientY : event.clientY;
          x = nn6 ? e.clientX : event.clientX;
          
          oDragObj.style.cursor = "move";
          document.onmousemove = moveMouse;
          return false;
        }
      }

      // document.onmousedown = initDrag;
      document.onmousemove = initDrag;

      document.onmouseup = function (e) {
        isdrag = false;
        document.onmousemove = null;
        document.onmouseup = null;
        var oDragHandle = nn6 ? e.target : event.srcElement;
        var topElement = "HTML";
        while (
          oDragHandle.tagName != topElement &&
          oDragHandle.className != "equipment"
        ) {
          oDragHandle = nn6
            ? oDragHandle.parentNode
            : oDragHandle.parentElement;
        }
        if (oDragHandle.className == "equipment") {
          oDragObj = oDragHandle;
          oDragObj.style.cursor = "Default";
        }
      };

      // _this.equipmentKey = key;
      // _this.equipment[_this.equipmentKey].left = l;
      // _this.equipment[_this.equipmentKey].top = t;
      ev = event || window.event;

      // 取消事件冒泡行为
      window.event ? (window.event.cancelBubble = true) : ev.stopPropagation();
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    equipment() {
      if (this.equipment.length != 0) {
        this.arrIcon = [];
        let finish = true;
        this.equipment.filter((item) => {
          if (!item.iconImgUrl) {
            finish = false;
          }
          return true;
        });
        // console.log("finish", finish);
        if (finish) {
          this.equipment.filter((item, index) => {
            if (index >= this.imgIndex) {
            //   console.log("iconImgUrl", this.equipment[index].iconImgUrl);
              this.getImgInfo(
                this.$baseUrl + item.iconImgUrl,
                this.iconMaxWidth,
                this.iconMaxHeight,
                "iconWidth",
                "iconHeight",
                true,
                "arrIcon"
              );
            }
            // console.log("22filter", index);
            return true;
          });
        }
      }
    },
  },
  created() {
    this.getImgInfo(
      this.imgUrl,
      this.bigMaxWidth,
      this.bigMaxHeight,
      "width",
      "height"
    );
    if (this.equipment.length != 0) {
      this.arrIcon = [];
      let finish = true;
      this.equipment.filter((item) => {
        if (!item.iconImgUrl) {
          finish = false;
        }
        return true;
      });
    //   console.log("finish", finish);
      if (finish) {
        this.equipment.filter((item, index) => {
          if (index >= this.imgIndex) {
            // console.log("iconImgUrl", this.equipment[index].iconImgUrl);
            this.getImgInfo(
              this.$baseUrl + item.iconImgUrl,
              this.iconMaxWidth,
              this.iconMaxHeight,
              "iconWidth",
              "iconHeight",
              true,
              "arrIcon"
            );
          }
        //   console.log("22filter", index);
          return true;
        });
      }
    }

    this.iconImgUrl = JSON.parse(
      JSON.stringify(this.$baseUrl + this.equipment[0].iconImgUrl)
    );
    // console.log("imgUrl", this.imgUrl);
    // console.log("equipment", this.equipment);
    // //禁止鼠标右键
    // document.oncontextmenu = function() {
    //   return false;
    // };
  },
};
</script>
<style lang="less">
.preview-popover {
  background-color: #d3edf7dd;
  padding: 12px;
  .popper__arrow::after {
    border-bottom-color: #d3edf7dd !important;
  }
  .describe {
    p {
      padding-bottom: 5px;
      &:last-child {
        padding-bottom: 0px;
      }
    }
    .describe-top {
      // color: sandybrown;
      // color: red;
      color: rgb(21, 110, 110);
    }
    .describe-center {
      color: rgb(79, 21, 206);
    }
    .describe-bottom {
      color: rgb(30, 31, 29);
    }
  }
}
</style>
<style lang="less" scoped>

.pop-up-main {
  width: 100%;
  height: 100%;
  background: #ccc;
  .paln-box {
    width: 100%;
    height: 100%;
    position: relative;

    .movableItem {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        z-index: 1;
        width: 100%;
        height: 100%;
      }

      .equipment {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        z-index: 2;
        font-size: 40px;
        // color: red;
        // background: blue;
        zoom: 1;
      }
    }
    .shuaxin {
      position: absolute;
      z-index: 2;
      font-size: 40px;
      top: 20px;
      left: 20px;
      cursor: pointer;
      &:hover {
        color: yellowgreen;
      }
    }
    .equipment {
      color: white;
    }
    &/deep/.el-button {
      z-index: 2;
      position: absolute;
      bottom: 60px;
      right: 20px;
      width: 60px;
      height: 35px;
      span {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      i {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>

import Vue from 'vue';
// 拖曳弹窗 使用 v-dialogDrag
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        dialogHeaderEl.onmousedown = e => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            // 获取到的值带px 正则匹配替换
            let styL, styT;
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            }
            document.onmousemove = function(e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;
                // 移动当前元素
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;
                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };
            document.onmouseup = function(e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
});

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
        const dragDom = binding.value.$el.querySelector('.el-dialog');
        el.onmousedown = e => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - el.offsetLeft;
            document.onmousemove = function(e) {
                e.preventDefault(); // 移动时禁用默认事件
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                dragDom.style.width = `${l}px`;
            };
            document.onmouseup = function(e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
});

Vue.directive('focus', function(el, option) {
    var defClass = 'el-input',
        defTag = 'input';
    var value = option.value || true;
    if (typeof value === 'boolean') value = { cls: defClass, tag: defTag, foc: value };
    else value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false };
    if (el.classList.contains(value.cls) && value.foc) el.getElementsByTagName(value.tag)[0].focus();
});

//在main.js中
// 提交以后禁用按钮一段时间，防止重复提交
Vue.directive('noMoreClick', {
    inserted(el, binding) {
        el.addEventListener('click', e => {
            el.classList.add('is-disabled');
            el.disabled = true;
            setTimeout(() => {
                el.disabled = false;
                el.classList.remove('is-disabled');
            }, 2000); //我这里设置的是2000毫秒也就是2秒
        });
    }
});





<template>
    <div class="name" :style="{ background: data.color }" style="border-bottom: 1px solid #fff">
        <div class="colorBar" />
        <!-- <div class="type">{{ data.type }}</div> -->
        <div class="carId">
            <span
                >{{ data.order_name }} - {{ data.bomType_name }} - <span style="color: #444">{{ data.name }}</span></span
            ><span style="float: right">{{ data.color ? '计划' : '实际' }}</span>
        </div>
        <!-- <div class="speed">{{ data.speed }}</div> -->
    </div>
</template>

<script>
export default {
    name: 'TestLeft',
    props: {
        data: Object
    }
};
</script>

<style scoped>
.name {
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    width: 92%;
    padding: 0 5px 0 0;
    border-radius: 8px 0 0 8px;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: none !important;
    background: linear-gradient(45deg, #d7e8ff 38%, transparent);
}
.colorBar {
    width: 10px;
    height: 100%;
    text-align: center;
    color: #fff;
}

.carId {
    flex: 1;
    text-align: center;
    color: #777;
}

.type {
    padding: 0 5px 0 0;
    font-size: 1.2rem;
}
</style>

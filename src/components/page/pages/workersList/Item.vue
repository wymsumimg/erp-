<template>
  <div class="item">
    <span >
        <!-- {{ source.id + 1 }} -->
    </span>
    <input class="id" v-model="source.text" />
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  height: 20px;
  /* border-bottom: 1px solid lightgrey; */
}
.id {
  border: none;
  outline: none;
}
</style>

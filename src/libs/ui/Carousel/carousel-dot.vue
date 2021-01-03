<template>
  <div
    v-if="hasDot"
    :style="{ backgroundColor: backgroudColor }"
    class="ui-carousel-dot-wrapper"
  >
    <span v-for="item in itemLength" :key="item">
      <a
        href="javascript:void(0)"
        :style="{
          backgroundColor: currentIndex === item - 1 ? activeDotColor : dotColor,
        }"
        @click="dotClick(item - 1)"
      ></a>
    </span>
  </div>
</template>
<script>
import { getCurrentInstance, toRefs } from "vue";
export default {
  name: "CarouselDot",
  props: {
    itemLength: {
      type: Number,
      default: 1,
    },
    backgroudColor: {
      type: String,
      default: "#000",
    },
    dotColor: {
      type: String,
      default: "#fff",
    },
    hasDot: {
      type: Boolean,
      default: true,
    },
    activeDotColor: {
      type: String,
      default: "#999",
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    // const currentInstance = getCurrentInstance();
    const dotClick = (index) => {
        console.log('dot', index);
      ctx.emit("dotClick", index);
    };
    const state = {
      dotClick,
    };
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.ui-carousel-dot-wrapper {
  position: absolute;
  left: 50%;
  transform: trasnlateY(-50%);
  bottom: 60px;
  display: inline-block;
  border-radius: 6px;
  line-height: 1.5;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    display: inline-block;
    margin: 0 8px;
    border: none;
    > a {
      display: inline-block;
      width: 8px;
      border-radius: 50%;
      height: 8px;
    }
  }
}
</style>

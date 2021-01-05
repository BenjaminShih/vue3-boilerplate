<template>
  <div v-if="hasArrow" class="ui-carousel-arrow-wrapper">
    <span @click="arrowClick('backward')">&lt;</span>
    <span @click="arrowClick('forward')">&gt;</span>
  </div>
</template>
<script lang="ts">
export default {
  name: "CarouselArrow",
  props: {
    hasArrow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const arrowClick = (d: string) => {
      console.log(d);
      ctx.emit("arrowClick", d);
    };
    return {
      arrowClick
    }
  },
};
</script>
<style lang="scss" scoped>
.ui-carousel-arrow-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 20px;
  > span {
    color: #000;
    font-size: 40px;
  }
}
</style>

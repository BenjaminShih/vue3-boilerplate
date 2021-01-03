<template>
  <div class="ui-carouse-wrapper">
    <slot></slot>
  </div>
</template>
<script>
import { onMounted, onBeforeUnmount, reactive, getCurrentInstance, toRefs } from "vue";

export default {
  name: "Carousel",
  props: {
    isAutoplay: {
      type: Boolean,
      default: true,
    },
    startIndex: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    direction: {
      type: String,
      default: "forward",
    },
    hasDot: {
      type: Boolean,
      default: true,
    },
    hasArrow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const currentInstance = getCurrentInstance();
    const childrenLenth = currentInstance.slots.default()[0].children.length;
    const state = reactive({
      currentIndex: props.startIndex,
    });
    let timer = null;
    const setIndex = () => {
      switch (props.direction) {
        case "forward":
          state.currentIndex += 1;
          if (state.currentIndex === childrenLenth) {
            state.currentIndex = 0;
          }
          break;
        case "backward":
          state.currentIndex -= 1;
          if (state.currentIndex === -1) {
            state.currentIndex = childrenLenth - 1;
          }
          break;
        default:
          break;
      }
    };
    const autoplay = () => {
      if (props.isAutoplay) {
        timer = setInterval(() => {
          setIndex();
        }, props.duration);
      }
    };
    onMounted(() => {
      autoplay();
    });
    onBeforeUnmount(() => {
      clearInterval(timer);
      timer = null;
    });

    return {
      ...toRefs(state)
    }
  },
};
</script>
<style lang="scss" scoped>
.ui-carouse-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

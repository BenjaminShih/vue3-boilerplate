<template>
  <div class="ui-carouse-wrapper">
    <slot></slot>
    <carousel-dot
      :has-dot="hasDot"
      :current-index="currentIndex"
      :item-length="itemLength"
      :background-color="dotBackgroundColor"
      :dot-color="dotColor"
      :active-dot-color="activeDotColor"
      @dotClick="dotClick"
    ></carousel-dot>
  </div>
</template>
<script>
import { onMounted, onBeforeUnmount, reactive, getCurrentInstance, toRefs } from "vue";
import CarouselDot from "./carousel-dot";

export default {
  name: "Carousel",
  components: {
    CarouselDot,
  },
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
    dotBackgroundColor: {
      type: String,
      default: "#000",
    },
    dotColor: {
      type: String,
      default: "#fff",
    },
    activeDotColor: {
      type: String,
      default: "#999",
    },
  },
  setup(props) {
    const currentInstance = getCurrentInstance();
    const itemLength = currentInstance.slots.default()[0].children.length;
    const state = reactive({
      currentIndex: props.startIndex,
      itemLength,
    });
    let timer = null;
    const setIndex = () => {
      switch (props.direction) {
        case "forward":
          state.currentIndex += 1;
          if (state.currentIndex === itemLength) {
            state.currentIndex = 0;
          }
          break;
        case "backward":
          state.currentIndex -= 1;
          if (state.currentIndex === -1) {
            state.currentIndex = itemLength - 1;
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
    const dotClick = (index) => {
      console.log(index)
      state.currentIndex = index;
    };
    onMounted(() => {
      autoplay();
    });
    onBeforeUnmount(() => {
      clearInterval(timer);
      timer = null;
    });

    return {
      dotClick,
      ...toRefs(state),
    };
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

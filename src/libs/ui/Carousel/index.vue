<template>
  <div class="ui-carouse-wrapper" @mouseover="mouseover" @mouseout="mouseout">
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
    <carousel-arrow :has-arrow="true" @arrowClick="arrowClick"></carousel-arrow>
  </div>
</template>
<script lang="ts">
import { onMounted, onBeforeUnmount, reactive, getCurrentInstance, toRefs } from "vue";
import CarouselDot from "./carousel-dot";
import CarouselArrow from './carousel-arrow'

export default {
  name: "Carousel",
  components: {
    CarouselDot,
    CarouselArrow
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
    const _clearInterval = () => {
      clearInterval(timer);
      timer = null;
    };
    const setIndex = (direction: string) => {
      switch (direction) {
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
          setIndex(props.direction);
        }, props.duration);
      }
    };
    const dotClick = (index) => {
      state.currentIndex = index;
    };
    const arrowClick = (d) => {
      setIndex(d)
    }
    const mouseover = () => {
      _clearInterval();
    };
    const mouseout = () => {
      autoplay();
    };
    onMounted(() => {
      autoplay();
    });
    onBeforeUnmount(() => {
      _clearInterval();
    });

    return {
      dotClick,
      mouseover,
      mouseout,
      arrowClick,
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

import Carousel from './Carousel'
import CarouselItem from './Carousel/carousel-item.vue'

let UI = {}

UI.install = function (Vue) {
    Vue.component(Carousel.name, Carousel)
    Vue.component(CarouselItem.name, CarouselItem)
}

export default UI
import Vue from 'vue';
import Vuetify from "vuetify";
import {shallowMount} from '@vue/test-utils';
import MovieCard from '@/components/HomePage/MovieCardComponent.vue';
import ShowtimeDetailsComponent from "@/components/HomePage/ShowtimeDetailsComponent";

/* Can't use localVue here, have to use global Vue instance for vuetify registration, 
more info can be found in vuetify issue #4068 and comments */
Vue.use(Vuetify);

describe('MovieCardComponent tests', () => {
  let wrapper;
  
  const findImage = () => wrapper.find('[data-test-id="movieImage"]');
  const findDetails = () => wrapper.findComponent(ShowtimeDetailsComponent);
  const findMovieCard = () => wrapper.findComponent({ref: 'movieCard'});
  
  const createComponent = ({showDetails = false, props = {}} = {}) => {
    wrapper = shallowMount(MovieCard, {
      data() {
        return {
          showDetails
      }},
      propsData: {
        cardData: {
          original_title: 'Test',
          id: -1,
          ...props
        }
      }
    })
  }
  
  afterEach(() => {
    wrapper.destroy();
  })
  
  it('Does not show movie details and blur is not applied on movie image on initial load', () => {
    createComponent();
    
    expect(findDetails().exists()).toBe(false);
    expect(findImage().classes('hover-blur')).toBe(false);
  })
  
  it('Movie details are shown and blur is applied on movie image on mouseover', async () => {
    createComponent();
    
    findMovieCard().vm.$emit('mouseover');
    await wrapper.vm.$nextTick();
    
    expect(findDetails().exists()).toBe(true);
    expect(findImage().classes('hover-blur')).toBe(true);
  })
})
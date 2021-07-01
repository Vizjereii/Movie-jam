import Vue from 'vue';
import Vuetify from "vuetify";
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import { shallowMount } from '@vue/test-utils';
import ShowtimeDetailsComponent from '@/components/HomePage/ShowtimeDetailsComponent.vue';

/* Can't use localVue here, have to use global Vue instance for vuetify registration, 
more info can be found in vuetify issue #4068 and comments */
Vue.use(Vuetify);
Vue.use(Vuex);

describe('HomePage - ShowtimeDetailsComponent tests', () => {
    let wrapper;
    let store;

    const $router = {
        push: jest.fn()
    }

    store = new Vuex.Store({
        getters: {
            getShowtimes: () => () => ["10:00", "18:00", "23:50"]
        }
    })

    const mockCurrentTime = () => jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2021-07-01T19:00:00.135Z').valueOf());
    const findTimeslot = (slotNum) => wrapper.find(`[data-test-id="time-slot-${slotNum}"]`);

    const createComponent = () => {
        wrapper = shallowMount(ShowtimeDetailsComponent, {
            stubs: ['router-link'],
            mocks: {
                $router
            },
            data() {
                return {
                    selectedDate: new Date().toISOString().substr(0, 10)
                }
            },
            propsData: {
                movieTitle: 'TestMovieTitle',
                movieId: 32
            },
            store
        })
    }
    
    beforeAll(() => {
        mockCurrentTime();
    });
    
    afterAll(() => {
        mockCurrentTime().mockRestore();
    })
    
    beforeEach(() => {
        createComponent();
    })

    afterEach(() => {
        wrapper.destroy();
    });

    it("When current time is 19:00, Time slots for 10:00 and 18:00 are not clickable", () => {
        expect(findTimeslot(0).classes('time-slot-active')).toBe(false);
        expect(findTimeslot(1).classes('time-slot-active')).toBe(false);
    })

    it("When current time is 19:00, Time slot for 23:50 is clickable", () => {
        expect(findTimeslot(2).classes('time-slot-active')).toBe(true);
    })
    
    it("When the user clicks not valid Time slot, nothing happens", async () => {
        findTimeslot(0).trigger('click');
        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.$router.push).toBeCalledTimes(0);
    })
    
    it("When the user clicks valid Time slot, user is sent to booking page", async () => {
        findTimeslot(2).trigger('click');
        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.$router.push).toBeCalledWith({
            name: "book",
            query: {id: 32, t: "23:50"}
        });
    })
});
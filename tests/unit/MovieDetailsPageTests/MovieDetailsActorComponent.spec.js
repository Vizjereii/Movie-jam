import Vue from 'vue';
import Vuetify from "vuetify";
import { shallowMount } from '@vue/test-utils';
import MovieDetailsActorComponent from '@/components/MovieDetailsPage/MovieDetailsActorComponent.vue';

/* Can't use localVue here, have to use global Vue instance for vuetify registration, 
more info can be found in vuetify issue #4068 and comments */
Vue.use(Vuetify);

describe('MovieDetailsPage - ActorComponent tests', () => {
    let wrapper;
    
    const anonymousImageString = "/img/avatar-anonymous.svg";

    const findActorImage = () => wrapper.find('[data-test-id="actorImage"]');
    const findActorLinkButton = () => wrapper.find('[data-test-id="actorProfileLinkButton"]');

    const createComponent = (props = {}) => {
        wrapper = shallowMount(MovieDetailsActorComponent, {
            propsData: {
                ...props
            }
        })
    }

    afterEach(() => {
        wrapper.destroy();
    });
    
    it("Shows Anonymous avatar picture if actorData does not contain profile path", () => {
        createComponent({actorData: {}});
        expect(findActorImage().attributes('src')).toBe(anonymousImageString);
    })

    it("Shows actor picture if actorData does contain actor profile path", () => {
        createComponent({actorData: {profile_path: "/test_path"}});
        expect(findActorImage().attributes('src')).toBe('https://image.tmdb.org/t/p/w185/test_path');
    })

    it("'View on TMDB' button points to the actor's page on TMDB", () => {
        createComponent({actorData: {id: "testId"}});
        expect(findActorLinkButton().attributes('href')).toBe('https://www.themoviedb.org/person/testId')
    })
});
import { shallowMount } from '@vue/test-utils';
import MenuItem from '@/components/menu-item.vue';
import router from '@/router';

describe('menu-item.vue', () => {
  it('renders correct way', () => {
    const to = 'test';
    const exact = false;
    const linkText = 'About';
    const propsData = { to, exact };

    const mountOptions = {
      propsData,
      router,
      slots: {
        default: linkText
      }
    };
    const wrapper = shallowMount(MenuItem, mountOptions);
    expect(wrapper.text()).toMatch(linkText);
    expect((wrapper.vm as any).className).toBeUndefined();
    router.push({ name: to });
    expect((wrapper.vm as any).className).toBe('uk-active');
    expect(wrapper).toMatchSnapshot();
  });
});

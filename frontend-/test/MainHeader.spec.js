import { mount } from '@vue/test-utils'
import MainHeader from '@/components/MainHeader.vue'

describe('MainHeader', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MainHeader)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

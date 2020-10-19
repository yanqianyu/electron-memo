import {mount} from '@vue/test-utils'
import Buttons from '../../../src/components/DatePicker/Buttons'

describe('Buttons', () => {
    let component;
    let component2;

    beforeEach(() => {
        component = mount(Buttons, {
            propsData: {
                hadInit: false
            }
        });
        component2 = mount(Buttons, {
            propsData: {
                hadInit: true
            }
        })
    });

    test('Should be an Vue instance', () => {
        expect(component.isVueInstance()).toBeTruthy()
    });

    test('Should have props', () => {
        expect(component.vm.$props).toEqual({
            hadInit: false
        })
    });

    test('Should be cancel', () => {
        expect(component.vm.cancelText).toEqual("取消")
    })

    test('Should be delete', () => {
        expect(component2.vm.cancelText).toEqual("删除")
    })
});

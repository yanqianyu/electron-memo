import {mount} from "@vue/test-utils";
import Picker from "../../../src/components/DatePicker/Picker";

describe('Picker', function () {
    let component;
    let now = new Date();
    beforeEach(() => {
        component = mount(Picker, {
            propsData: {
                dateOnly: false,
                initDate: now,
                type: 'reminder'
            }
        })
    })

    test('Should be an Vue instance', () => {
        expect(component.isVueInstance()).toBeTruthy();
    })

    test('Should have props', () => {
        expect(component.vm.$props).toEqual({
            dateOnly: false,
            initDate: now,
            type: 'reminder'
        })

        expect(component.vm.$data.date).toEqual(now);
        expect(component.vm.haveInit).toEqual(true);
    })

});

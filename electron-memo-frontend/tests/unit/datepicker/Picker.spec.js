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

    test('Should handle switch back', () => {
        component.vm.handleSwitchBack();
        expect(component.vm.year).toEqual(2020);
        expect(component.vm.month).toEqual(9);
        expect(component.vm.day).toEqual(22);
    })

    test('Should handle switch forward', () => {
        component.vm.setmonth(10); // 10月
        component.vm.handleSwitchForward();
        expect(component.vm.year).toEqual(2020);
        expect(component.vm.month).toEqual(11);
        expect(component.vm.day).toEqual(22);
    })

    test('Should set time', () => {
        component.vm.setyear(2019);
        component.vm.setmonth(9);
        component.vm.setday(10);
        component.vm.sethour(1);
        component.vm.setminute(14);
        expect(component.vm.year).toEqual(2019);
        expect(component.vm.month).toEqual(9);
        expect(component.vm.day).toEqual(10);
        expect(component.vm.hour).toEqual(1);
        expect(component.vm.minute).toEqual(14);
    })

    test('Should cancel', () => {
        component.vm.handleCancel();
        component.vm.$nextTick().then(() => {
            expect(component.emitted().deleteTimeChoose).toBeTruthy();
        })
    })
});

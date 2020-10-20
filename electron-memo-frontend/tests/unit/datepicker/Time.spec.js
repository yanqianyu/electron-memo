import {mount} from "@vue/test-utils";
import Time from "../../../src/components/DatePicker/Time";

describe("Time", () => {
    let component;
    beforeEach(() => {
        component = mount(Time, {
            propsData: {
                dateOnly: false,
                initYear: 2020,
                initMonth: 10,
                initDay: 19,
                initHour: 9,
                initMinute: 11
            }
        })
    });

    test('Should be an Vue instance', () => {
        expect(component.isVueInstance()).toBeTruthy();
    });

    test('Should have props', () => {
        expect(component.vm.$props).toEqual( {
            dateOnly: false,
            initYear: 2020,
            initMonth: 10,
            initDay: 19,
            initHour: 9,
            initMinute: 11
        })
    })

    test('Should max days equals 31', () => {
        expect(component.vm.maxDays).toEqual(31);
    })

    test('Should emit changeYear', () => {
        const yearInput = component.find('.year-chosen');
        yearInput.element.value = 2021;
        yearInput.trigger('input');

        expect(component.vm.$data.year).toEqual("2021");
        expect(component.vm.changeYear.toHaveBeenCalled);

        component.vm.changeYear();
        component.vm.$nextTick().then(() => {
            expect(component.emitted().changeYear).toBeTruthy();
        })
    })

    test('Should emit changeMonth', () => {
        const monthInput = component.find('.month-chosen');
        monthInput.element.value = 9;
        monthInput.trigger('input');
        expect(component.vm.$data.month).toEqual("9");
        expect(component.vm.maxDays).toEqual(30);
        expect(component.vm.changeMonth.toHaveBeenCalled);

        component.vm.changeMonth();
        component.vm.$nextTick().then(() => {
            expect(component.emitted().changeMonth).toBeTruthy();
        })
    })
})

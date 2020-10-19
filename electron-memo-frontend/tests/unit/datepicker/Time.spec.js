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
        // 模拟change事件
        const input = component.$el.querySelector('year-choosen');
        const changeEvent = new window.Event();
        component.vm.changeYear();

    })
})

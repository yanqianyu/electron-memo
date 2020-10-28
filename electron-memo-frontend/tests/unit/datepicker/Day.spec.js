import {mount} from "@vue/test-utils";
import Day from "../../../src/components/DatePicker/Day";

describe("Day", () => {
	let component;

	beforeEach(() => {
		component = mount(Day, {
			propsData: {
				year: 2020,
				month: 10,
				day: 19,
				selectedDay: 19
			}
		});
	});

	test("Should be an Vue instance", () => {
		expect(component.isVueInstance()).toBeTruthy();
	});

	test("Should have props", () => {
		expect(component.vm.$props).toEqual({
			year: 2020,
			month: 10,
			day: 19
		});
	});

	test("Should have init seletcedDay equals day", () => {
		expect(component.vm.$data.selectedDay).toEqual(19);
	});

	test("Should have method handleClick", () => {
		component.vm.handleClick(5);
		component.vm.$nextTick().then(() => {
			expect(component.emitted().day).toBeTruthy();
		});
	});

	test("Should have selectedDay change", () => {
		component.vm.handleClick(5);
		expect(component.vm.$data.selectedDay).toEqual(5);
	});
});

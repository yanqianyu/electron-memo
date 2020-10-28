import {mount} from "@vue/test-utils";
import Switcher from "../../../src/components/DatePicker/Switcher";

describe("Switcher", () => {
	let component;
	beforeEach(() => {
		component = mount(Switcher, {
			propsData: {
				year: 2020,
				month: 10
			}
		});
	});

	test("Should be an Vue instance", () => {
		expect(component.isVueInstance()).toBeTruthy();
	});

	test("Should have props", () => {
		expect(component.vm.$props).toEqual({
			year: 2020,
			month: 10
		});
	});

	test("Should emit back", () => {
		component.vm.goBack();
		component.vm.$nextTick().then(() => {
			expect(component.emitted().back).toBeTruthy();
		});
	});

	test("Should emit forward", () => {
		component.vm.goForward();
		component.vm.$nextTick().then(() => {
			expect(component.emitted().forward).toBeTruthy();
		});
	});
});

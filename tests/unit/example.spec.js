import { shallowMount } from "@vue/test-utils";
import About from "../../src/views/About";

const array = ["red", "blue", "green", "green"];
const text1 = "red blue green and green";

// Mount the component
test("About", () => {
  // render the component
  const wrapper = shallowMount(About);

  expect(wrapper.find('.rewriteText').(array, text1)).toEqual("foogreenbar");
});

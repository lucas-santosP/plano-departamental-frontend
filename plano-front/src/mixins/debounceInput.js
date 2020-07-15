import { debounce } from "@/utils";

export default {
  methods: {
    debounceInput(event, currentValue, wait = 500) {
      debounce(() => {
        console.log("!!!");
        this[currentValue] = event.target.value;
      }, wait);
    },
  },
};

<template>
  <Link />
</template>

<script>
import Link from "./components/LinkTree.vue";
export default {
  name: "App",
  components: {
    Link,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#inspire {
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  color: white;
}
#wrapper {
  text-align: center;
}

.list-item {
  list-style: none;
  margin: 2rem;
}
</style>

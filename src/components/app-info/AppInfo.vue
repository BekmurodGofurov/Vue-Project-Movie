<template>
  <Box>
    <p class="fs-3 text-uppercase">Barcha kinolar soni: {{ allMoviesCount }}</p>
    <p class="fs-4 text-uppercase">Ko'rilgan kinolar soni: {{ favouriteMoviesCount }}</p>
  </Box>
</template>

<script>
// import Box from "@/ui-components/Box.vue";

export default {
  name: 'AppInfo',
  props: {
    allMoviesCount: {
      type: Number,
      required: true,
    },
    
    favouriteMoviesCount: {
      type: Number,
      required: true,
    }
  },
  // components: {
  //   Box,
  // }
}
</script>

<style scoped></style>
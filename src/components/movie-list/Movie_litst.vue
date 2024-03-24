<template>
  <ul class="movie-list list-group">
    <MovieListItem v-for="movie in movies" v-bind:movie="movie" :key="movie.id"
    @onLike="onLikeHandler(movie.id)"
    @onFavourite="$emit('onFavourite', movie.id)"
    @onRemove="$emit('onRemove', movie.id)"
    />
  </ul>
</template>

<script>
// import MovieListItem from '@/components/movie-list-item/MovieListItem.vue'

export default {
  name: 'Movie_litst',
  // components: {MovieListItem},
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  methods: {
    onLikeHandler(id) {
      this.$emit('onLike', id);
    }
  }
}
</script>

<style scoped>
.movie-list {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
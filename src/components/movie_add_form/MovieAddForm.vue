<template>
  <div class="movie-add-form">
    <h3>Ynagi kino qo'shish</h3>
    <form class="add-form d-flex" @submit.prevent>
      <Input class="new-movie-lable" placeholder="Qandey kino?" v-model="name"/>
      
      <Input class="new-movie-lable" placeholder="Necha morotaba ko'rilgan?" v-model="viewers" type="number"/>
      
      <PrimiryButton class="btn-outline-dark"
        type="submit" 
        @click="addMovie">
        Qo'shish
      </PrimiryButton>
    </form>
  </div>
</template>

<script>
// import PrimiryButton from "@/ui-components/PrimiryButton.vue";

export default {
  name: 'MovieAddForm',
  data() {
    return {
      name: '',
      viewers: '',
    }
  },
  // components: {
  //   PrimiryButton,
  // },

  methods: {
    addMovie() {
      if (!this.name || !this.viewers) return
      const newMovie = {
        name: this.name,
        viewers: this.viewers,
        favourite: false,
        like: false,
        id: Date.now()
      }
      this.$emit('createMovie', newMovie)
      this.name ='',
      this.viewers =''

    }
  },
  
}
</script>

<style scoped>
.movie-add-form {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
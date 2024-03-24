<template>
  <div class="btn-group">

    <PrimiryButton 
      v-for="btn in filterButtons"
      :key="btn.name"
      :class="[filterName == btn.name ? 'btn-dark' : 'btn-outline-dark']"
      @click="filterHandler(btn.name)"
      >
      {{ btn.title }}
    </PrimiryButton>

    <!-- <button class="btn "
        type="button" 
        @click="filterHandler('all')"
        :class="[filterName == 'all' ? 'btn-dark' : 'btn-outline-dark']">
        Barcha kinolar
      </button>

    <button class="btn" 
      type="button" 
      @click="filterHandler('popular')" 
      :class="[filterName == 'popular' ? 'btn-dark' : 'btn-outline-dark']">
      Mashhur kinolar
    </button>

    <button class="btn" 
      type="button" 
      @click="filterHandler('mostViewers')" 
      :class="[filterName == 'mostViewers' ? 'btn-dark' : 'btn-outline-dark']">
      Eng ko'p ko'rilgan kinolar
    </button> -->
  </div>
</template>
<script>
// import PrimiryButton from '@/ui-components/PrimiryButton.vue';
export default {
  name: 'AppFilter',
  props: {
    updatFilterHandler: {
      type: Function,
      required: true,
    },
    filterName: {
      type: String,
      required: true,
    }
  },
  // components: {
  //   PrimiryButton,
  // },
  data() {
    return {
      filterButtons: [
        {
          title: "Barcha kinolar",
          name: 'all'
        },
        {
          title: "Mashhur kinolar",
          name: 'popular'
        },
        {
          title: "Eng ko'p ko'rilgan kinolar",
          name: 'mostViewers'
        },
      ],
      filter: 'all',
    }
  },
  methods: {
    filterHandler(filter) {
      this.filter = filter,
        this.updatFilterHandler(this.filter)
    }
  },
}
</script>
<style ></style>
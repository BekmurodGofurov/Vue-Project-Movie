<!-- v-on @ -->
<!-- v-bind : -->

<template>
  <div class="app font-monspace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :favouriteMoviesCount="movies.filter(c => c.favourite).length" />

      <div class="search-panel">
        <SearchPanel :updateTermHandler="updateTermHandler" />
        <AppFilter :updatFilterHandler="updatFilterHandler" :filterName="filter" />
      </div>

      <Box v-if="!movies.length && !isLoading">
        <p class="text-center fs-3 text-danger">Kinolar yo'q</p>
      </Box>

      <Box v-else-if="isLoading" class="d-flex justify-content-center">
        <Loader />
      </Box>

      <Movie_litst v-else :movies="onFilterHandler(onSearchHandler(movies, term), filter)" @onLike="onLikeHandler"
        @onFavourite="onFavouriteHandler" @onRemove="onRemoveHander" />

      <Box class="d-flex justify-content-center">
        <nav aria-label="pagination">
          <ul class="pagination pagination-sm">
            <li v-for="pageNumber in totalPages" :class="{ 'active': pageNumber === page }" :key="pageNumber"
              @click="changePageHandler(pageNumber)" class="mx-1 rounded-pill">
              <span class="page-link">{{ pageNumber }}</span>
            </li>
          </ul>
        </nav>
      </Box>


      <MovieAddForm @createMovie="createMovie" v-if="filter == 'all'" />

    </div>
  </div>
</template>

<script>
// import AppInfo from '@/components/app-info/AppInfo.vue'
// import SearchPanel from '@/components/search-panel/SearchPanel.vue'
// import AppFilter from '@/components/app-filter/AppFilter.vue'
// import Movie_litst from '../movie-list/Movie_litst.vue';
// import MovieAddForm from '../movie_add_form/MovieAddForm.vue';
import axios from 'axios';
export default {
  // components: {
  //   AppInfo,
  //   SearchPanel,
  //   AppFilter,
  //   Movie_litst,
  //   MovieAddForm,
  // },
  data() {
    return {
      movies: [],
      term: '',
      filter: 'all',
      isLoading: false, // like state = holat 
      limit: 10,
      page: 1,
      totalPages: 0,
    }
  },
  methods: {
    async createMovie(item) {
      try{
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", item)
        onsole.log(response);
        this.movies.push(response.data)
      } catch(error){
        alert(error.message)
      }
      
    },
    onLikeHandler(id) {
      this.movies.map(item => {
        if (item.id == id) {
          item.like = !item.like
        }
        return item
      })
    },
    onFavouriteHandler(id) {
      this.movies.map(item => {
        if (item.id == id) {
          item.favourite = !item.favourite
        }
        return item
      })
    },
    async onRemoveHander(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log(response);
        this.movies = this.movies.filter(c => c.id !== id)
      } catch(error){
        alert(error.message)
      }
    },
    onSearchHandler(arr, term) {
      if (term.length == 0) {
        return arr
      }
      return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
    },

    onFilterHandler(arr, filter) {
      switch (filter) {
        case 'popular':
          return arr.filter(c => c.like)
        case 'mostViewers':
          return arr.filter(c => c.viewers > 21000)
        default:
          return arr;
      }
    },

    updateTermHandler(term) {
      this.term = term
    },
    updatFilterHandler(filter) {
      this.filter = filter
    },
    mountedLog() {
      console.log("Mounted");
    },
    updateLog() {
      console.log("Updated");
    },
    unmountedLog() {
      console.log("Unmouted");
    },


    async fetchMovie() {
      try {
        this.isLoading = true
        // setTimeout(async () =>{ it is for tiem limt

        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        })
        const newArr = response.data.map(item => ({
          id: item.id,
          name: item.title,
          like: false,
          favourite: false,
          viewers: item.id * 10
        }))

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.movies = newArr
        // this.isLoading = false
        // }, 3000)


      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    },

    changePageHandler(page) {
      this.page = page
    },
  },
  mounted() {
    this.fetchMovie()
    this.mountedLog()
  },
  updated() {
    this.unmountedLog()
  },
  unmounted() {
    this.unmountedLog()
  },

  watch: {
    page() {
      // console.log("there is a change on page number"),
      this.fetchMovie()
    }
  }
}
</script>

<style>
.app {
  height: 100vh;
  color: #000;
}

.content {
  width: 1000px;
  min-height: 700px;
  background-color: #fff;
  margin: 0 auto;
  padding: 5rem 0;
}

.search-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fcfaf5;
  border-radius: 4px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
</style>
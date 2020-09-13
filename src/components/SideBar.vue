<template>
  <div class="side-bar">
    <div class="search">
      <div class="search-icon">
        <img src="../assets/icons/search.svg">
      </div>
      <input type="text" placeholder="search">
    </div>
    <div class="builtin-list">
      <div class="builtin-item" v-for="builtin in builtins" :key="builtin.id">
        {{builtin.name}}
      </div>
    </div>
    <div class="customize-list">
      <div class="customize-item" v-for="customize in customizes" :key="customize.id">
          {{customize.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data: function (){
    return {
      builtins: [
        {
          id: "1",
          name: "My day",
          icon: "",
          url: ""
        },
        {
          id: "2",
          name: "Important",
          icon: "",
          url: ""
        },
        {
          id: "3",
          name: "Planned schedule",
          icon: "",
          url: ""
        },
        {
          // the todos having no lists
          id: "4",
          name: "Task",
          icon: "",
          url: ""
        }
      ],
      customizes: []
    }
  },
  created() {
    // todo: action et customize lists
    this.$axios.get('/customizeList')
                .then(res => {
                  res.data.forEach(item => this.$store.dispatch('addList', item))
                })
                .catch(err => {
                  console.log(err)
                })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
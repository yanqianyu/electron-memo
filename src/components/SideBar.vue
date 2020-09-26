<template>
  <div class="side-bar">
<!--    todo: add border -> position change -->
    <div :class="['search', isSearchActive? 'active': 'unactive']">
      <img src="../assets/icons/search.svg">
      <input type="text" placeholder="search..." @focus="toFocus('search')" @blur="toBlur('search')">
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

    <div class="create-list" v-on:click="addCustomizeList">
      <img src="../assets/icons/add.svg">
      <span>create new list</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data: function (){
    return {
      isSearchActive: false,
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
    // todo: action at customize lists
    this.$axios.get('/customizeList')
                .then(res => {
                  res.data.forEach(item => this.$store.dispatch('addList', item))
                })
                .catch(err => {
                  console.log(err)
                })
  },
  methods: {
    toFocus(input) {
      if (input === 'search') {
        this.isSearchActive = true;
      }
    },
    toBlur(input) {
      if (input === 'search') {
        this.isSearchActive = false;
      }
    },
    addCustomizeList() {

    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  .search {
    background-color: lightgray;
    //border: none;
    border-radius: 0.5rem;
    margin: 1rem;
    //todo: box-sizing means
    box-sizing: border-box;
    order: -1;
    padding: 0.2rem;
    img {
      padding: 0 0.5rem;
      float: left;
      width: 20px;
      height: 20px;
    }
    input {
      background-color: lightgray;
      box-sizing: border-box;
      height: 20px;
      outline: none;
      border: 0;
    }
    input::placeholder {
      color: black;
    }
  }
  .builtin-list {
    height: 20rem;
  }
  .customize-list {
    flex-grow: 1;
  }
  .create-list {
    box-sizing: border-box;
    img {
      // span and img vertical-img
      vertical-align: middle;
      width: 20px;
      height: 20px;
      margin: 0.5rem;
    }
    span {
      vertical-align: middle;
      height: 20px;
    }
  }
  .create-list hover {
    cursor: default;
  }
}
.active {
   border: 1px solid palegreen;
 }
.unactive {
  border: none;
}
</style>
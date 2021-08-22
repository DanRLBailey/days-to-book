<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    {{counter}} <button @click="addToCounter">add</button>
    <span v-if="counter > 10">BogChamp > PogChamp</span>
    <ul>
      <li v-for="(item, i) in array" :key="i">{{item}}</li>
    </ul>
    {{message}}
    <input v-model="message">
    <HelloWorld msg="Welcome to Your Vue.js App" :poop="69" @anything="whenWeHearTheEvent"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import getDaysToBook from './logic/main'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      message: 'Hello You ❤!',
      counter: 0,
      array: ['poop', 'woop', 'doop'],
      days: []
    }
  },
  methods: {
    addToCounter() {
      this.counter++;
      this.message = "lov u lowen";
    },
    whenWeHearTheEvent(newNumber) {
      this.counter = newNumber;
    }
  },
  async mounted () {
    try {
      this.days = await getDaysToBook();
      console.log(this.days);
    } catch(err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

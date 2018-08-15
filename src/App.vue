<template>
  <div id="app">
    <div>
      <label>
        Name
        <input type="text" name="name" v-model="name" @keyup.enter="submitName">
      </label>
      <button @click="submitName" >Add</button>
    </div>
    <div>
        <ul>
            <transition-group name="slide" type="animation" mode="out-in" appear>
          <li v-for="(person, i) in fireName" :key="person['.key']">
            <div v-if="!person.edit">
              <p>{{i}}). {{person.name}}</p>
              <button @click="removeName(person['.key'])">Remove</button>
              <button @click="setEditName(person['.key'])">Edit</button>
            </div>
            <div v-else>
              <label>
                <input type="text" name="name" v-model="person.name" @keyup.enter="saveEdit(person)">
                <button @click="saveEdit(person)">Save</button>
                <button @click="cancelName(person['.key'])">Cancel</button>
              </label>
            </div>
          </li>
            </transition-group>
        </ul>
    </div>
  </div>
</template>

<script>
import { namesRef } from "./firebase.js";

export default {
  data() {
    return {
      name: ""
    };
  },
  firebase: {
    fireName: namesRef
  },
  methods: {
    submitName() {
      if (this.name !== "") {
        namesRef.push({ name: this.name, edit: false });
        console.log("submited");
        this.name = "";
      } else {
        alert("Fill the input name");
      }
    },
    removeName(key) {
      namesRef.child(key).remove();
    },
    setEditName(key) {
      namesRef.child(key).update({ edit: true });
    },
    cancelName(key) {
      namesRef.child(key).update({ edit: false });
    },
    saveEdit(person) {
      const key = person[".key"];
      namesRef.child(key).set({ name: person.name, edit: false });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  background-color: transparent;
  border: 2px solid black;
  margin-left: 10px;
}

input {
  border: 2px solid black;
}
li {
  list-style: none;
  margin-bottom: 2rem;
}

.slide-enter {
  /* transform: translateY(50px); */
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 1;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute; /*for smooth leaving, for transition-group on list*/
}

.slide-move {
  transition: all 1s;
}
@keyframes slide-in {
  from {
    transform: translateY(20px) translateX(100px);
  }
  to {
    transform: translateY(0px);
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0px) translateX(100px);
  }
  to {
    transform: translateY(200px);
  }
}
</style>

<template>
  <div class="add-trip card">
    <h2 class="center-align pink-text">Add New Trip</h2>
    <form @submit.prevent="addTrip">
      <div class="field title">
        <label for="title">Trip Name:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(hotspot, i) in hotspots" :key="i">
        <label for="hotspot">Hotspot:</label>
        <input type="text" name="hotspot" v-model="hotspots[i]" class="field">
        <i class="material-icons delete" @click="deleteHotspot(hotspot)">delete</i>
      </div>
      <div class="field add-hotspots">
        <label for="add-hotspot">Add a hotspot:</label>
        <input type="text" name="add-hotspot" @keydown.tab.prevent="addHotspot" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn yellow darken-2">Add Trip</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";

export default {
  name: "AddTrip",
  data() {
    return {
      title: null,
      another: null,
      hotspots: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addTrip() {
      if (this.title) {
        this.feedback = null;
        // create slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("trips")
          .add({
            name: this.title,
            hotspots: this.hotspots,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a trip title";
      }
    },
    addHotspot() {
      if (this.another) {
        this.hotspots.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add a hotspot";
      }
    },
    deleteHotspot(h) {
      this.hotspots = this.hotspots.filter(hotspot => hotspot != h);
    }
  }
};
</script>

<style>
.add-trip {
  margin: 60px auto 0px auto;
  padding: 20px;
  max-width: 500px;
}

.add-trip h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-trip .field {
  margin: 20px auto;
  position: relative;
}

.add-trip .delete {
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>


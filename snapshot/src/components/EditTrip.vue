<template>
  <div v-if="trip" class="edit-trip card">
    <h2 class="pink-text">Edit {{ trip.name }} Trip</h2>
    <form @submit.prevent="editTrip">
      <div class="field title">
        <label for="title">Trip Name:</label>
        <input type="text" name="title" v-model="trip.name">
      </div>
      <div v-for="(hotspot, i) in trip.hotspots" :key="i">
        <label for="hotspot">Hotspot:</label>
        <input type="text" name="hotspot" v-model="trip.hotspots[i]" class="field">
        <i class="material-icons delete" @click="deleteHotspot(hotspot)">delete</i>
      </div>
      <div class="field add-hotspots">
        <label for="add-hotspot">Add a hotspot:</label>
        <input type="text" name="add-hotspot" @keydown.tab.prevent="addHotspot" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn yellow darken-2">Update Trip</button>
      </div>
    </form>
  </div>
</template>

<script>
// import db to make db queries
import db from "../firebase/init";
import slugify from "slugify";
export default {
  name: "EditTrip",
  data() {
    return {
      trip: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editTrip() {
      if (this.trip.name) {
        this.feedback = null;
        // create slug
        this.trip.slug = slugify(this.trip.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("trips")
          .doc(this.trip.id)
          .update({
            name: this.trip.name,
            hotspots: this.trip.hotspots,
            slug: this.trip.slug
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
        this.trip.hotspots.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add a hotspot";
      }
    },
    deleteHotspot(h) {
      this.trip.hotspots = this.trip.hotspots.filter(hotspot => hotspot != h);
    }
  },
  created() {
    // where query takes 3 params: property, evaluation, property_comp
    let reference = db
      .collection("trips")
      .where("slug", "==", this.$route.params.trip_slug);
    // get data from db query
    reference.get().then(snapshot => {
      // data = return value of data()
      snapshot.forEach(doc => {
        this.trip = doc.data();
        this.trip.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-trip {
  margin: 60px auto 0px auto;
  padding: 20px;
  max-width: 500px;
}

.edit-trip h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-trip .field {
  margin: 20px auto;
  position: relative;
}

.edit-trip .delete {
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>



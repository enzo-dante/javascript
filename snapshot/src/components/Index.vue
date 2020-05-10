<template>
  <div class="index container">
    <div class="card" v-for="trip in trips" :key="trip.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteTrip(trip.id)">delete</i>
        <h2 class="pink-text darken-2">{{ trip.name }}</h2>
        <ul class="hotspots">
          <li v-for="(hotspot, i) in trip.hotspots" :key="i">
            <span class="chip">{{ hotspot }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditTrip',params: { trip_slug: trip.slug }}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
// use db obj to intecact w/ db
import db from "../firebase/init";

export default {
  name: "Index",
  data() {
    return {
      trips: []
    };
  },
  methods: {
    deleteTrip(id) {
      // delete doc from db
      db.collection("trips")
        .doc(id)
        .delete()
        .then(() => {
          this.trips = this.trips.filter(t => t.id !== id);
        });
    }
  },
  // use created() to get data from db
  created() {
    // fetch data from firestore w/ db collection('collectionName')
    db.collection("trips")
      .get()
      // once server has sent back a promise res of state of collection
      .then(snapshot => {
        snapshot.forEach(doc => {
          // use data() to access data
          let trip = doc.data();
          trip.id = doc.id;
          this.trips.push(trip);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

.index .hotspots {
  display: flex;
  justify-content: center;
  margin: 30px auto;
}

.index .hotspots li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  bottom: 4px;
  right: 4px;
  cursor: pointer;
  color: rgb(228, 172, 32);
  font-size: 1.4em;
}
</style>

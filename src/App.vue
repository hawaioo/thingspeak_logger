<template>
  <div id="app">
    <h1>{{ this.name }}</h1>
    <p>{{ this.description }}</p>

    <Modal ref="modal" title="Google Map">
      <GmapMap
        v-if="showMap"
        :center="coordinates"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 100%;"
      >
        <GmapMarker
          :position="coordinates"
          :clickable="true"
          :draggable="true"
        />
      </GmapMap>
    </Modal>
    <table>
      <tr>
        <th>Datum</th>
        <th>Feed1</th>
        <th>Feed2</th>
        <th v-if="useGoogleMaps">Google Maps</th>
      </tr>
      <tr v-for="(feed, index) in this.data.feeds" :key="index">
        <td>
          {{ feed.created_at }}
        </td>
        <td>
          {{ feed.field1 }}
        </td>
        <td>
          {{ feed.field2 }}
        </td>
        <td v-if="useGoogleMaps">
          <p>Längengrad; Breitengrad</p>
          <button @click="setCoordsAndShowMap(feed.field4, feed.field5)">
            {{ feed.field4 }}; {{ feed.field5 }}
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Modal from "@/Modal.vue";

export default {
  name: "App",
  components: {
    Modal
  },
  data() {
    return {
      api: "https://api.thingspeak.com/channels/",
      apiKey: "",
      channelId: "",
      resultCount: "10",
      useGoogleMaps: false,
      data: [],
      showMap: false,
      latitude: 0,
      longtitude: 0
    };
  },
  computed: {
    coordinates() {
      return { lat: this.latitude, lng: this.longtitude };
    },
    name() {
      if (this.data.channel && this.data.channel.name) {
        return this.data.channel.name || "";
      }
      return "";
    },
    description() {
      if (this.data.channel && this.data.channel.description) {
        return this.data.channel.description || "";
      }
      return "";
    }
  },
  methods: {
    setCoordsAndShowMap(lng, lat) {
      this.latitude = Number(lat);
      this.longtitude = Number(lng);
      this.$refs.modal.show();
      this.showMap = true;
    }
  },
  created() {
    this.axios
      .get(
        this.api +
          this.channelId +
          "/feeds.json?results=" +
          this.resultCount +
          "&api_key=" +
          this.apiKey
      )
      .then(response => {
        response.data.feeds = response.data.feeds.slice().reverse();
        this.data = response.data;
      });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  font-size: 9px;

  @media screen and (min-width: 600px) {
    font-size: 15px;
  }
}
table {
  margin: auto;
}

table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 2px;
  @media screen and (min-width: 600px) {
    padding: 15px;
  }
}

button {
  background: aliceblue;
  font-size: 9px;
  @media screen and (min-width: 600px) {
    font-size: 15px;
  }
}
</style>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="app" fluid>
        <h3 class="display-1 text-left">vueLinks</h3>
        <v-row justify="center" align="center">
          <v-col>
            <div id="wrapper">
              <v-row d-flex class="mt-12" align="center" justify="center">
                <v-col class="text-center">
                  <v-btn target="_blank" @click="dialog = true"
                    >+Add New Link</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <!-- Add Event Dialog -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-container>
              <v-form @submit.prevent>
                <v-text-field
                  label="Enter Title"
                  name="Title"
                  type="text"
                  v-model.lazy="Title"
                ></v-text-field>
                <v-text-field
                  label="https://url"
                  name="url"
                  type="text"
                  v-model="url"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="dialog = false"
                  >save</v-btn
                >
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>
        <v-row class="text-center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-row align="center" justify="center">
              <v-col>
                <li class="list-item">
                  <v-btn
                    x-large
                    v-if="Title && url != ''"
                    :href="url"
                    :links="links"
                    target="_blank"
                    >{{ Title }}</v-btn
                  >
                </li>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from "@/main";
export default {
  data: () => ({
    Title: null,
    url: null,
    links: [],
    dialog: false,
  }),
  mounted() {
    this.getLinks();
  },
  methods: {
    async getLinks() {
      let snapshot = await db.collection("linkEvent").get();
      let links = [];
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        links.push(appData);
      });
      this.links = links;
    },
    async addLink() {
      if (this.Title && this.url) {
        await db.collection("linkEvent").add({
          Title: this.Title,
          url: this.url,
        });
        this.getLinks();
        (this.Title = ""), (this.url = "");
      } else {
        alert("Title and url are required");
      }
    },
  },
};
</script>

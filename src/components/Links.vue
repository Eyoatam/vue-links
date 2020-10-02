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
                  <v-btn class="ma-4" target="_blank" @click="dialog = true"
                    >+Add New Link</v-btn
                  >
                  <v-btn color="primary" @click="secondDialog = true"
                    >All Todos</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-container class="center">
          <v-list-item
            v-for="(link, id) in links"
            :key="id"
            class="mb-4 list"
            :href="link.url"
            >{{ link.title }}<v-spacer></v-spacer>
          </v-list-item>
        </v-container>
        <!-- Add Event Dialog -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-container>
              <v-form @submit.prevent="addLink">
                <v-text-field
                  label="Enter Title"
                  name="Title"
                  type="text"
                  v-model="title"
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
        <!--Added second dialog-->
        <v-dialog v-model="secondDialog" max-width="500">
          <v-card>
            <v-container>
              <v-list-item-group>
                <v-list-item v-for="link in links" :key="link">
                  <v-card-subtitle>{{ link.title }}</v-card-subtitle>
                  <v-chip>{{ link.url }}</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn text class="delete" @click="deleteLinks(link)">
                    <v-icon>mdi-delete</v-icon></v-btn
                  >
                </v-list-item>
              </v-list-item-group>
            </v-container>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from "@/main";
export default {
  data: () => ({
    title: null,
    url: null,
    links: [],
    dialog: false,
    secondDialog: false,
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
        links.push(doc.data());
      });
      this.links = links;
    },
    async addLink() {
      if (this.title && this.url) {
        await db.collection("linkEvent").add({
          title: this.title,
          url: this.url,
        });
        this.getLinks();
        (this.title = ""), (this.url = "");
      } else {
        alert("Title and url are required");
      }
    },
  },
};
</script>


<style scoped>
.list {
  background: white;
}
</style>
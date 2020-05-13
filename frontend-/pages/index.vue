<template>
  <div class="container">
    <div class="row w-100">
      <div class="col-12">
        <mainheader />

        <taginput @added="onAddedItem" />

        <section>
          <itemlist
            v-for="_tag in tagsSorted"
            v-bind:key="_tag.id"
            v-bind:tag-info="_tag"
            @removeItem="onRemoveItem"
            @editedItem="onEditedItem"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import mainheader from "~/components/MainHeader.vue";
import taginput from "~/components/taginput.vue";
import itemlist from "~/components/itemlist.vue";

declare var io: any;

export default Vue.extend({
  components: {
    mainheader,
    taginput,
    itemlist
  },
  data() {
    return {
      tags: [],
      socketUri: "http://localhost:3500/",
      socket: {}
    } as any;
  },
  mounted() {
    this.initializeSocket();
  },
  methods: {
    initializeSocket() {
      this.socket = io(this.socketUri);
      this.socket.on("connect", (data: any) => {
        console.log("Socket Connected");
      });
      this.socket.on("valiu.api", (data: any) => {
        console.log(data);
        switch (data.command) {
          case "tag-create#request":
            this.addItemToList(data.values.tag);
            break;
          case "tag-edition#request":
            this.editItem(data.values.tag);
            break;
          case "tag-remove#request":
            this.removeItem(data.values.tag);
            break;
          default:
            break;
        }
      });
      console.log("Initialized Socket");
    },
    onAddedItem(tag: any) {
      if (!tag) {
        return;
      }

      this.socket.emit("valiu.client", {
        context: {
          channel: "ws",
          type: "client-action",
          sender: { socketId: this.socket.id || "" },
          stackeholder: { name: "client" }
        },
        command: `tag-create#request`,
        values: {
          tag
        }
      });
    },
    onEditedItem(tag: any) {
      this.socket.emit("valiu.client", {
        context: {
          channel: "ws",
          type: "client-action",
          sender: { socketId: this.socket.id || "" },
          stackeholder: { name: "client" }
        },
        command: `tag-edition#request`,
        values: {
          tag
        }
      });
    },
    onRemoveItem(tag: any) {
      console.log("remove action to " + tag.id);
      this.socket.emit("valiu.client", {
        context: {
          channel: "ws",
          type: "client-action",
          sender: { socketId: this.socket.id || "" },
          stackeholder: { name: "client" }
        },
        command: `tag-remove#request`,
        values: {
          tag
        }
      });
    },
    addItemToList(tag: any) {
      this.tags.push(tag);
    },
    editItem(tag: any) {
      Vue.set(
        this.tags,
        this.tags.findIndex((f: any) => f.id === tag.id),
        tag
      );
    },
    removeItem(tag: any) {
      this.findAndRemoveByKey(tag.id, "id", this.tags);
    },
    findAndRemoveByKey(query: string, key: string, _array: any[]) {
      const index = _array.findIndex(function(element, index) {
        return element[key] === query;
      });

      if (index > -1) {
        _array.splice(index, 1);
      }
      return index;
    }
  },
  computed: {
    tagsSorted(): any {
      return this.tags.sort(
        (a: any, b: any) => b.dateCreation - a.dateCreation
      )
    }
  }
});
</script>

<style>
</style>

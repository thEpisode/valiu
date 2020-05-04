<template>
  <article class="d-flex justify-content-between item-container p-2">
    <div class="d-flex position-relative align-items-center">
      <div class="color mr-2" v-bind:style="{ backgroundColor: tagInfo.color}"></div>
      <p class="text-truncate m-0" v-if="!tagInfo.isEditMode">{{tagInfo.message}}</p>
      <form v-on:submit.prevent="saveOnChange()" v-if="tagInfo.isEditMode">
        <input type="text" class="form-control" v-model="tagInfo.message" />
      </form>
    </div>

    <div>
      <button class="btn btn-link" @click="editOnClick()">Editar</button>
      <button class="btn btn-link" @click="removeOnClick()">Borrar</button>
    </div>
  </article>
</template>
<style>
.color {
  content: "";
  position: relative;
  top: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.item-container {
  background-color: #fff;
  transition: all 0.2s ease;
}
.item-container:hover {
  background-color: #eee;
  transition: all 0.2s ease;
}
.btn-link {
  color: #495057;
}
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["tagInfo"],
  data: {
    color: ""
  },
  methods: {
    editOnClick(event: any) {
      this.tagInfo.isEditMode = true;
    },
    removeOnClick(event: any) {
      this.$emit("removeItem", this.tagInfo);
    },
    generateHexadecimal() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
    saveOnChange(event: any) {
      this.tagInfo.isEditMode = false;
      this.$emit("editedItem", this.tagInfo);
    }
  },
  watch: {
    tagInfo: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val, oldVal) {
        val.color = this.generateHexadecimal();
      }
    }
  }
});
</script>

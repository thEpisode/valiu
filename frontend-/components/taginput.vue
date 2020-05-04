<template>
  <div class="mb-4 p-2">
    <form v-on:submit.prevent="saveOnChange()">
      <input
        type="text"
        class="tag-input form-control px-0"
        placeholder="Añadir etiqueta"
        v-model="tagText"
      />
    </form>
  </div>
</template>
<style>
.tag-input {
  border: 0;
  font-size: 1.5rem;
}
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: transparent;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0);
}
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      tagText: ""
    };
  },
  methods: {
    saveOnChange(event: any) {
      this.$emit("added", {
        id: `tag-${new Date().getTime()}`,
        dateCreation: new Date().getTime(),
        message: this.tagText,
        isEditMode: false
      });
      this.tagText = "" + "";
    }
  }
});
</script>
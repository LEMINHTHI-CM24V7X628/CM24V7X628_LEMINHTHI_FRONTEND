<script>
export default {
  props: {
    contacts: { type: Array, default: [] },     // danh sách contact truyền từ cha
    activeIndex: { type: Number, default: -1 }, // chỉ mục contact đang chọn
  },
  emits: ["update:activeIndex"],                // cho phép truyền ngược sự kiện ra cha
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      v-for="(contact, index) in contacts"
      :key="contact._id"
      class="list-group-item"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

<style scoped>
.active {
  background-color: #007bff;
  color: white;
}
</style>

<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>

<template>
  <div class="card shadow-sm p-3 mt-3">
    <div class="p-1"><strong>Tên:</strong> {{ contact.name }}</div>
    <div class="p-1"><strong>E-mail:</strong> {{ contact.email }}</div>
    <div class="p-1"><strong>Địa chỉ:</strong> {{ contact.address }}</div>
    <div class="p-1"><strong>Điện thoại:</strong> {{ contact.phone }}</div>
    <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fas fa-check text-success"></i>
      <i v-else class="fas fa-times text-danger"></i>
    </div>

    <div class="mt-3 text-end">
      <!-- Nút Sửa -->
      <router-link
        :to="{ name: 'contact.edit', params: { id: contact._id } }"
        class="btn btn-sm btn-warning"
      >
        <i class="fas fa-edit"></i> Hiệu chỉnh
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  background-color: #f8f9fa;
}

.text-end {
  text-align: right;
}
</style>

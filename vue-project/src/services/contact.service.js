import createApiClient from "./api.service";

class ContactService {
  constructor(baseUrl = "http://localhost:3000/api/contacts") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy toàn bộ danh sách liên hệ
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Lấy 1 liên hệ theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Thêm mới 1 liên hệ
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Cập nhật liên hệ theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa liên hệ theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Xóa toàn bộ liên hệ (tùy chọn)
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
}

export default new ContactService();

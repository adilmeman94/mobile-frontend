// import { LogOut } from "react-feather";
import API from ".";
import { API_URL } from "../configs/constant";
import { TOKEN_KEY, R_TOKEN } from "../configs/constant";
import EditStore from "../views/stores/editStore";

const AuthService = {
  async getProfile() {
    return await API.get(`${API_URL}/users/profile`);
  },
  async login(token) {
    return await API.post(`${API_URL}/users/login`, token);
  },
  async register(data) {
    return await API.post(`${API_URL}/users/register`, data);
  },
  async forgotPassword(data) {
    return await API.post(`${API_URL}/api/auth/forgotPassword`, data);
  },
  async logOut() {
    const rtoken = localStorage.getItem(R_TOKEN);
    return await API.post(`${API_URL}/users/logout/${rtoken}`);
  },
  async resetPassword() {
    const token = localStorage.getItem(TOKEN_KEY);
    return await API.post(`${API_URL}/api/auth/resetPassword/${token}`);
  },
  async changePassword(data) {
    return await API.put(`${API_URL}/users/changePassword`, data);
  },
};

const BrandService = {
  // async getList(page = 1, search = null, orderBy = null, sort = null) {
  //   const params = { page };
  //   if (search) params.search = search;
  //   if (sort !== null) params.sort = sort;
  //   if (orderBy) params.orderBy = orderBy;
  //   return await API.get(`${API_URL}/api/user`, { params });
  // },

  async getTranxList(page = 1, search = null, orderBy = null, sort = null) {
    const params = { page };
    if (search) params.search = search;
    if (sort !== null) params.sort = sort;
    if (orderBy) params.orderBy = orderBy;
    return await API.get(`${API_URL}/api/transaction/user-transaction-list`, {
      params,
    });
  },

  // async getAskMoneyDetails(page = 1, search = null, orderBy = null, sort = null) {
  //   const params = { page };
  //   if (search) params.search = search;
  //   if (sort !== null) params.sort = sort;
  //   if (orderBy) params.orderBy = orderBy;
  //   return await API.get(`${API_URL}/api/ask-money/ask-money-list`, {
  //     params,
  //   });
  // },
  async getByID(id) {
    return await API.get(`${API_URL}/api/user/${id}`);
  },

  async edit(data) {
    return await API.put(`/api/user`, data);
  },

  // async askMoney(id, data) {
  //   console.log("askmoney id", id);
  //   console.log("Brandservice token :", localStorage.getItem(TOKEN_KEY));
  //   return await API.post(
  //     `${API_URL}/api/ask-money/ask-money/${id}`,
  //     { id },
  //     data
  //   );
  // },

  // async sentMoney(id, data) {
  //   return await API.post(`${API_URL}/api/transaction/sent-money/${id}`, data);
  // },

};

const ComplaintService = {
  async getComplaintList() {
    return await API.get(`${API_URL}/complaints`);
  },
  async addComplaint(data) {
    return await API.post(`${API_URL}/complaints`, data);
  },
  async deleteComplaint(_id) {
    return await API.delete(`${API_URL}/complaints/${_id}`);
  },
};

const CategoryService = {
  async getCategoryList(parent_id = null) {
    const params = {};
    if (parent_id) {
      params.parent_id = parent_id;
    }
    return await API.get(`${API_URL}/categories`, { params });
  },

  async addCategory(parent_id = null, data) {
    const params = {};
    if (parent_id) {
      params.parent_id = parent_id;
    }
    return await API.post(`${API_URL}/categories`, data, { params });
  },

  async deleteCategory(_id) {
    return await API.delete(`${API_URL}/categories/${_id}`);
  },

  async editCategory(_id, data) {
    return await API.put(`${API_URL}/categories/${_id}`, data);
  },
};

const StoreService = {
  async addstore(data) {
    return await API.post(`${API_URL}/stores`, data);
  },
  async getstoreLists() {
    return await API.get(`${API_URL}/stores`);
  },
  async deleteStore(_id) {
    return await API.delete(`${API_URL}/stores/${_id}`);
  },
  async EditStore(_id, data) {
    return await API.put(`${API_URL}/stores/${_id}`, data);
  },
};

const ProductService = {
  async getProductList() {
    return await API.get(`${API_URL}/products`);
  },
  async deleteProducts(_id) {
    return await API.delete(`${API_URL}/products/${_id}`);
  },
  async addProduct(data) {
    return await API.post(`${API_URL}/products`, data);
  },
};

const SalesService = {
  async getsalesList(page = 1 ,search = null, orderBy = null, sort = null){
    const params = { page };
    if (search) params.search = search;
    if (sort !== null) params.sort = sort;
    if (orderBy) params.orderBy = orderBy;
    return await API.get(`${API_URL}/sells`, { params });
  },

  async deletSales(_id) {
    return await API.delete(`${API_URL}/sells/${_id}`);
  },
  
  async addSales(data) {
    return await API.post(`${API_URL}/sells`, data);
  },

  async getInvoiceList(_id){
    return await API.get(`${API_URL}/sells/invoice/${_id}`);
  },
}

const PurchaseService = {
  async getPurchaseList(page = 1 ,search = null, orderBy = null, sort = null){
    const params = { page };
    if (search) params.search = search;
    if (sort !== null) params.sort = sort;
    if (orderBy) params.orderBy = orderBy;
    return await API.get(`${API_URL}/purchases`, { params });
  },

  async addPurchase(data) {
    return await API.post(`${API_URL}/purchases`, data)
  },

  async deletePurchase(_id) {
    return await API.delete(`${API_URL}/purchases/${_id}`);
  },
}

const DashBoard = {
  async getProductCount(){
    return await API.get(`${API_URL}/dashboard/productsCount`);
  },
  async getSaleCount(){
    return await API.get(`${API_URL}/dashboard/sellCount`);
  },
  async getComplaintCount(){
    return await API.get(`${API_URL}/dashboard/complaintCount`);
  },
  async getPurchaseCount(){
    return await API.get(`${API_URL}/dashboard/purchaseCount`);
  },



}

export { AuthService, BrandService, ComplaintService, CategoryService, StoreService, ProductService, SalesService, PurchaseService, DashBoard };

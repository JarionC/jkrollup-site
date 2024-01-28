import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BACK_END_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Pinggy-No-Screen':'any'
  }
});

export default {
  signup(user) {
    return apiClient.post('/signup', user);
  },
  signin(credentials) {
    return apiClient.post('/signin', credentials);
  },
  register(registrationId, referer){
    return apiClient.post(`/registration/${registrationId}`, referer);
  },

  createProduct(product){

    var formData = new FormData();

    formData.append("name", product.name);
    formData.append("displayName", product.displayName);
    formData.append("available", product.available);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("tags", product.tags);
    formData.append("imageUrl", product.imageUrl);
    formData.append("thumbnailUrl", product.thumbnailUrl);
    formData.append("dimensions", product.dimensions);
    formData.append("material", product.material);
    formData.append("weight", product.weight);
    formData.append("visible", product.visible);
    formData.append("mainImg", product.mainImg);

    for(let i = 0; i < product.imageFiles.length; i++){
      formData.append("imgFiles", product.imageFiles[i]);
    }

    return apiClient.post('/product/create', formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }});
  },

  getProduct(productId){
    return apiClient.get(`/product/product/${productId}`);
  },

  getProducts(){
    return apiClient.get(`/product/products/`);
  },

  updateProduct(product){
    var formData = new FormData();

    formData.append("name", product.name);
    formData.append("displayName", product.displayName);
    formData.append("available", product.available);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("tags", product.tags);
    formData.append("imageUrl", product.imageUrl);
    formData.append("thumbnailUrl", product.thumbnailUrl);
    formData.append("dimensions", product.dimensions);
    formData.append("material", product.material);
    formData.append("weight", product.weight);
    formData.append("visible", product.visible);
    formData.append("displayData", product.displayData);
    

    return apiClient.post(`/product/update/${product.productId}`, formData);
  },

  calculateShipping(shippingTo, lineItems){
    var formData = new FormData();

    formData.append("shippingTo", shippingTo);
    formData.append("lineItems", lineItems);

    return apiClient.post('/shipping/estimate', formData);
  },

  updateProductByProp(productId, propName, propValue){
    
    var formData = new FormData();

    formData.append("propName", propName);
    formData.append("propValue", propValue);
    
    return apiClient.post(`/product/updateByProp/${productId}`, formData);
  },

  createOrder(order){
    return apiClient.post('/order/create', order);
  },

  getOrder(orderId){
    return apiClient.get(`/order/order/${orderId}`);
  },

  getOrders(){
    return apiClient.get(`/order/orders/`);
  },

  updateOrder(orderId, order){
    return apiClient.post(`/order/update/${orderId}`, order);
  },

  updateOrderByProp(orderId, propName, propValue){
    
    var formData = new FormData();

    formData.append("propName", propName);
    formData.append("propValue", propValue);
    return apiClient.post(`/order/updateByProp/${orderId}`, formData);
  },

  adminLogin(username, password){
    var formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    return apiClient.post("/admin/login", formData);
  },

  sendCustomRequest(formName, formEmail, formPhone, formBudget, formDate, formNotes, formFile) {
    var formData = new FormData();

    formData.append("name", formName);
    formData.append("email", formEmail);
    formData.append("phone", formPhone);
    formData.append("budget", formBudget);
    formData.append("date", formDate);
    formData.append("notes", formNotes);
    formData.append("file", formFile);

    if(formFile){
      
      return apiClient.post('/customrequest',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    else  {
      return apiClient.post('/customrequest',formData)
    }
  },

  sendContact(formName, formEmail, formPhone, formMessage) {
    var formData = new FormData();

    formData.append("name", formName);
    formData.append("email", formEmail);
    formData.append("phone", formPhone);
    formData.append("message", formMessage);

    return apiClient.post('/contact', formData);
  }
};

<template>
    <div class="admin-controls-container">
        <div class="admin-controls-title">ADMIN CONTROLS</div>
        <div class="control-sections">
            <div class="product-section">
                <div class="product-controls-title">PRODUCTS</div>
                <div class="product-controls">
                    <div v-on:click="startAddingProduct()" class="control-button add-product-button">Add New Product</div>
                </div>
                <div v-if="addingProduct" class="add-product-form">
                    <input type="text" v-model="newProductName" placeholder="Name" />
                    <input type="text" v-model="newProductPrice" placeholder="Price" />
                    <input type="text" v-model="newProductDisplayName" placeholder="DisplayName" />
                    <input type="text" v-model="newProductDescription" placeholder="Description" />
                    <input type="text" v-model="newProductTags" placeholder="Tags" />
                    
                    <input  v-on:change="mainFileUpdated" name="mainImg" type="file" multiple/>
                    <input  v-on:change="filesUpdated" name="imgFiles" type="file" multiple/>
                       
                    <input type="text" v-model="newProductImageUrl" placeholder="ImageUrl" />
                    <input type="text" v-model="newProductThumbnailUrl" placeholder="ThumbnailUrl" />
                    <input type="text" v-model="newProductDimensions" placeholder="Dimensions" />
                    <input type="text" v-model="newProductMaterial" placeholder="Material" />
                    <input type="text" v-model="newProductWeight" placeholder="Weight" />
                    <input type="text" v-model="newDisplayData" placeholder="Display Data" />
                    <div>
                        <div>Available</div>
                        <input type="checkbox" v-model="newProductAvailable" placeholder="Available" />
                    </div>
                    <div>
                        <div>Visible</div>
                        <input type="checkbox" v-model="newProductVisible" placeholder="Visible" />
                    </div>
                    <div v-on:click="saveNewProduct()" class="control-button submit-product-button">Save Product</div>
                    <div v-on:click="cancelNewProduct()" class="control-button cancel-product-button">Cancel</div>
                </div>
                <div class="product-list-container">
                <div class="product-list" v-for="product in products" :key="product.productId">
                    <div class="listed-product">
                        <div class="listed-field">
                            <div class="field-label">Title </div>
                            <input type="text" class="listed-product-title" :disabled="!product.editingEnabled" v-model="product.displayName"/>
                        </div>
                        <div class="image-field">
                            <div class="field-label">Image </div>
                            <div type="text"  class="listed-product-image" :style="'background-image: url(' + imageDomain + product.imageUrl + ')'"></div>
                        </div>
                        <div class = "listed-field">
                            <div class="field-label">Images</div>
                            
                             </div>
                        <div class="listed-field">
                            <div class="field-label">Image Url </div>
                            <input  type="text" class="listed-product-image-url" :disabled="!product.editingEnabled" v-model="product.imageUrl"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Thumbnail Url </div>
                            <input  type="text" class="listed-product-thumbnail-url" :disabled="!product.editingEnabled" v-model="product.thumbnailUrl"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Description </div>
                            <input  type="text" class="listed-product-description" :disabled="!product.editingEnabled" v-model="product.description"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Dimensions </div>
                            <input  type="text" class="listed-product-dimensions" :disabled="!product.editingEnabled" v-model="product.dimensions"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Weight </div>
                            <input  type="text" class="listed-product-weight" :disabled="!product.editingEnabled" v-model="product.weight"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Price </div>
                            <input  type="text" class="listed-product-price" :disabled="!product.editingEnabled" v-model="product.price"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Tags </div>
                            <input  type="text" class="listed-product-tags" :disabled="!product.editingEnabled" v-model="product.tags"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Display Data </div>
                            <input  type="text" class="listed-product-displaydata" :disabled="!product.editingEnabled" v-model="product.displayData"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Available </div>
                            <input  type="checkbox" class="listed-product-available" :disabled="!product.editingEnabled" v-model="product.available"/>
                        </div>
                        <div class="listed-field">
                            <div class="field-label">Visible </div>
                            <input  type="checkbox" class="listed-product-visible" :disabled="!product.editingEnabled" v-model="product.visible"/>
                        </div>
                        
                        <div class="listed-product-controls">
                            <div v-on:click="editProduct(product)" class="control-button edit-listed-product-button">Edit</div>
                            <div v-on:click="saveProduct(product)" class="control-button save-listed-product-button">Save Changes</div>
                            <div v-on:click="removeProduct(product)" class="control-button remove-listed-product-button">Remove</div>
                            <div v-on:click="cancelProduct(product)" class="control-button cancel-edit-listed-product-button">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../../api/app';
  
  export default {
    data() {
      return {
        updatingProduct: false,
        loadingProducts: true,
        loadingOrders: true,
        addingProduct:false,
        submittingProduct: false,
        products: [],
        orders: [],
        newProductName: "",
        newProductAvailable: false,
        newProductPrice: null,
        newProductDisplayName: "",
        newProductDescription: "",
        newProductTags: "",
        newProductImageUrl: "",
        newProductThumbnailUrl: "",
        newProductDimensions: "",
        newProductMaterial: "",
        newProductWeight: null,
        newProductDisplayData: "",
        newProductVisible: false,
        newProductMainImage: {},
        newProductImageFiles: [],
        newDisplayData: "",
        imageDomain: process.env.VUE_APP_IMAGE_DOMAIN

      };
    },
      mounted: function(){
        
      },
      created(){  
        var self = this;
        apiClient.getProducts().then(function(response){
            response.data.forEach(function(part, index, theArray){
                theArray[index]['editingEnabled'] = false;
            })
            self.products = response.data; 
            self.loadingProducts = false;
        }).catch(function(e){
            
            console.error(e);
            self.loadingProducts = false;
        });    
        
        apiClient.getOrders().then(function(response){
            self.orders = response.data;
            self.loadingOrders = false;
        }).catch(function(e){
            console.error(e);
            self.loadingOrders = false;
        });  
      },
      computed: {
        isEditing: function(product, thing){
            var index = this.products.findIndex( x => x.productId === product.productId)
            return this.products[index]['editingEnabled'];
        }
      },
      methods: {
        mainFileUpdated(event){
            this.newProductMainImage = event.target.files[0];
        },
        filesUpdated(event){
            this.newProductImageFiles = event.target.files;
        },
        editProduct: function(product){
            var index = this.products.findIndex( x => x.productId === product.productId)
            this.products[index]['editingEnabled'] = true;
            product['editingEnabled'] = true;
        },
        removeProduct: function(product){
            apiClient.removeProduct(product.productId);
        },
        startAddingProduct: function(){
            this.addingProduct = true;
        },
        cancelNewProduct: function(){
            this.newProductName = "";
            this.newProductAvailable = false;
            this.newProductPrice = null;
            this.newProductDisplayName = "";
            this.newProductDescription = "";
            this.newProductTags = "";
            this.newProductImageUrl = "";
            this.newProductThumbnailUrl = "";
            this.newProductDimensions = "";
            this.newProductMaterial = "";
            this.newProductDisplayData = "";
            this.newProductImageFiles = [];
            this.newProductMainImage = {};
            this.newProductWeight = null;
            this.newProductVisible = false;

            this.addingProduct = false;
        },
        saveNewProduct: function(){
            var self = this;
            var newProduct = {};
            newProduct['name'] = this.newProductName;
            newProduct['available'] = this.newProductAvailable;
            newProduct['price'] = parseFloat(this.newProductPrice);
            newProduct['displayName'] = this.newProductDisplayName;
            newProduct['description'] = this.newProductDescription;
            newProduct['tags'] = this.newProductTags;
            newProduct['imageUrl'] = this.newProductImageUrl;
            newProduct['thumbnailUrl'] = this.newProductThumbnailUrl;
            newProduct['dimensions'] = this.newProductDimensions;
            newProduct['material'] = this.newProductMaterial;
            newProduct['weight'] = parseFloat(this.newProductWeight);
            newProduct['visible'] = this.newProductVisible;
            newProduct['displayData'] = this.newProductDisplayData;
            newProduct['imageFiles'] = this.newProductImageFiles;
            newProduct['mainImg'] = this.newProductMainImage;

            apiClient.createProduct(newProduct).then(function(response){
                apiClient.getProducts().then(function(response){
                    response.data.forEach(function(part, index, theArray){
                        theArray[index]['editingEnabled'] = false;
                    })
                    self.products = response.data;
                    self.loadingProducts = false;
                    self.addingProduct = false;
                }).catch(function(e){
                    console.error(e);
                    self.loadingProducts = false;
                    self.addingProduct = false;
                });  
            }).catch(function(e){
                console.error(e);
            });  
        },
        saveProduct: function(product){
            var self = this;
            self.updatingProduct = true;
            product.price = parseFloat(product.price);
            product.weight = parseFloat(product.weight);
            apiClient.updateProduct(product).then(function(response){
                self.products = response.data;
                self.updatingProduct = false;
                product['editingEnabled'] = false; 
            }).catch(function(e){
                console.error(e);
                self.updatingProduct = false;
                product['editingEnabled'] = false; 
            });  
        },
        cancelProduct: function(product){
            var self = this;
            product['editingEnabled'] = false; 
            self.loadingProducts = true;    
            apiClient.getProducts().then(function(response){
                response.data.forEach(function(part, index, theArray){
                    theArray[index]['editingEnabled'] = false;
                })
                self.products = response.data;
                self.loadingProducts = false;
            }).catch(function(e){
                console.error(e);
                self.loadingProducts = false;
            });   
        }
    },
  };
  </script>
  <style>
  .admin-controls-container{
    width:100%;
    height:100%;
    padding: 1em;
    background-color:white;
    color:black;
    box-sizing: border-box;
  }
  .admin-controls-title{
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .control-button{
    width: 100%;
    padding: .8em;
    background-color: blue;
    color: white;
    font-weight: bold;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: .6em;
    margin-top: .4em;
    margin-bottom: .4em;
    box-sizing: border-box;
  }

  .add-product-form{
    display: flex;
    flex-direction : column;
    max-width: 300px;
    gap: .4em;
  }

  .product-controls-title{
    font-size: 1em;
    font-weight: bold;
    margin-top: 2em;
    margin-bottom: 1em;
  }

  .listed-product-image{
    width: 200px;
    height:200px;
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .product-section{
    box-sizing: border-box;
    height:100%;
  }

  .product-list-container{
    max-height:400px;
    box-sizing: border-box;
    overflow-y: scroll;
  }

  .image-field{
    margin-top: .5em;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    gap: .2em;
  }
</style>
export default {
     decodeJwtResponseFromGoogleAPI: function(token) {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = 
       decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + 
       c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload)
    },

    productsAreEqual: function(product1, product2){
     
       if(product1.shape){
          if(product1.shape.name != product2.shape.name){
               return false;
          }
       }
       
       if(product1.image){
          if(product1.image.name != product2.image.name){
               return false;
          }
          if(product1.image.imageFile){
               if(product1.image.imageFile != product2.image.imageFile){
                    return false;
               }
          }
       }

       return true;
    }
}

const minuteFactor = 60000;

export default {
    set: function(key, value, expires){
        sessionStorage.setItem(key, JSON.stringify(value));

        setTimeout(function(){
            sessionStorage.removeItem(key);
        }, expires * minuteFactor);
    },

    get: function(key){
        return JSON.parse(sessionStorage.getItem(key));
    },

    remove: function(key){
        sessionStorage.removeItem(key);
    },

    clear: function(){
        sessionStorage.clear();
    }

}
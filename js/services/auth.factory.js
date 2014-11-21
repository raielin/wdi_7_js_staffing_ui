angular.module('StaffingUI').factory('AuthFactory', function($http, $window, ServerUrl) {
    // We make a post request to the route of /login, passing along
    // credentials (here, email and password). If successful, we take
    // the token in the response, and save it in sessionStorage (an
    // HTML5 storage session) allows us to store information for that tab
    // session. $window gives you an Angular wrapped object, but same as
    // just saying 'window'.
    var login = function(credentials) {
        return $http
            .post(ServerUrl + '/login', credentials)
            .success(function(response) {
                // If prefer localStorage, just need to change sessionStorage to localStorage
                // but will need to manage the persistence of it. It will persist through
                // new tabs and after closing a browser.
                $window.sessionStorage.setItem('staffingUI.user', response.token);

                $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('staffingUI.user');
            });
    };

    // Still making functionality for the URL, just making a request for now.
    // We will remove the item based on this key. Good to prefix key with
    // something unique to this product or website. Session storage is being
    // shared by all other web sites, applications, plugins, etc.
    var logout = function(credentials) {
        // In our routes we set it as a get, but could be almost anything.
        // We're assuming there's some functionality in the API to do something
        // upon logout, i.e. deleting a session, or removing a token, etc.
        return $http
            // would put whatever request we need here to do the thing it should do upon logout.
            .get(ServerUrl + '/logout')
            .success(function(response) {
                $window.sessionStorage.removeItem('staffingUI.user');
            });
    };

    var isAuthenticated = function() {
        return !!$window.sessionStorage.getItem('staffingUI.user');
    };

    return {
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated
    };
});

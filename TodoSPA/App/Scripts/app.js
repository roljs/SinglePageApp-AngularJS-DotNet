'use strict';
angular.module('todoApp', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/App/Views/Home.html",
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/App/Views/TodoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/', 
            tenant: 'roljshotmail073.onmicrosoft.com',
            clientId: 'a3b32a3c-4af8-4da9-835d-ea9335831717',
            extraQueryParameter: 'nux=1',
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            displayCall: function (urlNavigate) {
                //var w = window.open(window.location.protocol + "//" + window.location.host, "_blank", "height=800,width=600");
                var w = window.open(window.location.protocol + "//" + window.location.host);
                w.location.href = urlNavigate;
                //var w = window.open(urlNavigate);
            },
            handleCallback: function(loginStartPage) {
                //[rolandoj] Adjustments to allow for popup-based login
                //window.parent.location.replace(loginStartPage);
                //window.parent.location.href = window.parent.location.protocol + "//" + window.parent.location.host + window.parent.location.pathname + "#" + loginStartPage;
                //window.parent.location.reload(true);
                //window.parent.document.location.reload();
                //window.parent.postMessage("done", "*")
                //Hack required to close a window without any prompt for IE7 & greater versions.
                //setTimeout(function () {
                    //window.open('', '_parent', '');
                    window.close();
                    //alert("closed")
                //}, 500);

            }
        },
        $httpProvider
        );
   
  
}]);


window.addEventListener("message", receiveMessage, false);
window.onunload = refreshParent;

function refreshParent() {
    try{
        window.opener.location.reload();
    }catch(e){}
}

function receiveMessage(event) {
    window.location.reload(true);
    alert("posted");

}
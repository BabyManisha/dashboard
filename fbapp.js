function redirect() {
   // window.location="word.html";
   // $("#login").removeClass("show");
   // $("#login").addClass("hide");
   // $("#wordgame").removeClass("hide");
   // $("#wordgame").addClass("show");
   // displayImage();
   fbstatus = true;
}

function post() {
    FB.api('/me/feed', 'post', {
        message : "The Most Romantic Word Between Me and My Soulmate is!!",
        link: 'https://s3-ap-southeast-1.amazonaws.com/sm-word-game/index.html',
        picture: 'https://s3-ap-southeast-1.amazonaws.com/sm-word-game/'+path
    }, function(response) {
        // document.getElementById('status').innerHTML = response.id;
        console.log(response);
        console.log("SM Success!!");
        window.location = "https://www.facebook.com/";
    });
}

// The SDK loaded callback (see below)
window.fbAsyncInit = function() {
      // The SDK is loaded so let's init it.
      FB.init({
          appId : '1130006373787712',
          xfbml : true,
          version : 'v2.8'
      });
      // We check the user's login status
      FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                  // displayImage();
                  redirect();
            } else {
                  // If the user is NOT already logged in, we ask him to do it first
                  FB.login(function(response) {
                        if (response.authResponse) {
                                    // displayImage();
                                    console.log("SMSMSMSMSMSMSMSMSMSMSMSMMS");
                                    console.log(response);
                                    console.log("SMSMSMSMSMSMSMSMSMSMSMSMMS");
                                    redirect();
                        } else {
                                    // User refused to give your site permissions, no friends list !
                        }
                  }, {scope: 'publish_actions'});
            }
      });
};



// Here you will load Facebook's SDK asynchronously (it will not block your page loading)
// Once the SDK is loaded, it will call the window.fbAsyncInit function above
(function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
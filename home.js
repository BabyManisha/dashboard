$(document).ready(function () {


  	Vue.component('popup', {
  	    template: "#app-popup",
  	    data: function(){
  	    	return {
  	    		// popupHeader: this.$parent.popupHeader
  	    		popupHeader: 'Know Your Love Status',
  	    		headlines: [],
  	    		fbstatus: false,
  	    		accessToken: '',
  	    		userID: '',
  	    		appimage: '',
  	    		shareStatus: false
  	    	}
  	    },
  	    created () {
  	    	// The SDK loaded callback (see below)
  	    	var self = this;
  	    	window.fbAsyncInit = function() {
  	    	      // The SDK is loaded so let's init it.
  	    	      FB.init({
  	    	          appId : '1853777131504991',
  	    	          xfbml : true,
  	    	          version : 'v2.6'
  	    	      });
  	    	      // We check the user's login status
  	    	      FB.getLoginStatus(function(response) {
  	    	            if (response.status === 'connected') {
  	    	                  // displayImage();
  	    	                  console.log(response);
  	    	                  // sdbdfn
  	    	                  self.fbstatus = true;
  	    	                  self.accessToken = response.authResponse.accessToken;
  	    					  self.userID = response.authResponse.userID;
  	    					  self.redirect();
  	    	                  // self.redirect(response.authResponse);
  	    	            } else {
  	    	                  // If the user is NOT already logged in, we ask him to do it first
  	    	                  FB.login(function(response) {
  	    	                        if (response.authResponse) {
  	    	                                    // displayImage();
  	    	                                    console.log(response);
  	    	                                    self.fbstatus = true;
  	    	                                    self.accessToken = response.authResponse.accessToken;
  	    					  					self.userID = response.authResponse.userID;
  	    					  					self.redirect();
  	    	                                    // self.redirect(response.authResponse);
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

  	    },
  	    methods: {
  	    	redirect (){
  	    		var self = this;
  	    		var fbapi = "http://comb.shivaprasanth.info/api/love?accessToken="+self.accessToken+"&userID="+self.userID;
  	    		  $.getJSON(fbapi).done(function( json ) {
  	    		      console.log(json);
  	    		      console.log(json['url']);
  	    		      self.appimage = json['url'];
  	    		    }).fail(function( jqxhr, textStatus, error ) {
  	    		      var err = textStatus + ", " + error;
  	    		      console.log( "url1 Request Failed: " + err );
  	    		  });
  	    	},
  	    	shareIt(){
  	    		var self = this;
  	    	    FB.api('/me/feed', 'post', {
  	    	        message : "My Love Status....",
  	    	        link: 'http://dashboard.babymanisha.com/',
  	    	        picture: self.appimage
  	    	    }, function(response) {
  	    	        // document.getElementById('status').innerHTML = response.id;
  	    	        console.log(response);
  	    	        console.log("SM Success!!");
  	    	        self.shareStatus = true;
  	    	        // window.location = "https://www.facebook.com/";
  	    	        // window.location = "http://dashboard.babymanisha.com/";
  	    	    });
  	    	}
  	    }
  	    // created (){
  	    // 	var self = this;
  	    // 	var googleNews = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=dfa97dc15cea425d9fbc3829ef7582f1";
	    	 //  $.getJSON( googleNews )
	    	 //    .done(function( json ) {
	    	 //      console.log( "JSON Data: " + json['articles'][0] );
	    	 //      for(let ob in json['articles']){
	    	 //      	var news = json['articles'][ob];
	    	 //      	for(let ne in news){
	    	 //        	console.log( "JSON Data: " + news['description'] );
	    	 //        	self.headlines.push(news['description']);
	    	 //      	}
	    	 //      }
	    	 //    })
	    	 //    .fail(function( jqxhr, textStatus, error ) {
	    	 //      var err = textStatus + ", " + error;
	    	 //      console.log( "Request Failed: " + err );
	    	 //  });
  	    // }
  	});


	var App = new Vue({
	  el: '#app',
	  data: {
	    tittle: 'AZ-Posts',
	    popupStatus: false,
	    popupHeader: 'Model Header',
	    headlines: [],
	    video: ""
	  },
	    created (){
	    	var self = this;
	    	var googleNews = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=dfa97dc15cea425d9fbc3829ef7582f1";
	    	  $.getJSON( googleNews )
	    	    .done(function( json ) {
	    	      // console.log( "JSON Data: " + json['articles'][0] );
	    	      for(let ob in json['articles']){
	    	      	var news = json['articles'][ob];
	    	      	for(let ne in news){
	    	        	// console.log( "JSON Data: " + news['description'] );
	    	        	if(self.headlines.indexOf(news['description']) == -1 && self.headlines.length <= 10){
	    	        		self.headlines.push(news['description']);
	    	        	}
	    	      	}
	    	      }
	    	      // console.log(self.headlines);
	    	    })
	    	    .fail(function( jqxhr, textStatus, error ) {
	    	      var err = textStatus + ", " + error;
	    	      console.log( "Request Failed: " + err );
	    	  });

	    	var youtubeVideo = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=1&key=AIzaSyCpeVeLJb9W0bKiz4s07GagM9hU9Jjr138";
	    	$.getJSON( youtubeVideo )
	    	  .done(function( json ) {
	    	    // console.log( "JSON Data: " + json['items'][0]['id'] );
	    	    // for(let ob in json['items']){
	    	    // 	var news = json['items'][ob];
	    	    // }
	    	    self.video = json['items'][0]['id'];
	    	    // console.log(self.headlines);
	    	  })
	    	  .fail(function( jqxhr, textStatus, error ) {
	    	    var err = textStatus + ", " + error;
	    	    console.log( "Request Failed: " + err );
	    	});
	    },
	  methods: {
	  	showPopup (ev, popheader){
	  		document.getElementById('popup').style.display='block';
	  		// this.popupHeader = popheader;
	  	}
	  }
	})

});
$(document).ready(function () {


  	Vue.component('popup', {
  	    template: "#app-popup",
  	    data: function(){
  	    	return {
  	    		// popupHeader: this.$parent.popupHeader
  	    		popupHeader: 'Model Header',
  	    		headlines: []
  	    	}
  	    },
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
	    tittle: '..SivaMani..',
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
	    	      console.log( "JSON Data: " + json['articles'][0] );
	    	      for(let ob in json['articles']){
	    	      	var news = json['articles'][ob];
	    	      	for(let ne in news){
	    	        	console.log( "JSON Data: " + news['description'] );
	    	        	if(self.headlines.indexOf(news['description']) == -1 && self.headlines.length <= 1){
	    	        		self.headlines.push(news['description']);
	    	        	}
	    	      	}
	    	      }
	    	      console.log(self.headlines);
	    	    })
	    	    .fail(function( jqxhr, textStatus, error ) {
	    	      var err = textStatus + ", " + error;
	    	      console.log( "Request Failed: " + err );
	    	  });

	    	var youtubeVideo = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=1&key=AIzaSyCpeVeLJb9W0bKiz4s07GagM9hU9Jjr138";
	    	$.getJSON( youtubeVideo )
	    	  .done(function( json ) {
	    	    console.log( "JSON Data: " + json['items'][0]['id'] );
	    	    // for(let ob in json['items']){
	    	    // 	var news = json['items'][ob];
	    	    // }
	    	    self.video = json['items'][0]['id'];
	    	    console.log(self.headlines);
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
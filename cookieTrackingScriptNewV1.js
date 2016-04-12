/*
*
*This is the new version of the currencies cookie script code
*This code makes it easier to read and easier to resuse
*certain functions within the code
*
*/

//This line creates the variable to hold the traffic source 
var source = trafficSource();



/*********This is the cookie code block. This block creates the cookie, gets the cookie and checks the cookie ******/

//Function setCookie actually creates the cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    var source = document.referrer;
}
 

//This function get the cookie value
function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
 

 //This function check to see if there is a cookie if there is do nothing if there isnt create a cookie
   function checkCookie() {
            var verifyCookie = getCookie("New Cookie"); //This variable gets the value of the cookie

            if (verifyCookie != null ){ //if there is a cookie do nothing
 
                //alert("there is a cookie");
 
                return "";
            }else{
 
 
               setCookie("New Cookie", source, 30); //If there is no cookie this line of code creates the cookie using setCookie function
 
               //alert("new cookie made");
            }
 
    }

 
//This line invokes the checkCookie function
checkCookie();

/**********This line ends the create, get and check cookie code block ***********/


/*****************Code to populate the form fields*******************************/ 

var trafficSourceValue = getCookie("Traffic Source Cookie"); 

// var splitTrafficSource = trafficSourceValue.split("/");

// var sourceTraffic = splitTrafficSource[0];

 // console.log(sourceTraffic);

// var mediumTraffic = splitTrafficSource[1];



if(trafficSourceValue == null){

  // It is possible a user may block cookies. If they do the form will see no cookies so 
  //The website doesn't believe the script is not working. 

	 jQuery("input[name=trafficSource]").val("No Cookie");
    jQuery("input[name=trafficMedium]").val("No Cookie");
}

else if (trafficSourceValue == "Direct"){

      //If the user comes via Direct the medium and source both need to be Direct

       var splitTrafficSource = trafficSourceValue.split("/");
 
       var sourceTraffic = splitTrafficSource[0];

         // console.log(sourceTraffic);

        var mediumTraffic = splitTrafficSource[1];

	      mediumTraffic = sourceTraffic;

       jQuery("input[name=trafficSource]").val(sourceTraffic);
       jQuery("input[name=trafficMedium]").val(mediumTraffic);
}

else {

        var splitTrafficSource = trafficSourceValue.split("/");

        var sourceTraffic = splitTrafficSource[0];

        // console.log(sourceTraffic);

        var mediumTraffic = splitTrafficSource[1];

	   jQuery("input[name=trafficSource]").val(sourceTraffic);
     jQuery("input[name=trafficMedium]").val(mediumTraffic);


}



/**************Code to populate form fields ends *******************************/





// trafficSource function determines which source the user comes from and then executes it according function.
function trafficSource(trafficType){


	//The trafficType stores the type of trafffic. 
	var trafficType;
    var trafficReferrer = document.referrer;
    var trafficURL = document.URL;
   

    //Here we run a check using if and else statements to determine, which part of code invokes the check functions below

   if(checkPaidSearch() == true){


   		trafficType = paidSearch();
   }
   else if(checkSearchEngine() == true){

   		trafficType = searchEngine();

   }
   else if(checkSocialNetwork() == true){


   		trafficType = socialNetwork();
   }
   else if (checkDirect() == true){

   		//alert("Direct worked");
   		trafficType = directSource();
   }
   // else if (checkDisplay = true){

   // 		trafficType = display();
   // }

   else{

   		//If all else fails then we will collect the referral website.

   		//This line of code splits the referral URL and returns just the hostname
   		var returnReferrer = document.referrer.match(/https?:\/\/([^\/]*)(?:\/|$)/i)[1].replace(/www\./, "");
          
        trafficType =  returnReferrer + "/Referral" ;
   }

   return trafficType;

}// end of trafficSource function 



/*************Functions that check which traffic medium the users comes in through*******************/

//Checks if the user came in via paid search and sends information to traffic Source 

function checkPaidSearch(checkSource){

 var checkSource;

 var trafficReferrer = document.referrer;
 var trafficURL = document.URL;
   
    if(trafficURL.indexOf("gclid") > -1){

    		checkSource = true;

    }

    else if(trafficURL.indexOf("bing") >-1 &&(trafficURL.indexOf("ppc")> -1) || (trafficURL.indexOf("cpc") >-1)){

    		checkSource = true;

    }

    else{

    	   checkSource = false;
    }

    return checkSource;

}// end of checkPaidSearch function 

checkPaidSearch(); // Invokes function 




function checkSearchEngine(checkSource){

var checkSource;
var trafficType;
var trafficURL = document.URL;
var trafficReferrer = document.referrer;


if(trafficReferrer.indexOf("plus.url.google.com")<= 0 && trafficReferrer.indexOf("google")>-1 && trafficURL.indexOf("gclid")< 0){



	checkSource = true;
}
else if((trafficReferrer.indexOf("bing")>-1 && (trafficURL.indexOf("ppc") < 0))) {

	checkSource = true;
	//trafficType = searchEngine();
}
else if((trafficReferrer.indexOf("ask")>-1 && (trafficURL.indexOf("ppc") < 0))) {

	checkSource = true;
	//trafficType = searchEngine();

}
else if((trafficReferrer.indexOf("baidu") >-1 && (trafficURL.indexOf("ppc") < 0))) {


	checkSource = true;
	//trafficType = searchEngine();

}
else if((trafficReferrer.indexOf("yahoo") > -1 && (trafficURL.indexOf("ppc") < 0))) {


	checkSource = true;
	//trafficType = searchEngine();

}

else {

	checkSource = false;
}

return checkSource;


}//End of checkSearchEngine

checkSearchEngine(); //Invokes function


//This functions checks if the user came via social network and sends information to trafficSource function 
function checkSocialNetwork (checkSource){

var checkSource;
var trafficType;
var trafficReferrer = document.referrer;



if(trafficReferrer.indexOf("facebook")>-1){


	checkSource = true;
}
else if (trafficReferrer.indexOf("plus.url.google.com")>-1){


	checkSource = true;
}
else if (trafficReferrer.indexOf("t.co/")>-1){


	checkSource = true;
}
else if (trafficReferrer.indexOf("linkedin")>-1){


	checkSource = true;

}
else if (trafficReferrer.indexOf("reddit")>-1){



	checkSource = true;
}
else if(trafficReferrer.indexOf("disqus")>-1){

	checkSource = true;
}
else if (trafficReferrer.indexOf("pinterest")>-1){

	checkSource = true;
}
else if (trafficReferrer.indexOf("blogspot.co.uk")>-1){

	checkSource = true;
}

else if (trafficReferrer.indexOf("t.umblr")>-1){

	checkSource = true;
}
else{

	checkSource = false;
}

return checkSource;



}// end of checkSocialNetwork function 

checkSocialNetwork();//Invokes function


//sends information to trafficSource function of where the source is a direct source
//This function merely just checks it doesnt provide any direct work.
function checkDirect (checkSource){

var checkSource;
var trafficType;
var trafficReferrer = document.referrer;

if(trafficReferrer == ""){

	checkSource = true;
}
else{


	checkSource = false;
}

return checkSource;

} // end of checkDirect function

checkDirect();//Invokes function





/*************Functions that check which traffic source the users comes in through ENDS*******************/


/******Display code function not currently being used ********/

// function checkDisplay (checkSource){

// var checkSource;
// var trafficType;
// var trafficURL = document.URL;
// var trafficReferrer = document.referrer;


// 	if(trafficURL.indexOf("display") >-1 || trafficURL.indexOf("Display") >-1){

// 		checkSource = true;
// 	}
// 	else{


// 		checkSource = false;
// 	}


// }// end of check Display function 

// checkDisplay();


/*******Display code function block ends here ************/



/*****************Functions that determine which source the user came from BEGIN*********************/

// This function check which search engine the visitor arrived with.

function searchEngine (referrer){
            var search = document.referrer;
            var bing = "bing";
            var google ="google";
            var yahoo = "yahoo";
            var ask = "ask";
            var msn = "msn";
            var baidu = "baidu";
            var referrer;
            if (search.indexOf(bing)> -1){
 
                        //alert(bing);
                        referrer = bing + "/organic";
            } else if (search.indexOf(yahoo)>-1){
 
                       // alert(bing);
                        referrer = yahoo + "/organic";
            } else if (search.indexOf(ask)>-1){
 
                    referrer = ask + "/organic";
 
            } else if (search.indexOf(msn)>-1){
 
                       // alert(bing);
                        referrer = msn + "/organic";
            } else if (search.indexOf(baidu)>-1){
 
                       // alert(baidu);
                        referrer = baidu + "/organic";
            }
             else{
                       // alert(google);
                        referrer = google + "/organic";
            }
            return referrer;
           // alert("Search Engine: " + referrer);
           
}


 
//This function checks which social network the user came from
function socialNetwork (referrer){
 
 
            var search = document.referrer;
            var facebook ="facebook";
            var twitter = "twitter";
            var googlePlus = "google plus";
            var googlePlus2 = "plus.url.google.com";
            var pinterest ="pinterest";
            var linkedin = "linkedin";
            var tumblr = "t.umblr";
            var reddit = "reddit";
            //var beforeItsNews ="news";
            var disquis = "disqus";
            var blogger = "blogspot.co.uk";
            //var StumbleUpon = "StumbleUpon";
            var referrer;
            if(search.indexOf(facebook)> -1){
                       // alert(facebook);
                        referrer =  facebook + "/social" ;
            }else if (search.indexOf(twitter)> -1 || search.indexOf("t.co/") >-1){
                       // alert(twitter);
                        referrer =  twitter +  "/social" ;
            }else if (search.indexOf(pinterest)> -1){
 
                        //alert(pinterest);
                        referrer = pinterest + "/social" ;
            }else if (search.indexOf(linkedin) >- 1){
 
                        //alert(linkedin);
                        referrer = linkedin + "/social";
 
 
            }else if (search.indexOf(googlePlus) >-1 || search.indexOf(googlePlus2) >-1){
                       // alert(googlePlus);
                        referrer = googlePlus + "/social";
            }else if (search.indexOf(tumblr) >-1){
                       // alert(googlePlus);
                        referrer ="tumblr" + "/social";
            }else if (search.indexOf(reddit) >-1){
                       // alert(reddit);
                        referrer = reddit +  "/social";
            }else if (search.indexOf(disquis) >-1){
                       //alert(disquis);
                        referrer = disquis +  "/social";
            }else if (search.indexOf(blogger) >-1){
 
 
                        blogger ="blogger";
                       //alert(blogger);
                        referrer = blogger +  "/social";
            }else{
 
 
               // alert(document.referrer);
                referrer = "Referral/ " + document.referrer;
               // alert("Check Cookie - Referrer");
 
            }
            return referrer;
           // alert("Social Media Network: " + referrer)
}
 



// This function checks to see which paid search source the user came from
function paidSearch(referrer){
 
            var paidCampaign = document.URL;
            var campaignReferrer = document.referrer;
            var referrer;
 
            var googleAd = "gclid";
            var justGoogle = "google";
            var justBing = "ppc";
            var bingAd = "Bing";
 
            if (paidCampaign.indexOf(googleAd) >- 1 || campaignReferrer.indexOf(justGoogle) >-1){
 
 
                googleAd = "google/cpc ";
               // alert(googleAd);
                //referrer = paidCampaign; < original code but trying the code on the bottom>
                referrer = googleAd;
               // alert(referrer);
 
            }
            if (paidCampaign.indexOf(bingAd)>- 1 || paidCampaign.indexOf(justBing) >-1){
 
 
                bingAd = "bing/cpc ";
                //alert(bingAd);
                referrer = bingAd ;
            }
 
            return referrer;
          //  alert("The paid ad is: " + googleAd);
}
 


 //This functions check to see if the user came via direct source.
function directSource(referrer){
 
 
       var directVistor = document.referrer;
 
 
        if(directVistor ==="" || directVistor === null ){
 
 
            referrer = "Direct";
 
            //alert("Direct");
        }
 
        return referrer;
 
}



//This function checks to see if the user came via  a display ad
 
function display(referrer){
 
    var displayURL = document.URL;
 
    var referrer;
 
   
    if(displayURL.indexOf("display") >- 1 || displayURL.indexOf("Display")>-1){
 
        var returnDisplay = window.location.search.substring(1);
 
        referrer =  "Display: " + returnDisplay;
 
 
 
        //alert(referrer);
 
        return referrer;
    }
 
 
}

/*****************Functions that determine which source the user came from END*********************/
 

 // This function breaks down a URL structure to get to certain values for example just the hostname
function getQueryParam(par){
 
  //var strURL = document.URL;
 
  var strURL = document.referrer;
 
  var regParam = new RegExp("(?:\\?|&)" + par + "=([^&$]*)", "i");
 
  var resExp = strURL.match(regParam);
 
  if((typeof resExp == "object") && resExp && (resExp.length > 1)){
 
    return resExp[1];
 
  }
  else{
    return "";
  }
 
}

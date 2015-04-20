var main = function () {

    $(".results").hide();
    
    $(".main button").toArray().forEach(function (element) {
        var $element = $(element);
        var $xVal;
        var $yVal;
        var $chooseID;
        var $addID;
        var $divideID;
        $xInput = $(".xInput");
	$yInput = $(".yInput");

        $chooseID = $(".chooseButton").id;
        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".main button").removeClass("active");
            $element.addClass("active");
            
        if ($element.is(":nth-child(1)")) {
            	//Have a username and password input box
		//and a button to hit enter
		
		$(".input").show();
		$(".results").hide();
		$(".resultText").empty();

	    } else if ($element.is(":nth-child(2)")) {
		//DO ADDITION
		var $xVal = $xInput.val();
		var $yVal = $yInput.val();        
		
		$(".input").hide();
		$(".resultText").empty();
		$(".results").show();
		
		if(!isNumber($xVal)){
			$(".results").css("background-color", "red");
			$(".resultText").append("Addition Result: ERROR");
			alert("X is not a number");
		}else if(!isNumber($yVal)){
			$(".results").css("background-color", "red");
			$(".resultText").append("Addition Result: ERROR");
			alert("Y is not a number");
		}else{

		    $xVal = parseInt($xVal, 10);
		    $yVal = parseInt($yVal, 10);

		    $value = $xVal + $yVal;

		    $(".results").css("background-color", "yellow");
		    $(".resultText").append("Addition Result: " + $value);
	    	}
	    } else if ($element.is(":nth-child(3)")){
	    //DO DIVISION
	 	var $xVal = $xInput.val();
		var $yVal = $yInput.val();        
		
		$(".input").hide();
		$(".resultText").empty();
		$(".results").show();
		
		if(!isNumber($xVal)){
			$(".resultText").append("Division Result: ERROR");
			alert("X is not a number");
		}else if(!isNumber($yVal)){
			$(".resultText").append("Division Result: ERROR");
			alert("Y is not a number");
		}else{

		    $xVal = parseInt($xVal, 10);
		    $yVal = parseInt($yVal, 10);
		    
		    $value = $xVal / $yVal;
		    
		    $(".results").css("background-color", "orange");
		    $(".resultText").append("Division Result: " + $value);  
		    
		    if($yVal === 0){
			alert("The result is infinity");
		    }
	    	}   
	    } 
	    
            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$(document).ready(main);

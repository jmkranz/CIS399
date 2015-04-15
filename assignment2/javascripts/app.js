var main = function () {
    
    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
            	//Have a username and password input box
		//and a button to hit enter
		$userLabel = $("<span> - Username</span>");
		$passLabel = $("<span> - Password</span>");
		$userName = $("<input>");
		$password = $("<input type='password'>");
		$linebreak = $("<br>");
		$button = $("<br><button>").text("Submit");

		$button.on("click", function () {
			if (($userName.val() !== "") && ($password.val() !== "")){
				console.log($userName.val());
				console.log($password.val());
			}
		});
		
		$content = $("<div>").append($userName).append($userLabel).append($linebreak).append($password).append($passLabel).append($button);
	    } else if ($element.parent().is(":nth-child(2)")) {
		//Show my assignement 1 in this tab
		$assignment1 = $("<img src='imgs/assignment1.png' alt='research'>");
		$content = $("<div>").append($assignment1);
            
	    } 
	    
            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);

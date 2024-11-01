var setCookie = function(cookieName, cookieValue, expiresAfterDays) {
	var d = new Date();
	d.setTime(d.getTime() + expiresAfterDays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

var getCookie = function(cookieName) {
	var name = cookieName + "=";
	var ca = document.cookie.split(";");

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

document.addEventListener("DOMContentLoaded", function() {
	var varBlocks = document.querySelectorAll(".var-block");

	varBlocks.forEach(function(block) {
		block.style.display = "none";

		var parentqm = block.getAttribute("data-qm").split("-"),
			parentqid = "q-" + parentqm[1],
			dcookie = getCookie("vh-" + parentqid);

		if (dcookie === "" && block.classList.contains("var-block--default")) {
			block.style.display = "block";

			var answers = document.querySelectorAll(".q-answers");
			answers.forEach(function(answer) {
				answer.querySelector("span").classList.add("selected");
			});
		} else if (block.getAttribute("data-qm") === parentqid + "-" + dcookie) {
			block.style.display = "block";

			document
				.querySelector("#" + parentqid + " ." + dcookie)
				.classList.add("selected");
		}
	});

	// Click on answer, show the correct content.
	var answers = document.querySelectorAll(".q-answers span");

	answers.forEach(function(answer) {
		answer.addEventListener("click", function() {
			var questionsID = answer.parentNode.parentNode.getAttribute("id"),
				questionValue = this.getAttribute("class").split(" ")[0];

			// Hide all answer content for this question.
			document
				.querySelectorAll('[data-qm^="' + questionsID + '"].var-block')
				.forEach(function(question) {
					question.style.display = "none";
				});

			if (false === this.classList.contains("selected")) {
				document
					.querySelectorAll(
						'[data-qm="' + questionsID + "-" + questionValue + '"].var-block'
					)
					.forEach(function(question) {
						question.style.display = "block";
					});
			}

			// Adds selected to the clicked button, removes from others.
			var children = this.parentNode.children;
			for (var i = 0; i < children.length; i++) {
				children[i].classList.remove("selected");
			}
			this.classList.add("selected");

			setCookie("vh-" + questionsID, questionValue, "1000");
		});
	});
});

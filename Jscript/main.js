var menu = document.querySelectorAll(".menu").length;
var disable = document.querySelectorAll(".menu");

for (var i = 0; i < menu; i++) {
    document.querySelectorAll(".menu")[i].addEventListener("click", function() {
        disable.forEach(element => {
            element.classList.remove("active");
        });
        this.classList.add("active");
    });
}

function hideAll(page) {
    var pages = document.querySelectorAll(".page");
    pages.forEach(element => {
        element.classList.add("hidden");
    });
    document.getElementById(page).classList.remove("hidden");
}

function home() {
    hideAll("home");
}

function about() {
    hideAll("about");
}

function projects() {
    hideAll("projects");
}

function contact() {
    hideAll("contact");
}



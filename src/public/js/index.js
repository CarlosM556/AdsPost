$(document).ready(() => {

    if(window.scrollY > 0){
        document.querySelector('header').classList.toggle('scrolling-active',window.scrollY);
    }

    window.addEventListener('scroll', function () {
        let header = document.querySelector('header');
        let windowPosition = window.scrollY > 0;
        header.classList.toggle('scrolling-active', windowPosition);
        let navbar = document.querySelector(".navbar-collapse");
        if (windowPosition) {
            navbar.style.transition = "background-color 3s";
            navbar.style.backgroundColor = "black";
        }else{
            navbar.style.transition = null;
            navbar.style.backgroundColor = null;
        }
    });

    $("#submit").click(function(){
        $.post("http://localhost:3000/send-email",{
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            tel: $("#tel").val(),
            msg: $("#msg").val()
        },()=>{
            alert("success");
        },"json");
    });

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            console.log("click");
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            var div = this.parentElement;
            div.classList.toggle("shadow");
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                
                // panel.style.padding = null;
            } else {
                // panel.style.padding = "3rem 5rem";
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});
function login() {

    $('#login_form').validate({
        errorPlacement: function(error, element) {
            if (element.attr("name") == "email")
                error.appendTo($('#messBox1'))

            if (element.attr("name") == "pass")
                error.appendTo($('#messBox2'))
        },
        rules: {
            email: {
                required: true,
                email: true
            },
            pass: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Email field have to be completed",
                email: "Your email address must be in the format of name@domain.com"
            },
            pass: {
                required: "Password field have to be completed"
            }
        },
        submitHandler: function() {

            $form = document.getElementById("login_form")
            var fd = new FormData($form);

            $rememberMe = document.getElementById("exampleCheck1").checked;

            fd.append('rememberMe', $rememberMe)

            $.ajax({
                url: "/Book_store/rest/login",
                type: 'POST',
                data: fd,
                success: function (response) {
                    console.log(response[0]['id_user']);

                    if (response == 'admin') {
                        window.location.replace("admin_panel.html");
                    } else if (response[0]['id_user'] != undefined) {

                        document.getElementById('exampleInputEmail').value = ''
                        document.getElementById('exampleInputPassword1').value = ''

                        localStorage.setItem('id_user', response[0]['id_user'])
                        localStorage.setItem('user_name', response[0]['user_name'])
                        window.location.replace("user_home.html");

                    } else {
                        document.getElementById('messB').innerHTML = response
                    }
                    
                }, error: function (err) {
                    console.log(err)
                },
                processData: false,
                contentType: false
            })
        }
    })
}

$(document).ready(function() {
    login()
});
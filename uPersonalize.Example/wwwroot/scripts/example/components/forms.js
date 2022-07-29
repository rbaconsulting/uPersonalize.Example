window.addEventListener('load', function () {
    var togglePasswordButtons = document.getElementsByClassName('togglePassword');

    if (togglePasswordButtons) {
        Array.prototype.forEach.call(togglePasswordButtons, function (button) {
            button.addEventListener('click', function () {
                var togglePassword = button.children[0];

                var passwordInput = button.previousElementSibling;

                if (togglePassword.classList.contains('bi-eye')) {
                    togglePassword.classList.replace('bi-eye', 'bi-eye-slash');
                    passwordInput.setAttribute("type", "text");
                }
                else if (togglePassword.classList.contains('bi-eye-slash')) {
                    togglePassword.classList.replace('bi-eye-slash', 'bi-eye');
                    passwordInput.setAttribute("type", "password");
                }
            });
        });
    }
});
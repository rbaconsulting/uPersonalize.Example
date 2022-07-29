function setCookie(name, value) {
	if (name && value) {
		document.cookie = name + '=' + encodeURIComponent(value) + ';max-age=max-age-in-seconds;path=/;secure;samesite=strict;';
	}
}

function cookieExists(name) {
	return document.cookie.indexOf(name + '=') > -1;
}

function getCookieValue(name) {
	document.cookie.split(';').forEach(function (cookie) {
		if (cookie.indexOf(name) == 0) {
			return decodeURIComponent(cookie.split('=').pop());
		}
	});

	return null;
}

function deleteCookie(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



function httpRequest(method, requestUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open(method, requestUrl, true); // true for asynchronous
	xmlHttp.send(null);
}
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
(new IntersectionObserver(function (e, o) {
    if (e[0].intersectionRatio > 0) {
        document.querySelector('nav.sticky-top').classList.remove('stuck');
    } else {
        document.querySelector('nav.sticky-top').classList.add('stuck');
    };
})).observe(document.querySelector('.trigger'));
const RBA_PRIVACY_COOKIE = 'rba_opt_out';

window.addEventListener('load', function () {
    //privacy-warning
    var privacyWarningModal = document.querySelector('#privacy-warning');

    if (!cookieExists(RBA_PRIVACY_COOKIE) && privacyWarningModal) {
        var acceptButton = document.querySelector('#acceptPrivacyPolicy');

        if (acceptButton !== null) {
            acceptButton.addEventListener('click', function () {
                privacyWarningModal.classList.add('d-none');
                privacyWarningModal.setAttribute('aria-hidden', 'true');
                setCookie(RBA_PRIVACY_COOKIE, 'true');
            });
        }

        var declineButton = document.querySelector('#declinePrivacyPolicy');

        if (declineButton !== null) {
            declineButton.addEventListener('click', async function () {
                privacyWarningModal.classList.add('d-none');
                privacyWarningModal.setAttribute('aria-hidden', 'true');
                setCookie(RBA_PRIVACY_COOKIE, 'false');

                let result = await uPersonalize.optOut();
            });
        }

        privacyWarningModal.classList.remove('d-none');
        privacyWarningModal.setAttribute('aria-hidden', 'false');
    }

    //uPersonalize Example Banner

    var uPersonalizeExampleBanner = document.getElementById('uPersonalizeExampleBanner');

    if (uPersonalizeExampleBanner) {
        var enablePersonalization = document.getElementById('enablePersonalization');
        if (enablePersonalization) {
            enablePersonalization.addEventListener('click', async function () {
                let result = await uPersonalize.resetPersonalization(true);
                location.reload();
            });
        }

        var disablePersonalization = document.getElementById('disablePersonalization');
        if (disablePersonalization) {
            disablePersonalization.addEventListener('click', async function () {
                let result = await uPersonalize.optOut();
                location.reload();
            });
        }
    }
});
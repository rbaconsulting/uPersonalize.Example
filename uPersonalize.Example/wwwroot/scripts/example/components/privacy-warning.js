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
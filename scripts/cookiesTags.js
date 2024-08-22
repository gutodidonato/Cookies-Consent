    /*RENDERIZAÇÃO DO FRAME */
    document.addEventListener('DOMContentLoaded', function () {
        if (localStorage.getItem('consentMode') === null) {
            document.getElementById('cookie-banner').style.display = 'block';
        }
    
        document.getElementById('accept-all-cookies').addEventListener('click', function () {
            localStorage.setItem('consentMode', JSON.stringify({
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'personalization_storage': 'granted',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
            }));
            document.getElementById('cookie-banner').style.display = 'none';
            applyConsentMode();
        });
    
        document.getElementById('customize-cookies').addEventListener('click', function () {
            let consentMode = {
                'ad_storage': confirm("Permitir cookies de anúncios?"),
                'analytics_storage': confirm("Permitir cookies de análise?"),
                'personalization_storage': confirm("Permitir cookies de personalização?"),
                'functionality_storage': confirm("Permitir cookies de funcionalidade?"),
                'security_storage': confirm("Permitir cookies de segurança?")
            };
            localStorage.setItem('consentMode', JSON.stringify(consentMode));
            document.getElementById('cookie-banner').style.display = 'none';
            applyConsentMode();
        });
    
        function applyConsentMode() {
            let consent = JSON.parse(localStorage.getItem('consentMode'));
            gtag('consent', 'update', consent);
        }
    
        if (localStorage.getItem('consentMode') !== null) {
            applyConsentMode();
        }
    });

    /* Verificação / set da Tag */
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    if (localStorage.getItem('consentMode') === null) {
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'personalization_storage': 'denied',
            'functionality_storage': 'denied',
            'security_storage': 'denied',
        });
    } else {
        gtag('consent', 'default', JSON.parse(localStorage.getItem('consentMode')));
    }

    if (localStorage.getItem('userId') != null) {
        window.dataLayer.push({
            'user_id': localStorage.getItem('userId')
        });
    }
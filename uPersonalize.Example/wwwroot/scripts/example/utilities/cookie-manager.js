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
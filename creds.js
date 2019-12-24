var CREDS_DELIM = "`"
var zippedEDomains = {
	"g": "gmail.com",
	"m": "mail.ru"
}

function toCredText(name, login, pass, email, comments) {
	var text = name + CREDS_DELIM
		+ login + CREDS_DELIM
		+ pass + CREDS_DELIM
		+ emailZipper(email) + CREDS_DELIM
		+ comments;
	text = encodeURI(text);
	text = btoa(text);
	return text
}

function fromCredsText(text) {
	var text = decodeURI(atob(text));
	var arr  = (text + "````").split(CREDS_DELIM);
	return {
		name: arr[0],
		login: arr[1],
		pass: arr[2],
		email: emailUnZipper(arr[3]),
		comments: arr[4]
	}
}

function emailZipper(email) {
	if (!email.includes('@')) {
		return email;
	}
	var index = email.indexOf('@');
	var ename = email.substr(0, index); // Check it
	var domain = email.substr(index + 1); // Check it
	for (var k in zippedEDomains) {
		var val = zippedEDomains[k];
		console.log("val", val);
		console.log("domain", domain);
		if (val === domain) {
			domain = "!" + k;
			break;
		}
	}
	return ename + "@" + domain;
}

function emailUnZipper(email) {
	if (!email.includes('@')) {
		return email;
	}
	var index = email.indexOf('@');
	var ename = email.substr(0, index); // Check it
	var domain = email.substr(index + 1); // Check it
	if (domain.startsWith("!")) {
		var domain = domain.substr(1);
		for (var k in zippedEDomains) {
			if (k === domain) {
				domain = zippedEDomains[k];
				break;
			}
		}
	}
	return ename + "@" + domain;
}

function getFromUrl(url) {
	var index = url.indexOf("?r=");
	if (index < 0) {
		return;
	}
	index += 3; // 3 - length of "?r=" text

	return url.substr(index);
}

function generateUrl(text) {
	var site = "https://aldienightstar.github.io/";
	var suburl = "/load.html";
	return site + suburl + "?r=" + text;
}
// Parse URL Queries
function url_query(query) {
    query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var expr = "[\\?&]" + query + "=([^&#]*)";
    var regex = new RegExp(expr);
    var results = regex.exec(window.location.href);
    if (results !== null) {
        return results[1];
    } else {
        return false;
    }
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
function setCookie(name, value, minutes) {
    var d = new Date;
    d.setTime(d.getTime() + 60 * 1000 * minutes);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
function deleteCookie(name) { setCookie(name, '', -1); }

function openWindow(url, isNewWindow) {
    var win = window.open(url, isNewWindow ? '_blank' : '');
    if (win) {
        win.focus();
    } else {
        alert('Please allow popups for this website');
    }
}
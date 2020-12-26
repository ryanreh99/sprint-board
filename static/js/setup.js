const csrf_token = $("#csrf_token").text();

$.ajaxSetup({
    headers: { "X-CSRFToken": csrf_token },
});

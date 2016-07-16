/**
 * Created by lowjiansheng on 15/7/16.
 */

$(function(){
    var apikey = "BjCvF8PqrwKfRZkH6cjLf";
    var myapp = new ivle(apikey);

    //TEST AUTH
    var re = /(.*)\/.*/;
    myapp.auth($('#login'), window.location.origin + re.exec(window.location.pathname)[1] + "/loggedin.html");
});
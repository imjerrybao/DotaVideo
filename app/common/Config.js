var q = 'dota';
var token = '687474703A2F2F6769742E6F736368696E612E6E65742F6D616E3073696F6E732F446F7461566964656F';
var jxdta = ("{q:'"+q+"',cp:%s,limitdate:%s,od:%s}");
var userVideoData = ("{q:'"+q+"',uid:'%s',cp:%s,limitdate:0}");
var usersData = ("{q:'"+q+"',cp:%s}");
//var host = "http://localhost/wxbAdmin/";
var host = "http://wx.wefi.com.cn/wxbVideos/";
var routers = [
    {label: 'Home', text: '每日精选',nav:true},
    {label: 'Users', text: '发现更多',nav:true},
    {label: 'TopList', text: '热门排行',nav:true},

];

var Config = {
    auth:host+"?r=site/GetToken&valid=%s",
    jx:host+"?r=TVPlaylist/GetSokuList&data="+jxdta,
    userVideo:host+"?r=TVPlaylist/GetYokuUserPlayList&data="+userVideoData,
    users:host+"?r=TVPlaylist/GetSokuUser&data="+usersData,
    routers:routers,
    token:token
}
module.exports = Config;
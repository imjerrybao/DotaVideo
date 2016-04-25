var React = require('react-native');

import Toast from 'react-native-root-toast';
import Config from './Config';


var {
    AsyncStorage,

    } = React;
function Main(){
    /**
     *
     * @param order
     * @param sortBy
     * @returns {*}
     */
    this.sortByKey = function(order, sortBy) {
            var ordAlpah = (order == 'asc') ? '>' : '<';
            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
            //console.log(sortFun);
            return sortFun;
    }
    /**
     *
     * @returns {*|string}
     */
    this.sprintf = function ()
    {
        var arg = arguments,
            str = arg[0] || '',
            i, n;
        for (i = 1, n = arg.length; i < n; i++) {
            if(arg[i]!=null)
                str = str.replace(/%s/, arg[i]);
        }
        return str;
    }
    /**
     *
     * @param url
     * @returns {{protocol: *, host: *, hostname: *, port: (*|number), pathname: *, query: {}, search: (*|string), hash: *}}
     */
    this.urlParse= function(url) {
        var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
        var query = {};
        if(match && match[6])
        {
            var q = match[6].replace("?","").split("&");

            for(var i=0;i< q.length;i++)
            {
                var [k,v] = q[i].split("=");
                query[k] = v;
            }

        }
        var res =   {
                protocol: match[1],
                host: match[2],
                hostname: match[3],
                port: match[4] || 80,
                pathname: match[5],
                query: query,
                search: match[6]||'',
                hash: match[7]
            }
        return res;

    }
    /**
     *
     * @param url
     * @returns {*|XML|void|string}
     */
    this.queryFormat = function(url){
        var reg = new RegExp("(\\{.*?\\})");
        var u = url.replace(reg,function(q){
            return encodeURIComponent(q);
        });

        return u;
    }
    /**
     *
     * @param n1
     * @param n2
     * @returns {number}
     */
    this.random = function(n1,n2){
        var rand = Math.round(Math.random() * (Math.max(n1,n2)-Math.min(n1,n2) + 1));
        if(rand==0)
           return Main.random(n1,n2);
        return rand;
    }
    /**
     *
     * @param ListView
     * @returns {{data: Array, loading: boolean, dataSource: *, page: number, end: boolean}}
     */
    this.initialListData = function(ListView){
        var ds = null;
        if(ListView)
             ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return {
            data: [],
            loading: false,
            dataSource: ds,
            page: 1,
            end: false,
            loadErr:false
        }
    }
    this.getToken = function(){

        var Q = require('q');
        var deferred = Q.defer();



        console.log("===>AsyncStorage");

        let info = '39423246413139344546354130454237';
        let time = new Date().getTime();
        var hexString = (time+Config.token);

        var url = Main.sprintf(Config.auth,info);


        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Xerver':info+(new Date().getTime()),
                'Xbuffer':hexString,
            }})
            .then(res=>res.json())
            .then((res)=>{
                console.log("===>fetch");

                deferred.resolve(res);
                AsyncStorage.setItem('token',JSON.stringify(res.data),function(e){
                    if(e)
                        deferred.reject(e);

                });


            }).catch((e)=> {
                deferred.reject(e);

        })
        return deferred.promise;

    },
    /**
     *
     * @param url
     * @param component
     */
    this.token = null;
    this.loadData= function (component,url,reverse) {

        this._loadData(component,url,reverse);
        //AsyncStorage.getItem('token',function(err,res){
        //    if(err || !res)
        //    {
        //        Main.getToken().then((token)=>{
        //            Main.token = token;
        //            console.log("==>getToken",Main.token);
        //
        //            Main._loadData(component,url,reverse);
        //
        //        });
        //
        //    }
        //    if(res)
        //    {
        //        Main.token = JSON.parse(res);
        //        console.log("==>AsyncStorage",Main.token);
        //
        //        Main._loadData(component,url,reverse);
        //
        //    }
        //
        //});


    }
    this._loadData = function(component,url,reverse){
        //console.log(url);

        url = Main.queryFormat(url);
        if (component.state.loading || component.state.end)
            return;
        component.setState({
            loading: true
        })
        //var tname = Main.token.name;
        //var tvalue = Main.token.value;

        //console.log(url);
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                't':new Date().getTime()
            },
            //body: tname+"="+tvalue

        })

            .then((res)=> res.json())

            .then((res)=> {
                //console.log(res);
                var end = false;
                var data = component.state.data.concat(res.data);
                if (res.data.length == 0)
                    end = true;
                if(reverse)
                    data.reverse();
                var page = component.state.page + 1;


                component.setState({
                    page: page,
                    data: data,
                    dataSource: component.state.dataSource.cloneWithRows(data),
                    loading: false,
                    end: end,
                    loadErr:false,
                });

            }).catch((e)=>{
                //AsyncStorage.removeItem('token',function(e){
                //    console.log("==>removeItem",e);
                //
                //});
                console.log(e);
                component.setState({
                    loadErr:true,
                    loading: false,

                });

        })
    }

    /**
     *
     * @param component
     * @param router
     * @param params
     */
    this.goRouter = function (component,router,params) {
        //this.props.navigator.replace({ name: 'video',passProps: params });

        component.props.navigator.push({
            name: router,
            passProps: params
        });
    }
    /**
     *
     * @param msg
     */
    this.toast = function(msg){

        Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
    }
    /**
     *
     * @param url
     * @returns {*|string}
     */
    this.getUrl = function(url){
        var arg = arguments;
        var arg1 = arg[1] || null;
        var arg2 = arg[2] || null;
        var arg3 = arg[3] || null;
        var arg4 = arg[4] || null;
        var arg5 = arg[5] || null;

        return  Main.sprintf(u, arg1,arg2,arg3,arg4,arg5);

    }


}

var Main = new Main();
module.exports = Main;
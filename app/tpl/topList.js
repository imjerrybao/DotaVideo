/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
import {Header,Footer,Layout,Topav} from '../common/Layout';
import ListBox from '../component/ListBox';
import {styles} from '../common/Css';
import Config from '../common/Config';
import Main from '../common/Main';
var {
    View,
    Text,
    TouchableOpacity
    } = React;


module.exports = React.createClass({
    getInitialState: function () {
        return {}
    },


    render: function () {
        //console.log(this.props)
        var day = this.props.day || 7;
        return (
            <View>
                <Header title={this.props.title}/>

               <Topav navigator={this.props.navigator}  active={day}/>

                <View style={[styles.sortcontent]}>
                    <ListBox  url={Config.jx} {...this.props} day={day} od={3}/>
                </View>
                <Footer navigator={this.props.navigator} active={'TopList'}/>

            </View>



        );

    },
});




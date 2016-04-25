/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
import {Header,Footer,Layout} from '../common/Layout';
import {styles} from '../common/Css';

import UserVideoList from '../component/UserVideoList';
var {
    View,
    Navigator
    } = React;



module.exports = React.createClass({

    getInitialState:function(){
        return {
        }
    },
    render: function() {
        return (
            <View>
                <Header title={this.props.title} />

                <View style={[styles.content]}>
                    <UserVideoList  {...this.props} />
                </View>
                <Footer navigator={this.props.navigator} active='Users'/>

            </View>
        );
    },
});




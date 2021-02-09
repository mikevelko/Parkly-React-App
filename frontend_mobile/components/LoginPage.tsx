import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { fetchLogin } from './FetchUtils';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Button,
} from "react-native";

const CryptoJS = require("crypto-js");

export default function LoginPage(props) {
    const [loginInput, setLogin] = useState();
    const [password, setPassword] = useState();

    const onSubmitHandler = () => {
        const encrypted = CryptoJS.SHA1(password).toString(CryptoJS.enc.Base64);
        fetchLogin("/authorization/login", {
            login: loginInput,
            password: encrypted
        }, "POST").then((value) => {
            console.log("asdasd");
            console.log(value);
            props.setSecurityToken(value);
            if (value != null) {
                props.navigation.navigate('Home');
            }
        });

    }
    return (
        <View>
            <Text>Login</Text>
            <TextInput onChangeText={(e) => setLogin(e)} value={loginInput} />
            <Text>Password</Text>
            <TextInput secureTextEntry={true} onChangeText={(e) => setPassword(e)} value={password} />
            <Button onPress={() => onSubmitHandler()} title={"Submit"}></Button>
        </View>
    )
}
import * as React from 'react';
import { Banner, Button, List, Paragraph, Subheading, TextInput, Title } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { sendRequest } from './sdk';
import { getKey, saveKey, userData, UserData } from './utils';
import { observer } from 'mobx-react';

const LoginScreen = observer((props:any)=>{
    const [loginForm,setLoginForm] = React.useState({
        username:'',
        password:''
    })
    const [loading,setLoading] = React.useState(false);
    const [notification,setNotification] = React.useState(null)
    const [checkToken,setCheckToken] = React.useState(true)

    React.useEffect(()=>{
        if(checkToken){
            if(!userData.data){
                getKey('token',(res:any)=>{
                    if(res){
                        setNotification({content:res})
                    }
                })
            }

            setCheckToken(false)
        }
    })

    const processLogin = ()=>{
        setLoading(true)
        sendRequest('/api-token-auth/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        }, (response:any)=>{
            var nots = ''
            if(response.username !== undefined){
                for (let index = 0; index < response.username.length; index++) {
                    nots += `Username: ${response.username[index]}\n`
                }
            }
            if(response.password !== undefined){
                for (let index = 0; index < response.password.length; index++) {
                    nots += `Password: ${response.password[index]}\n`
                }
            }
            if(response.non_field_errors !== undefined){
                for (let index = 0; index < response.non_field_errors.length; index++) {
                    nots += `${response.non_field_errors[index]}\n`
                }
            }
            if(response.detail !== undefined){
                nots += `${response.detail}\n`
            }
            if(response.user !== undefined){
                nots += `Welcome ${response.user.username}\n`
                saveKey('token',response.token)
                userData.setData(response.user)
            }

            setNotification({
                content:nots
            })
            setLoading(false)
        }, (error:any)=>{
            var nots = []
            if(error.username !== undefined){
                for (let index = 0; index < error.username.length; index++) {
                    nots.push(error.username[index])
                }
            }
            if(error.password !== undefined){
                for (let index = 0; index < error.password.length; index++) {
                    nots.push(error.password[index])
                }
            }
            if(error.detail !== undefined){
                nots.push(<List.Item title={error.detail} />)
            }
            console.log(error)
            setLoading(false)
        })
    }
    return(
        <ScrollView>
        <Title style={{
            textAlign:'center',
            marginVertical:20
        }}>Login</Title>
        {(notification)?(
            <Banner
                visible={Boolean(notification)}
                actions={[
                    {
                        label:'Close',
                        onPress:()=>{setNotification(null)}
                    }
                ]}>{notification.content}</Banner>
        ):null}
        <View style={{
            marginHorizontal: 20
        }}>
            <TextInput
                disabled={loading}
                label={'Username'}
                value={loginForm.username}
                style={{marginBottom:10}}
                onChangeText={(value:any)=>{
                    setLoginForm({
                        username:value,
                        password:loginForm.password
                    })
                }} />
            <TextInput
                disabled={loading}
                label={'Password'}
                value={loginForm.password}
                style={{marginBottom:10}}
                secureTextEntry={true}
                onChangeText={(value:any)=>{
                    setLoginForm({
                        username:loginForm.username,
                        password:value
                    })
                }} />
            <Button 
                disabled={loading}
                loading={loading}
                mode='contained'
                onPress={()=>{processLogin()}}>Login</Button>
        </View>
        </ScrollView>
    )
})

export default LoginScreen
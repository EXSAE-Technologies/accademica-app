const apiRoot = 'http://accademica.iitsar.com';

export function sendRequest(path,config,callback,errorCallback){
    fetch(`${apiRoot}${path}`,{
        ...config,
    }).then((res)=>{
        return res.json()
    }).then((response)=>{
        callback(response)
    }).catch((error)=>{
        errorCallback(error)
    })
}
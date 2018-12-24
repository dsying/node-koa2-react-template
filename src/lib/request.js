import axios from 'axios'
import { message } from 'antd'

const axiosConfig = {
    timeout: 5000
}

const _request = (params) => {
    return axios({...axiosConfig, ...params})
            .then(res => {
                const { success, data, err, code} = res.data
                if(code === 401){
                    window.location.href = '/'
                    return
                }
                if(success){
                    return data
                }
                throw err
            })
            .catch(err => {
                message.error(String(err || '网络异常'))
                throw err
            })
}
export default (param) => {
    const type = typeof param

    if(type === 'object' && type != null){
        return _request(param)
    }
}
import './assets/common.sass'

function changeTitle(){
    document.querySelector('#app').textContent = 'Parcel 打包包'
}

setTimeout(() => {
    changeTitle()
}, 2000);
import axios from 'axios'

const axiousInstatnce=axios.create({
    baseURL:'https://burgerbuilder-e29e8.firebaseio.com/'
})

export default axiousInstatnce
import axios from 'axios';
console.log("Environment = ",process.env.REACT_APP_ENV);
axios.defaults.baseURL =
process.env.REACT_APP_ENV === 'development'
        ? 'https://qa.m36ng.com/gateway/'//Test environment
        :'https://api.m36ng.com/gateway/'//Production environment
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.baseURL = 'https://qa.m36ng.com/gateway/'

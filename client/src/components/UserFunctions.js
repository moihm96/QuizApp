import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        admin: newUser.admin
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getList = () => {
  return axios
    .get('/questions/', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      return res.data
    })
}

export const getAnswers = (id) => {
  return axios
    .get(
      `/questions/${id}/answers`,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(res=> {
      console.log(res.data)
      return res.data
    })
}

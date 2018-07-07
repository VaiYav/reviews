import * as types from '../mutation-types'
import customerApi from '@/api/customer'
const state = {
  customer: {
    name: 'Вероника Ростова',
    role: 'Менеджер по продажам',
    description: 'Подберу для вас самые лучшие предложения. Мои услуги абсолютно бесплатны',
    img: 'customer.png',
    services: [
      {
        title: 'Ручное бронирование',
        service: 11,
        progress: 100
      },
      {
        title: 'Пакетные туры',
        service: 3,
        progress: 22
      },
      {
        title: 'Отели',
        service: 1,
        progress: 15
      }
    ],
    likes: 131,
    reviews: [
      {
        name: 'Самуил',
        date: '13 октября 2011',
        msg: 'Привет, Верунь! ниче себе ты крутая. фотка класс!!!!'
      },
      {
        name: 'Лилия Семёновна',
        date: '14 октября 2011',
        msg: 'Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами?'
      },
      {
        name: 'Лилия Семёновна',
        date: '14 октября 2011',
        msg: 'Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент?'
      }
    ]
  }
}

const getters = {
  customer: (state) => state.customer,
  services: (state) => state.customer.services,
  reviews: (state) => state.customer.reviews,
  qtyReviews: (state) => state.customer.reviews.length,
  lastReviews: (state) => state.customer.reviews.slice(-3),
  qtyServices: (state) => {
    let sum = 0
    for (let i = 0; i < state.customer.services.length; i++) {
      sum += state.customer.services[i].service
    }
    return sum
  }
}

const actions = {
  fetchCustomer ({state, commit}, params) {
    customerApi
      .fetchCustomer(params)
      .then(payload => commit(types.FETCH_CUSTOMER, payload))
  },
  sendReview ({state, commit}, payload) {
    commit(types.SEND_REVIEW, {payload})
  }
}

const mutations = {
  [types.FETCH_CUSTOMER] (state, payload) {
    state.customer = payload
  },
  [types.SEND_REVIEW] (state, {payload}) {
    console.log(payload)
    state.customer.reviews.push(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

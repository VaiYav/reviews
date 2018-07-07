<template lang="pug">
  div
    div.container
      div.customer
        div.customer-head
          img(:src="require(`@/assets/${customer.img}`)", alt="")
          div.info
            strong.name {{customer.name}}
            small.role {{customer.role}}
            span.desc {{customer.description}}
        div.services
          table
            tr.btm-border
              th(width="80%")
              th Услуг
            tr.content
              td
                div.progresses
                  progress-bar(
                    :value="service.progress",
                    v-for="service in customer.services",
                    :key="service.progress")
                    div.text {{service.title}}
              td.service
                div.progressbar(v-for="service in customer.services",
                :key="service.progress") {{service.service}}
            tr.btm-top
              th(width="80%")
                strong Всего
              th(style="text-align: center;") {{qtyServices}}
        div.reviews
          div.review-head
            div.switch-view-reviews
              a(href="#", @click.prevent="activeTab = 0", :class="{active: activeTab === 0}") Последние отзывы
              a(href="#", @click.prevent="activeTab = 1", :class="{active: activeTab === 1}") Все отзывы
            div.icon-review
              div.icon
                img(:src="require('@/assets/heart.png')")
                span {{customer.likes}}
              div.icon
                img(:src="require('@/assets/quest.png')")
                span {{qtyReviews}}
          div.review-container
            div.review(v-for="(review, key, index) in lastReviews", :key="index", :class="{active: activeTab === 0}", v-show="activeTab === 0")
              div.top-review
                strong.name {{review.name}}
                span.date {{review.date}}
              div.msg
                span {{review.msg}}
            div.review(v-for="(review, key, index) in reviews", :key="index", :class="{active: activeTab === 1}", v-show="activeTab === 1")
              div.top-review
                strong.name {{review.name}}
                span.date {{review.date}}
              div.msg
                span {{review.msg}}
    div.send-msg
      textarea(v-model="review", @keyup.ctrl.enter="sendReview")
      a(href="#", @click.prevent="sendReview") Написать консультанту


</template>

<script>
  import { mapGetters } from 'vuex'
  import progressBar from '@/components/ProgressBar.vue'
  export default {
    name: 'Customer',
    data () {
      return {
        name: 'Anonymous',
        review: '',
        activeTab: 0
      }
    },
    components: {
      progressBar
    },
    computed: {
      ...mapGetters(['customer', 'lastReviews', 'reviews', 'qtyServices', 'qtyReviews'])
    },
    methods: {
      sendReview () {
        let moment = require('moment')
        let payload = {
          name: this.name,
          date: moment().format('LL'),
          msg: this.review
        }
        if (this.review) {
          this.$store.dispatch('sendReview', payload)
          this.review = ''
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables";
  .container{
    padding: 15px 20px 0 20px;
    max-width: 720px;
    margin: auto;
  }
  .customer-head{
    display: flex;
    img{
      margin: 0 10px 0 0;
      z-index: 4;
    }
    .info{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .name{
        font-size: 16px;
        color: $text;
        margin: 0 0 10px 0;
      }
      .role{
        font-size: 12px;
        color: $lighttext;
        margin: 0 0 8px 0;
      }
      .desc{
        font-size: 14px;
        width: 100%;
        color: $text;
        background: $yellowbg;
        max-width: 305px;
        text-align: left;
        padding: 0 15px 0 30px;
        border: 1px solid $greyborder;
        border-radius: 4px;
        position: relative;
        left: -30px;
        line-height: 22px;
      }
    }
  }
  table{
    border-collapse: collapse;
    width: 100%;
    .btm-border{
      border-bottom: 1px solid $greyborder;
      height: 30px;
    }
    .content{
      height: 105px;
    }
    th{
      text-align: left;
    }
    .btm-top{
      border-top: 1px solid $greyborder;
      height: 40px;
    }
  }
  .review-head{
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px 0;
    .switch-view-reviews{
      a{
        color: $link;
        font-size: 14px;
        margin: 0 10px;
      }
      .active{
        font-weight: bold;
        font-size: 16px;
        text-decoration: none;
        color: $text;
        margin: 0;
      }
    }
    .icon-review{
      display: flex;
      .icon{
        margin: 0 10px;
        font-size: 12px;
        display: flex;
        align-items: center;
        img{
          margin: 0 5px;
        }
      }
    }
  }
  .review{
    text-align: left;
    margin:0 0 15px 0;
    .top-review{
      .name{
        font-size: 14px;
        margin: 0 10px 0 0;
      }
      .date{
        font-size: 11px;
        color: $lighttext;
      }
    }
    .msg{
      margin: 15px 0 0 0;
      padding: 20px 15px;
      background: $msgbg;
      border: 1px solid #cfcfcf;
      color: $text;
      font-size: 14px;
      position: relative;
      &:after{
        content: ' ';
        position: absolute;
        border: 5px solid transparent;
        border-left: 5px solid #f2fbff;
        border-bottom: 5px solid #f2fbff;
        display: block;
        width: 0;
        height: 0;
        top: -10px;
        left: 24px;
      }
      &:before{
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        top: -12px;
        left: 23px;
        border: 6px solid transparent;
        border-left: 6px solid #cfcfcf;
        border-bottom: 6px solid #cfcfcf;
      }
      span{
        word-break: break-word;
      }
    }
  }
  .review-container{
    max-height: 530px;
    overflow: auto;
    padding: 0 10px 0 0;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }
  .service{
    .progressbar{
      font-weight: bold;
    }
  }
  .services{
    margin: 0 0 0 130px;
  }
  .send-msg{
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f2f2f2;
    textarea{
      resize: none;
      height: 64px;
      margin: 0 0 25px 0;
      width: 90%;
      max-width: 720px;
    }
    a{
      background: $btnyellow;
      font: bold 16px/20px 'PT Sans', sans-serif;
      text-decoration: none;
      padding: 15px 65px;
      border-radius: 25px;
      color: $text;
      transition: all .3s linear;
      &:hover{
        background: $progressSuccess;
      }
    }
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
  td{
    padding: 0;
  }
  .progresses{
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    padding: 0;
  }
  .progressbar{
    background: transparent;
    margin: 0 0 2px 0;
    border-radius: 2px;
    &:last-child{
      margin: 0;
    }
  }
  .text {
    position: relative;
    z-index: 5;
    color: $text;
    text-align: left;
    padding: 0 0 0 8px;
    font-size: 13px;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>

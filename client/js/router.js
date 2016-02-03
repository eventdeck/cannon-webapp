/*global app*/
var Router = require('ampersand-router')

var HomePage = require('./pages/home')

var PageNotFound = require('./pages/notFound')

var Achievements = require('./pages/achievements/list')
var AchievementViewPage = require('./pages/achievements/view')

var LoginPage = require('./pages/auth/login')

var Partners = require('./pages/partners/list')

var Redeem = require('./pages/redeem/view')

var Sessions = require('./pages/sessions/list')
var SessionViewPage = require('./pages/sessions/view')

var Speakers = require('./pages/speakers/list')
var SpeakerViewPage = require('./pages/speakers/view')

var UserViewPage = require('./pages/users/view')
var MePage = require('./pages/users/me')
var UserEditPage = require('./pages/users/edit')

var log = require('bows')('router')
var fenixAuth = require('./auth/fenix')
var qs = require('qs')

var WebAppRouter = Router.extend({
  routes: {
    '': 'home',
    ':event': 'event',
    ':event/achievements': 'achievements',
    ':event/achievements/:id': 'achievementView',
    'auth/login?:query': 'fenixLogin',
    'auth/login': 'login',
    ':event/partners': 'partners',
    'partners/:id': 'companyView',
    'redeem/:id': 'redeemCode',
    ':event/sessions': 'sessions',
    ':event/sessions/:id': 'sessionView',
    ':event/speakers': 'speakers',
    'users/:id': 'userView',
    'me': 'me',
    'me/edit': 'meEdit',
    'speakers/:id': 'speakerView',
    // 'stream': 'streamView',
    'sponsor': 'sponsor',
    '(*path)': 'catchAll'
  },

  execute: function (callback, args, name) {
    window.ga('send', 'pageview', window.location.pathname)

    window.scrollTo(0, 0)

    return Router.prototype.execute.apply(this, [callback, args, name])
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    // this.trigger('page', new HomePage({
    //   model: app.me
    // }))
    window.location = '/'
  },

  event: function (event) {
    this.trigger('page', new HomePage({
      event: event,
      model: app.me
    }))
  },

  achievements: function (event) {
    this.trigger('page', new Achievements({
      event: event,
      collection: app.achievements
    }))
  },

  achievementView: function (event, id) {
    this.trigger('page', new AchievementViewPage({
      event: event,
      id: id
    }))
  },

  me: function () {
    if (!app.me || !app.me.authenticated) {
      return app.navigateToLogin()
    }

    this.trigger('page', new MePage({
      model: app.me
    }))
  },

  userView: function (id) {
    this.trigger('page', new UserViewPage({
      id: id
    }))
  },

  meEdit: function () {
    if (!app.me.authenticated) {
      return app.navigateToLogin()
    }

    this.trigger('page', new UserEditPage({
      model: app.me
    }))
  },

  login: function () {
    // if(app.me.authenticated) {
    //   return this.redirectTo('/')
    // }

    this.trigger('page', new LoginPage({
      model: app.me
    }))
  },

  fenixLogin: function (args) {
    if (window.sessionStorage['cannon-fenix-add'] === 'true') {
      this.me()
    } else {
      this.login()
    }
    args = qs.parse(args)
    if (args && Object.keys(args)[0] === 'code') {
      fenixAuth.requestAccessToken(args.code)
    }
  },

  partners: function (event) {
    this.trigger('page', new Partners({
      event: event,
      collection: app.partners
    }))
  },

  redeemCode: function (event, id) {
    if (!app.me.authenticated) {
      return app.navigateToLogin()
    }

    this.trigger('page', new Redeem({
      event: event,
      id: id
    }))
  },

  sessions: function (event) {
    this.trigger('page', new Sessions({
      event: event,
      collection: app.sessions
    }))
  },

  sessionView: function (event, id) {
    this.trigger('page', new SessionViewPage({
      event: event,
      id: id
    }))
  },

  sponsor: function () {
    window.location = '/sponsor'
  },

  speakers: function (event) {
    this.trigger('page', new Speakers({
      event: event,
      collection: app.speakers.current
    }))
  },

  speakerView: function (id) {
    this.trigger('page', new SpeakerViewPage({
      id: id
    }))
  },

  catchAll: function () {
    this.trigger('page', new PageNotFound())
  }
})

module.exports = WebAppRouter

import React from 'react'
import Helmet from 'react-helmet'

import cls from './layout.module.scss'

export default ({ children }) => (
  <div className={cls.container}>
    <Helmet>
      <title>CNOTE</title>
      <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js" />
      <script src="//unpkg.com/valine/dist/Valine.min.js" />
    </Helmet>
    <section className={cls.content}>{children}</section>
    <aside>
      <section className={cls.profile}>
        <img src="/profile.png" alt="profile" />
        <div>I am a ...... developer in Google........</div>
      </section>
      <section className={cls.contact}>
        <h4>Contact</h4>
        <div>
          <a href="mailto:zhchaozju@gmail.com">Email</a>
          <a href="https://twitter.com/zhchaozju" target="_blank">
            Twitter
          </a>
          <a href="https://github.com/hzzheng" target="_blank">
            Github
          </a>
        </div>
      </section>
    </aside>
  </div>
)

import React from 'react'
import Helmet from 'react-helmet'

import cls from './layout.module.scss'

export default ({ children }) => (
  <div>
    <div className={cls.container}>
      <Helmet>
        <title>CNOTE</title>
        <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js" />
        <script src="//unpkg.com/valine/dist/Valine.min.js" />
      </Helmet>
      <section className={cls.content}>{children}</section>
      <aside>
        <section className={cls.profile}>
          <img src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/avatar/profile4.jpg?q-sign-algorithm=sha1&q-ak=AKIDhDE2nJirGpiW8wps53iQWMyMXhc54ouh&q-sign-time=1550501896;1550502796&q-key-time=1550501896;1550502796&q-header-list=&q-url-param-list=&q-signature=5abb80d42f16ce6564df9d0903840530911544d2" alt="profile" />
          <div>我是郑超，前端开发，喜欢阅读和写代码，偶尔翻译技术文章。可以通过下面👇的方式联系我</div>
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
    <footer>
      郑超的独立博客 © 2019 Powered By GatsbyJS
    </footer>
  </div>
)

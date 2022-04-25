import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import _ from 'lodash'

import cls from './layout.module.scss'

export default ({ children, data }) => (
  <div className={cls.page}>
    <header>
      <div className={cls.nav}>
        <Link to="/">
          {/* <span className="iconfont icon-home" /> */}
          以终为始，知行合一
        </Link>
        <div className={cls.links}>
          {/* <a href="/abount-me">About Me</a> */}
          <a href="/weekly">Reading Weekly</a>
          <a href="/ts-evolution">Typescript Evolution</a>
        </div>
      </div>
    </header>
    <div className={cls.container}>
      <Helmet>
        <title>CNOTE</title>
        <link
          rel="shortcut icon"
          href="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          href="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/iconfont.css"
        />
        <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js" />
        <script src="//unpkg.com/valine/dist/Valine.min.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <section className={cls.content}>{children}</section>
      {data && (
        <aside>
          <section className={cls.profile}>
            <img
              src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/profile.jpg"
              alt="profile"
            />
            <div className={cls.desc}>欢迎加微信好友沟通</div>
          </section>
          <section className={cls.contact}>
            {/* <h4>Contact</h4> */}
            <div class={cls.qrcode}>
              <img
                src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.jpeg"
                alt="微信二维码"
              />
            </div>
            {/* <div>
              <a href="mailto:zhchaozju@gmail.com">Email</a>
              <a href="https://twitter.com/zhchaozju" target="_blank">
                Twitter
              </a>
              <a href="https://github.com/hzzheng" target="_blank">
                Github
              </a>
            </div> */}
          </section>
          <section className={cls.search}>
            {/* <div className={cls.searchwrapper}>
              <input placeholder="搜索文章..." />
              <span className="iconfont icon-search" />
            </div> */}
            <ul className={cls.tags}>
              {data.allMarkdownRemark.group.map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${_.kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue}
                    {/* {tag.totalCount} */}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {/* <section className={cls.qrcode}>
            <div>
              欢迎关注公众号
              <br />
              [前端每周翻译]
            </div>
            <img src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/qrcode.bmp" alt="我的微信公众号"/>
          </section> */}
        </aside>
      )}
    </div>
    <footer>郑超的独立博客</footer>
  </div>
)

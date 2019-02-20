import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import _ from 'lodash'

import cls from './layout.module.scss'

export default ({ children, data }) => (
  <div>
    <header>
      <div className={cls.nav}>
        <Link to="/"><span className="iconfont icon-home" /></Link>
        <div className={cls.links}>
          {/* <a href="/doc/gatsbyjs">GatsbyJS 教程</a> */}
        </div>
      </div>
    </header>
    <div className={cls.container}>
      <Helmet>
        <title>CNOTE</title>
        <link rel="stylesheet" href="/iconfont.css" />
        <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js" />
        <script src="//unpkg.com/valine/dist/Valine.min.js" />
      </Helmet>
      <section className={cls.content}>{children}</section>
      <aside>
        <section className={cls.profile}>
          <img src="/profile.jpg" alt="profile" />
          <div className={cls.desc}>
            我叫郑超，前端开发，喜欢阅读和写代码，偶尔翻译和写作技术文章。可以通过下面
            <span role="img" aria-label="下面">
              👇
            </span>
            的方式联系我
          </div>
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
        <section className={cls.search}>
          <div className={cls.searchwrapper}>
            <input placeholder="搜索文章..." />
            <span className="iconfont icon-search" />
          </div>
          <ul className={cls.tags}>
            {data.allMarkdownRemark.group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${_.kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue}
                  {/* {tag.totalCount} */}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
    <footer>郑超的独立博客 © 2019 Powered By GatsbyJS</footer>
  </div>
)
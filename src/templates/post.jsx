import React, { PureComponent } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import cls from './templates.module.scss'

const API_ID = 'r7PmfMicPGJRTPMX7AeAFxIK-gzGzoHsz'
const API_KEY = 'FCsB1Kpp0h1wOqFV2Wh6mVki'

class postPage extends PureComponent {
  componentDidMount() {
    const { data: { markdownRemark } } = this.props;
    const { fields: { slug } } = markdownRemark;

    setTimeout(() => {
      // 等待依赖的JS加载完成
      if (window.Valine) {
        new Valine({
          el: '#comments',
          appId: API_ID,
          appKey: API_KEY,
          placeholder: '可匿名评论...',
          path: slug,
        })
      }
    }, 3000);
  }

  render() {
    const { data } = this.props
    const post = data.markdownRemark
    const {
      frontmatter: { title, date, origin }
    } = post

    return (
      <Layout data={data}>
        <div className={cls.post}>
          <h2>{title}</h2>
          <small>{date}</small>
          {origin && (
            <div className={cls.origin}>
              该文翻译自：
              <a href={origin} target="_blank">
                {origin}
              </a>
            </div>
          )}
          <div className={cls.content} dangerouslySetInnerHTML={{ __html: post.html }} />
          <div id="comments" />
        </div>
      </Layout>
    )
  }
}

export default postPage

export const query = graphql`
  query($slug: String!) {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        origin
      }
      fields {
        slug
      }
    }
  }
`

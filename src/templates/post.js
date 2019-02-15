import React, { PureComponent } from 'react';
import { graphql } from 'gatsby'
import Valine from 'valine';
import Layout from '../components/layout';
import cls from './templates.module.scss'

const API_ID = 'r7PmfMicPGJRTPMX7AeAFxIK-gzGzoHsz'
const API_KEY = 'FCsB1Kpp0h1wOqFV2Wh6mVki'

class postPage extends PureComponent {
  componentDidMount() {
    new Valine({
      el: '#comments',
      appId: API_ID,
      appKey: API_KEY,
      placeholder: '可匿名评论...'
    })
  }

  render() {
    const { data } = this.props;
    const post = data.markdownRemark
    const { frontmatter: { title, date, origin } } = post;

    return (
      <Layout>
        <div className={cls.post}>
          <h2>{title}</h2>
          <small>{date}</small>
          {
            origin && (
              <div className={cls.origin}>
                该文翻译自：
                <a href={origin} target="_blank">原文链接</a>
              </div>
            )
          }
          <div className={cls.content} dangerouslySetInnerHTML={{ __html: post.html }} />

          <div id="comments" />
        </div>
      </Layout>
    );
  }
}

export default postPage;

export const query = graphql`
  query($slug: String!) {
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

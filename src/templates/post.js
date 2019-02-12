import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout';
import cls from './templates.module.scss'

export default ({ data }) => {
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
      </div>
    </Layout>
  )
}

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

import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import cls from './templates.module.scss'


const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  const tagHeader = `${tag.toUpperCase()}`

  return (
    <Layout>
      <div className={cls.tag}>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node: { frontmatter, fields } }) => {
            const { title, date } = frontmatter
            const { slug } = fields
            return (
              <li key={slug}>
                <Link to={slug}>{`${title} [${date}]`}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt(pruneLength: 140, truncate: true)
        }
      }
    }
  }
`

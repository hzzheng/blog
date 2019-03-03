import React from 'react'
import { Link, graphql } from 'gatsby'
import cls from './templates.module.scss'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  const tagHeader = `${tag}:`

  return (
    <div className={cls.tag}>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { title } = node.frontmatter
          const { slug } = node.fields
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

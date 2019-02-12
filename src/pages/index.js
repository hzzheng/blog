import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout';
import cls from './page.module.scss'

export default ({ data }) => {
  const { allMarkdownRemark } = data
  return (
    <Layout>
      <div className={cls.list}>
        {
          allMarkdownRemark.edges.map(({ node }) => {
            const {
              frontmatter, excerpt, fields, id
            } = node

            return (
              <div key={id}>
                <h3>
                  <Link to={fields.slug}>{frontmatter.title}</Link>
                  <span className={cls.date}>{frontmatter.date}</span>
                </h3>
                <p className={cls.excerpt}>{excerpt}</p>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

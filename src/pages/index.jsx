import React, { PureComponent } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import cls from './page.module.scss'

const PAGE_SIZE = 6

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0
    }
  }

  getPaginationData() {
    const {
      data: {
        allMarkdownRemark: { edges }
      }
    } = this.props
    const pageCount = Math.ceil(edges.length / PAGE_SIZE)
    const indexs = []
    let i = 0
    while (i < pageCount) {
      i += 1
      indexs.push(i)
    }

    return indexs
  }

  handlePagination(currentPage) {
    this.setState({
      currentPage
    })
  }

  renderPagination() {
    const indexs = this.getPaginationData()
    return (
      <div className={cls.pagination}>
        <span>Previous</span>
        <ul>
          {indexs.map((c, index) => (
            <li
              key={c}
              onClick={() => this.handlePagination(index)}
              onKeyDown={() => {}}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <span>Next</span>
      </div>
    )
  }

  render() {
    const {
      data: { allMarkdownRemark }
    } = this.props
    const { currentPage } = this.state

    return (
      <Layout>
        <div className={cls.list}>
          {allMarkdownRemark.edges.filter((_, index) => {
            const skip = currentPage * PAGE_SIZE
            return index >= skip && index < skip + PAGE_SIZE
          }).map(({ node }) => {
            const { frontmatter, excerpt, fields, id } = node

            return (
              <div key={id}>
                <h3>
                  <Link to={fields.slug}>{frontmatter.title}</Link>
                </h3>
                <div className={cls.excerpt}>{excerpt}</div>
                <div className={cls.date}>{frontmatter.date}</div>
              </div>
            )
          })}
          {this.renderPagination()}
        </div>
      </Layout>
    )
  }
}

export default Home

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
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

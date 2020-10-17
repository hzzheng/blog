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

  getFilteredPosts() {
    const {
      data: { allMarkdownRemark }
    } = this.props
    const { currentPage } = this.state

    const posts = allMarkdownRemark.edges.filter((_, index) => {
      const skip = currentPage * PAGE_SIZE
      return index >= skip && index < skip + PAGE_SIZE
    })
    return posts
  }

  getPaginationData() {
    const {
      data: {
        allMarkdownRemark: { edges }
      }
    } = this.props
    const count = Math.ceil(edges.length / PAGE_SIZE)
    const indexs = []
    let i = 0
    while (i < count) {
      i += 1
      indexs.push(i)
    }

    return {
      count,
      indexs
    }
  }

  handlePagination = (currentPage) => {
    this.setState({
      currentPage
    })
  }

  handlePrevPagination = () => {
    const { currentPage } = this.state
    if (currentPage > 0) {
      this.handlePagination(currentPage - 1)
    }
  }

  handleNextPagination = () => {
    const { currentPage } = this.state
    const { count } = this.getPaginationData()

    if (currentPage < count - 1) {
      this.handlePagination(currentPage + 1)
    }
  }

  renderPagination() {
    const { indexs, count } = this.getPaginationData()
    const { currentPage } = this.state
    return (
      <div className={cls.pagination}>
        <button
          className={currentPage === 0 ? cls.disabled : undefined}
          type="button"
          onClick={this.handlePrevPagination}
        >
          Prev
        </button>
        <ul>
          {indexs.map((c, index) => (
            <li
              key={c}
              className={index === currentPage ? cls.active : undefined}
              onClick={() => this.handlePagination(index)}
              onKeyDown={() => {}}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <button
          className={currentPage === count - 1 ? cls.disabled : undefined}
          type="button"
          onClick={this.handleNextPagination}
        >
          Next
        </button>
      </div>
    )
  }

  render() {
    const { data } = this.props
    return (
      <Layout data={data}>
        <div className={cls.list}>
          {this.getFilteredPosts().map(({ node }, index) => {
            const { frontmatter, excerpt, fields, id } = node

            return (
              <div key={id}>
                <h3>
                  <Link to={fields.slug}>
                    【第
                    {index + 1}
                    篇】
                    {frontmatter.title}
                  </Link>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: ["ts-evolution"] } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
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

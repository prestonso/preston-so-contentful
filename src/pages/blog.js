import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulArticles.edges')

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>
          Blog
        </div>
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li>
                  <div className={styles.preview}>
                    <h3 className={styles.previewTitle}>
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <small>{article.originalPublicationDate}</small>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: article.description.childMarkdownRemark.html,
                      }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulArticle {
      edges {
        node {
          title
          slug
          originalPublicationDate
          body {
            nodeType
          }
        }
      }
    }
  }
`

import React from 'react'
import Image from 'gatsby-image'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import Layout from '../components/layout'
import SEO from '../components/seo'

const SKEW_DEGREES = -1

const showArticlePreview = article => {
  const title = article.frontmatter.title
  return (
    <article key={article.fields.slug} className="text-xl mb-8 last:mb-0">
      <header>
        <h4 className="text-2xl font-medium hover:text-blog-700">
          <Link to={article.fields.slug}>{title}</Link>
        </h4>
      </header>
      <section className="text-gray-600 text-lg">
        <p
          dangerouslySetInnerHTML={{
            __html: article.frontmatter.description || article.excerpt,
          }}
        />
      </section>
      <Link to={article.fields.slug} className="hover:text-blog-700 text-lg text-gray-700">
        Read <FiArrowRight className="inline" size="1em" />
      </Link>
    </article>
  )
}

const Home = ({ location }) => {
  // Get image
  const data = useStaticQuery(graphql`
    query {
      # Get social handles
      site {
        siteMetadata {
          social {
            linkedin
          }
        }
      }
      # Get the avatar image
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
      # Get last posts preview
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 4) {
        edges {
          node {
            fields {
              slug
            }
            timeToRead
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `)

  const articles = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO title="Rémi de Juvigny" />
      {/* Big colorful header */}
      <header
        className="bg-teal-100 overflow-hidden -mt-5 pt-20"
        style={{
          transform: `skewY(${SKEW_DEGREES}deg)`,
        }}
      >
        <div style={{ transform: `skewY(${-SKEW_DEGREES}deg)` }}>
          <div className="container mx-auto">
            <div className="flex flex-row justify-between py-12">
              <div className="text-teal-900 text-3xl font-medium flex flex-col justify-center">
                {/* <p>Hello there! Rémi here.</p> */}
                <h2>I'm a Product Developer from France.</h2>
                <p>I build apps users won't hate, with tools I love.</p>
              </div>
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={`Rémi says hello`}
                className="rounded-full mr-16"
              />
            </div>
          </div>
        </div>
      </header>
      {/* Writing section */}
      <section className="container flex flex-row-reverse justify-between mx-auto text-gray-800 items-baseline">
        {/* Description column */}
        <div className="w-5/12 ml-12 block" style={{ transform: 'translateY(4rem)' }}>
          <p className="uppercase tracking-wide text-blog-500 font-semibold">Blog</p>
          <h3 className="text-4xl leading-tight font-semibold">I write down what I learn</h3>
          <p className="text-gray-600 mt-4">
            Code is a precious resource. I write about about how to use it efficiently, and how to
            avoid using it at all.
          </p>
          <Link
            to="/blog"
            className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-medium rounded-lg inline-block hover:shadow"
          >
            View all articles <FiArrowRight className="inline" size="1em" />
          </Link>
        </div>
        {/* Main content */}
        <div className="float-right w-8/12 py-6 px-6 bg-white rounded-lg shadow-lg relative -mt-6">
          {articles.map(({ node }) => showArticlePreview(node))}
        </div>
      </section>
    </Layout>
  )
}

export default Home

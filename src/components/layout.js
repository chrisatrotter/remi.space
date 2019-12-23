import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../layout.css'

const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Articles',
    path: '/blog',
  },
  {
    title: 'Portfolio',
    path: '/folio',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
]

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPage = location.pathname === rootPath

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const { title, description } = data.site.siteMetadata

  const navbar = (
    <nav
      className={`container mx-auto py-4 flex flex-row justify-between ${
        isRootPage ? 'text-white' : 'text-black'
      }`}
    >
      <Link to={`/`}>
        {isRootPage ? (
          // Site title is the main heading on homepage
          <h1 className="inline-block font-bold text-xl">{title}</h1>
        ) : (
          // Site title is a secondary heading on other pages
          <h3 className="inline-block font-bold text-xl">{title}</h3>
        )}
        {!isRootPage && (
          <span className="text-gray-500 text-sm hidden sm:inline"> — {description}</span>
        )}
      </Link>
      <ul className="flex flex-row">
        {navLinks.map(_navLink => (
          <li
            key={_navLink.path}
            className={`mr-8 last:mr-0 font-medium ${
              isRootPage
                ? 'border-white hover:text-teal-100'
                : 'border-teal-600 hover:text-teal-600'
            } ${_navLink.path === location.pathname ? 'border-b-2' : 'border-b-0'}`}
          >
            <Link to={_navLink.path}>{_navLink.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Top section */}
      <div className="flex-1">
        {navbar}
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <footer className="bg-green-200 text-green-900 py-3">
        <div className="container mx-auto">
          © {new Date().getFullYear()} • built with React & Tailwind CSS
        </div>
      </footer>
    </div>
  )
}

export default Layout

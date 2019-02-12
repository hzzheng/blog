import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import cls from './layout.module.scss'

export default ({ children }) => (
  <div className={cls.app}>
    <Helmet>
      <title>CNOTE</title>
    </Helmet>
    <header>
      <h1>
        <Link to="/" className={cls.logo}>
          CNOTE
        </Link>
      </h1>
      <ul className={cls.nav}>
        {/* <li>
          <Link to="/" exact {...active}>
            HOME
          </Link>
        </li> */}
        {/* <li>
          <Link to="/contact" {...active}>
            Contact
          </Link>
        </li> */}
      </ul>
    </header>
    {children}
  </div>
)

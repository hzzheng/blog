import React from 'react'
import Helmet from 'react-helmet'

import cls from './layout.module.scss'

export default ({ children }) => (
  <div className={cls.container}>
    <Helmet>
      <title>CNOTE</title>
    </Helmet>
    <section className={cls.content}>
      {children}
    </section>
    <aside>
      <section>
        hello
      </section>
    </aside>
  </div>
)

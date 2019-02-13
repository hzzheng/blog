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
      <section className={cls.profile}>
        <img src="/profile.png" alt="profile" />
        <div>
          I am a ...... developer in Google........
        </div>
      </section>
    </aside>
  </div>
)

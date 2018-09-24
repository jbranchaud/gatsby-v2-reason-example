import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Hello from '../components/Hello.bs.js'
import HelloWorld from '../components/HelloWorld.bs.js'

const IndexPage = () => (
  <Layout>
    <h1>Hi people!!</h1>
    <HelloWorld />
    <Hello name="Bob" />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

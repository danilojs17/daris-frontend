import React from 'react'
import NextHead from 'next/head'

export const Head = () => {
  return (
    <NextHead>
      <title>Daris</title>
      <meta key="title" content={'daris'} property="og:title" />
      <meta content={'daris description'} property="og:description" />
      <meta content={'daris description'} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  )
}

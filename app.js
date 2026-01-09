require('dotenv').config()

const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const logger = require('morgan')

const app = express()
const path = require('path')
const port = 3000

app.use(errorHandler())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')

const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions: { req }
  })
}

const handleLinkResolver = (doc) => {
  if (doc.type === 'product') {
    return `/detail/${doc.slug}`
  }

  if (doc.type === 'collections') {
    return '/collections'
  }

  if (doc.type === 'about') {
    return '/about'
  }
  return '/'
}

app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver

  res.locals.Numbers = index => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }

  res.locals.PrismicDOM = PrismicDOM

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  const meta = await api.getByType('meta')
  const preloader = await api.getSingle('preloader')
  const navigation = await api.getSingle('navigation')

  return {
    meta, navigation, preloader
  }
}

app.get('/', async (req, res) => {
  const api = initApi(req)
  const home = await api.getSingle('home')
  const defaults = await handleRequest(api)

  const { results: collections } = await api.getByType('collection', { fetchLinks: 'product.image' })
  res.render('pages/home', { ...defaults, collections, home })
})

app.get('/about', async (req, res) => {
  try {
    const api = initApi(req)
    const response = await api.getByType('about')
    const defaults = await handleRequest(api)

    const about = response.results[0]

    const firstGallery = about.data.gallery || []

    const gallerySlice = about.data?.body
      ?.filter(slice => slice.slice_type === 'gallery')
      .flatMap(slice => slice.items || []) || []

    const gallery = [...firstGallery, ...gallerySlice]

    res.render('pages/about', { ...defaults, about, gallery, firstGallery })
  } catch (error) {
    console.error('PRISMIC ERROR:', error)
    res.status(500).send('Server error: ' + error.message)
  }
})

app.get('/detail/:uid', async (req, res) => {
  const api = initApi(req)
  const defaults = await handleRequest(api)

  const product = await api.getByUID('product', req.params.uid, { fetchLinks: 'collection.title' })

  res.render('pages/detail', { ...defaults, product })
})

app.get('/collections', async (req, res) => {
  const api = initApi(req)
  const defaults = await handleRequest(api)

  const home = await api.getSingle('home')
  const { results: collections } = await api.getByType('collection', { fetchLinks: 'product.image' })

  res.render('pages/collections', { ...defaults, collections, home })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

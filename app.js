require('dotenv').config()

const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const logger = require('morgan')

const app = express()
const path = require('path')
const port = 3000
const UAParser = require('ua-parser-js')

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
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  console.log(res.locals.isDesktop, res.locals.isPhone, res.locals.isTablet)

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
  const home = await api.getSingle('home')
  const meta = await api.getByType('meta')
  const preloader = await api.getSingle('preloader')
  const navigation = await api.getSingle('navigation')
  const { results: collections } = await api.getByType('collection', { fetchLinks: 'product.image' })

  const response = await api.getByType('about')

  const about = response.results[0]
  const firstGallery = about.data.gallery || []
  const gallerySlice = about.data?.body
    ?.filter(slice => slice.slice_type === 'gallery')
    .flatMap(slice => slice.items || []) || []

  const gallery = [...firstGallery, ...gallerySlice]

  const assets = []

  home.data.gallery.forEach(item => {
    assets.push(item.image.url)
  })

  gallery.forEach(item => {
    assets.push(item.image.url)
  })

  collections.forEach(collection => {
    collection.data.products.forEach(item => {
      assets.push(item.products_product.data.image.url)
    })
  })

  return {
    assets, home, meta, navigation, preloader, collections, about, gallery, firstGallery
  }
}

app.get('/', async (req, res) => {
  const api = initApi(req)
  const defaults = await handleRequest(api)
  res.render('pages/home', { ...defaults })
})

app.get('/about', async (req, res) => {
  try {
    const api = initApi(req)
    const defaults = await handleRequest(api)

    res.render('pages/about', { ...defaults })
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

  res.render('pages/collections', { ...defaults })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

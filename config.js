let address = {}
if (process.env.NODE_ENV === 'development') {
  address = {
    host: 'localhost',
    port: 80
  }
} else {
  address = {
    host: '39.106.108.222',
    port: 80
  }
}

module.exports = {
  address
}

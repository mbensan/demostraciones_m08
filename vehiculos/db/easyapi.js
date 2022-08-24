const { Tipo, Vehiculo } = require('./models.js')

class EasyApi {
  constructor (model, router, prefix) {
    this.model = model
    this.router = router
    this.prefix = prefix
  }
}

const api = new EasyApi(Tipo)

console.log(Tipo.rawAttributes);
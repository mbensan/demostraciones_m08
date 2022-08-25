const { Tipo, Vehiculo } = require('./models.js')

class EasyApi {
  constructor (model, router, prefix) {
    this.model = model
    this.router = router
    this.prefix = prefix

    setFindAll()
  }

  setFindAll() {
    this.router.get(`/api/${prefix}`, async (req, res) => {
      const elems = await this.model.findAll()
      res.json(elems)
    })
  }

  
}

//const api = new EasyApi(Tipo)
//console.log(Tipo.rawAttributes);

module.exports = EasyApi

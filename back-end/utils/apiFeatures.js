class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filtragem avançada
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (correspondencia) => `$${correspondencia}`
    );

    // A consulta começa no Produto.find(...),
    // mas ela ainda não é executada imediatamente
    // Aqui a consulta é refinada com esse find.
    this.query = this.query.find(JSON.parse(queryStr));

    //Retornamos o objeto por inteiro para podermos encadear métodos!
    return this;
  }

  sort() {
    // Note de req.query é a queryString e query é a consulta em si (Produto.find())
    // Ou seja, this.queryString.sort é como se fosse req.query.sort
    // Verifica se na string da query há a propriedade sort.
    if (this.queryString.sort) {
      let desc = this.queryString.sort.startsWith("-");
      let ordenacao = desc
        ? this.queryString.sort.slice(1)
        : this.queryString.sort;
      this.query = this.query.sort({
        [ordenacao]: desc ? -1 : 1,
      });
    } else {
      this.query = this.query.sort({ titulo: 1 });
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

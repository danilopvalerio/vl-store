const Produto = require("../models/produtoModel");

exports.searchProdutos = async (req, res) => {
  try {
    const { query } = req.params; // Pegamos a query da URL
    const page = req.query.page * 1 || 1; // Página atual, default: 1
    const limit = req.query.limit * 1 || 5; // Limite de itens por página, default: 5
    const skip = (page - 1) * limit; // Quantidade de itens a serem pulados (para paginação)

    // Pesquisa nas propriedades do produto e nas variações
    let produtos = Produto.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { categoria: { $regex: query, $options: "i" } },
        { material: { $regex: query, $options: "i" } },
        { genero: { $regex: query, $options: "i" } },
        {
          variacoes: {
            $elemMatch: {
              variacao: { $regex: query, $options: "i" }, // Busca na propriedade 'variacao' do array
            },
          },
        },
      ],
    })
      .skip(skip)
      .limit(limit); // Adiciona a paginação na consulta

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      produtos = produtos.select(fields);
    } else {
      produtos = produtos.select("-__v");
    }

    // Executa a query
    produtos = await produtos;

    // Contagem total de produtos que correspondem à pesquisa (para calcular o total de páginas)
    const totalProdutos = await Produto.countDocuments({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { categoria: { $regex: query, $options: "i" } },
        { material: { $regex: query, $options: "i" } },
        { genero: { $regex: query, $options: "i" } },
        {
          variacoes: {
            $elemMatch: {
              variacao: { $regex: query, $options: "i" },
            },
          },
        },
      ],
    });

    if (produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado." });
    }

    // Retorna os produtos encontrados e a quantidade total
    res.status(200).json({
      produtos,
      totalProdutos,
      totalPaginas: Math.ceil(totalProdutos / limit), // Calcula o total de páginas
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.lerProdutos = async (req, res) => {
  try {
    // Filtramos a query caso necessário.
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filtragem avançada
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (correspondencia) => `$${correspondencia}`
    );

    // Fazemos a leitura.
    let produtos = Produto.find(JSON.parse(queryStr));

    //Fazemos a ordenação caso a propriedade exista
    if (req.query.sort) {
      let ordenacao = req.query.sort.startsWith("-")
        ? req.query.sort.slice(1)
        : req.query.sort;
      produtos = produtos.sort({
        [ordenacao]: ordenacao.startsWith("-") ? -1 : 1,
      });
    } else {
      produtos = produtos.sort({ titulo: 1 });
    }

    // Tratamento caso haja campos a serem filtrados
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      produtos = produtos.select(fields);
    } else {
      produtos = produtos.select("-__v");
    }

    // Paginação
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    produtos = produtos.skip(skip).limit(limit);

    // Executa a query
    produtos = await produtos;

    // Verifica se existem produtos para a página solicitada
    if (produtos.length === 0) {
      return res.status(404).json({
        message: "Nenhum produto encontrado para esta página.",
        pagina: page,
      });
    }

    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json({
      status: "sucess",
      produtoAdicionado: produto,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.contarProdutos = async (req, res) => {
  try {
    const totalProdutos = await Produto.countDocuments();

    res.status(200).json({
      total: totalProdutos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.lerProdutoPorID = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca pelo _id do MongoDB
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    // Retorna o produto encontrado
    res.status(200).json({
      status: "sucess",
      produto: produto,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o produto.", error });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByIdAndUpdate(
      id, // Filtro pelo _id
      req.body, // Dados para atualizar
      { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
    );
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({
      status: "sucess",
      produtoAtualizado: produto,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removerProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({
      message: "Produto removido com sucesso",
      produto: produto,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verificaRef = async (req, res) => {
  const ref = req.params.ref;
  try {
    const produto = await Produto.findOne({ ref });
    res.json({ existe: !!produto }); // Retorna true se o produto existir, caso contrário false
  } catch (error) {
    res.status(500).json({ message: erro.message });
  }
};

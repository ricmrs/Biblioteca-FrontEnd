export const parseAutor = {
  toJSON(autor: IAutorDetalhe): IAutorDetalheJson {
    return ({ ...autor, livros: autor.livros.map(livro => ({ ...livro, dataPublicacao: livro.dataPublicacao.toJSON() })) })
  },
  fromJSON(autorJson: IAutorDetalheJson): IAutorDetalhe {
    return ({ ...autorJson, livros: autorJson.livros.map(livro => ({ ...livro, dataPublicacao: new Date(livro.dataPublicacao) })) })
  }
}

export const parseLivro = {
  toJSON(livro: ILivroDetalhe): ILivroDetalheJson {
    return ({ ...livro, dataPublicacao: livro.dataPublicacao.toJSON() })
  },
  fromJSON(livroJson: ILivroDetalheJson): ILivroDetalhe {
    return ({ ...livroJson, dataPublicacao: new Date(livroJson.dataPublicacao) })
  }
}

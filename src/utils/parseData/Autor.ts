export function parseAutorDetalhe(data: IAutorDetalheJson): IAutorDetalhe {
  return (
    {
      ...data,
      livros: data.livros.map(livro => ({...livro, dataPublicacao: new Date(`${livro.dataPublicacao}T00:00`)}))
    }
  )
}

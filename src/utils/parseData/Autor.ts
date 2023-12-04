interface IAutorDetalheJSON extends Omit<IAutorDetalhe, 'livros'>{
  livros: ILivroPorAutorJSON[];
}
interface ILivroPorAutorJSON extends Omit<ILivroPorAutor, 'dataPublicacao'> {
  dataPublicacao: string;
}

export function parseAutorDetalhe(data: IAutorDetalheJSON): IAutorDetalhe {
  return (
    {
      ...data,
      livros: data.livros.map(livro => ({...livro, dataPublicacao: new Date(livro.dataPublicacao)}))
    }
  )
}

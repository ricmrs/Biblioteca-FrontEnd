interface ILivroDetalheJSON extends Omit<ILivroDetalhe, 'dataPublicacao'>{
  dataPublicacao: string;
}

export function parseLivroDetalhe(data: ILivroDetalheJSON): ILivroDetalhe {
  return ({...data, dataPublicacao: new Date(data.dataPublicacao)})
}

interface ILivroListagemDetalheJSON extends Omit<ILivroListagemDetalhe, 'dataPublicacao'>{
  dataPublicacao: string;
}

export function parseLivroListagem(data: IPagina<ILivroListagemDetalheJSON[]>): IPagina<ILivroListagem> {
  return (
    {
      ...data, 
      content: data.content.map(livro => ({...livro, dataPublicacao: new Date(livro.dataPublicacao)}))
    })
}

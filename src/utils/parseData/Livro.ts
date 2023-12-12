export function parseLivroDetalhe(data: ILivroDetalheJson): ILivroDetalhe {
  return ({...data, dataPublicacao: new Date(`${data.dataPublicacao}T00:00`)})
}

interface ILivroListagemDetalheJSON extends Omit<ILivroListagemDetalhe, 'dataPublicacao'>{
  dataPublicacao: string;
}

export function parseLivroListagem(data: IPagina<ILivroListagemDetalheJSON[]>): IPagina<ILivroListagem> {
  return (
    {
      ...data, 
      content: data.content.map(livro => ({...livro, dataPublicacao: new Date(`${livro.dataPublicacao}T00:00`)}))
    })
}

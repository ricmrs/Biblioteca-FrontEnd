interface ILivroListagemDetalhe {
  id: number;
  titulo: string;
  numeroPaginas: number;
  autorId: number;
  editoraId: number;
  dataPublicacao: Date;
  preco: number;
}

type ILivroListagem = ILivroListagemDetalhe[];

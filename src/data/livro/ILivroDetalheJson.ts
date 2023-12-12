interface ILivroDetalheJson extends Omit<ILivroDetalhe, 'dataPublicacao'>{
  dataPublicacao: string;
}

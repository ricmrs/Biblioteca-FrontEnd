interface IAutorDetalheJson extends Omit<IAutorDetalhe, 'livros'>{
  livros: ILivroPorAutorJson[];
}


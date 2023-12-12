interface ILivroPorAutorJson extends Omit<ILivroPorAutor, 'dataPublicacao'>{
  dataPublicacao: string;
}

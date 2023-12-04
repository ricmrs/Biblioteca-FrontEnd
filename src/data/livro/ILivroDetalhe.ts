interface ILivroDetalhe {
  id: number;
  titulo: string;
  descricao: string;
  numeroPaginas: number;
  idioma: string;
  autor: {
    id: number;
    nome: string;
  };
  editora: {
    id: number;
    nome: string;
  };
  dataPublicacao: Date;
  preco: number;
}

interface ILivroAtualizacao {
  id: number;
  titulo?: string;
  descricao?: string;
  numeroPaginas?: number;
  idioma?: string;
  autorId?: number;
  editoraId?: number;
  dataPublicacao?: Date;
  preco?: number;
}

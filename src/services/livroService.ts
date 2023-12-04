import { parseLivroDetalhe, parseLivroListagem } from "@/utils/parseData/Livro";

export function livroService(){
  const BASE_URL = "http://localhost:8080";
  return {
    cadastrar: async (livro: ILivroCadastro): Promise<ILivroDetalhe> => {
      return await fetch(`${BASE_URL}/livros`, 
        { 
          body: JSON.stringify(livro), 
          method: "POST", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseLivroDetalhe(res))
        .catch(err => { throw new Error('Não foi possível cadastrar um novo livro') });
    },
    detalhar: async (id: number): Promise<ILivroDetalhe> => {
      return await fetch(`${BASE_URL}/livros/${id}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseLivroDetalhe(res))
        .catch(err => { throw new Error('Não foi possível detalhar o livro') });
    },
    listarTodas: async (pagina: number): Promise<IPagina<ILivroListagem>> => {
      return await fetch(`${BASE_URL}/livros?page=${pagina}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseLivroListagem(res))
        .catch(err => { throw new Error('Não foi possível listar os livros') });
    },
    atualizar: async (livro: ILivroAtualizacao): Promise<ILivroDetalhe> => {
      return await fetch(`${BASE_URL}/livros`, 
        { 
          body: JSON.stringify(livro), 
          method: "PUT", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseLivroDetalhe(res))
        .catch(err => { throw new Error('Não foi possível atualizar o livro') });
    },
    deletar: async (id: number): Promise<void> => {
      await fetch(`${BASE_URL}/livros/${id}`, 
        { 
          method: "DELETE", 
          headers: {"Content-type": "application/json"} 
        })
        .catch(err => { throw new Error('Não foi possível excluir o livro') });
    }
  }
}

import { parseLivroDetalhe } from "@/utils/parseData/Livro";

export function livroService(){
  const BASE_URL = "http://localhost:8080"; 
  return {
    cadastrar: async (livro: ILivroCadastro): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/livros`, 
        { 
          body: JSON.stringify(livro), 
          method: "POST", 
          headers: {"Content-type": "application/json"} 
        })
        .then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: `Livro ${livro.titulo} cadastrado com sucesso!` };
          return { ok: res.ok, mensagens: await res.text()};
        }).then(res => {
          if(!res.ok && res.mensagens.startsWith('[')){
            const mensagens = JSON.parse(res.mensagens) as IErroValidacao[];
            const erros = mensagens.map(erro => `O campo ${erro.campo} ${erro.mensagem}`);
            return { ok: res.ok, mensagens: erros }
          }
          return { ok: res.ok, mensagens: [res.mensagens]}
        })
        .catch(() => { throw new Error('Não foi possível cadastrar um novo livro, tente novamente mais tarde.') });
    },
    detalhar: async (id: number): Promise<ILivroDetalhe|void> => {
      return await fetch(`${BASE_URL}/livros/${id}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => { if (res.ok) return res.json(); else return null })
        .then(res => { if(res) return parseLivroDetalhe(res) })
        .catch(() => { throw new Error('Não foi possível detalhar o livro, tente novamente mais tarde.') });
    },
    listarTodas: async (pagina: number): Promise<IPagina<ILivroListagem>> => {
      return await fetch(`${BASE_URL}/livros?page=${pagina}&size=8`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => { if (res.ok) return res.json(); })
        .catch(() => { throw new Error('Não foi possível listar os livros, tente novamente mais tarde.'); });
    },
    atualizar: async (livro: ILivroAtualizacao): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/livros`, 
        { 
          body: JSON.stringify(livro), 
          method: "PUT", 
          headers: {"Content-type": "application/json"} 
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: `Livro ${livro.titulo} atualizado com sucesso!` };
          return { ok: res.ok, mensagens: await res.text()};
        }).then(res => {
          if(!res.ok && res.mensagens.startsWith('[')){
            const mensagens = JSON.parse(res.mensagens) as IErroValidacao[];
            const erros = mensagens.map(erro => `O campo ${erro.campo} ${erro.mensagem}`);
            return { ok: res.ok, mensagens: erros }
          }
          return { ok: res.ok, mensagens: [res.mensagens]}
        })
        .catch(() => { throw new Error('Não foi possível atualizar o livro, tente novamente mais tarde.') });
    },
    deletar: async (id: number, nome: string): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/livros/${id}`, 
        { 
          method: "DELETE", 
          headers: {"Content-type": "application/json"} 
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Autor ${nome} deletado com sucesso!`] };
          const json = await res.json();
          return { ok: res.ok, mensagens: json }
        })
        .catch(() => { throw new Error('Não foi possível excluir o livro, tente novamente mais tarde.') });
    }
  }
}

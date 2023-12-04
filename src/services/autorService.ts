import { parseAutorDetalhe } from "@/utils/parseData/Autor";

export function autorService(){
  const BASE_URL = "http://localhost:8080";
  return {
    cadastrar: async (autor: IAutorCadastro): Promise<IAutorDetalhe> => {
      return await fetch(`${BASE_URL}/autores`, 
        { 
          body: JSON.stringify(autor), 
          method: "POST", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseAutorDetalhe(res))
        .catch(err => { throw new Error('Não foi possível cadastrar um novo autor') });
    },
    detalhar: async (id: number): Promise<IAutorDetalhe> => {
      return await fetch(`${BASE_URL}/autores/${id}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseAutorDetalhe(res))
        .catch(err => { throw new Error('Não foi possível detalhar o autor') });
    },
    listarTodas: async (pagina: number): Promise<IPagina<IAutorListagem>> => {
      return await fetch(`${BASE_URL}/autores?page=${pagina}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json())
        .catch(err => { throw new Error('Não foi possível listar os autores') });
    },
    atualizar: async (autor: IAutorAtualizacao): Promise<IAutorDetalhe> => {
      return await fetch(`${BASE_URL}/autores`, 
        { 
          body: JSON.stringify(autor), 
          method: "PUT", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json()).then(res => parseAutorDetalhe(res))
        .catch(err => { throw new Error('Não foi possível atualizar o autor') });
    },
    deletar: async (id: number): Promise<void> => {
      await fetch(`${BASE_URL}/autores/${id}`, 
        { 
          method: "DELETE", 
          headers: {"Content-type": "application/json"} 
        })
        .catch(err => { throw new Error('Não foi possível excluir o autor') });
    }
  }
}

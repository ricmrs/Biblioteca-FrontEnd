export function editoraService(){
  const BASE_URL = "http://localhost:8080";
  return {
    cadastrar: async (editora: IEditoraCadastro): Promise<IEditoraDetalhe> => {
      return await fetch(`${BASE_URL}/editoras`, 
        { 
          body: JSON.stringify(editora), 
          method: "POST", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json())
        .catch(err => { throw new Error('Não foi possível cadastrar uma nova editora') });
    },
    detalhar: async (id: number): Promise<IEditoraDetalhe> => {
      return await fetch(`${BASE_URL}/editoras/${id}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json())
        .catch(err => { throw new Error('Não foi possível detalhar a editora') });
    },
    listarTodas: async (pagina: number): Promise<IPagina<IEditoraListagem>> => {
      return await fetch(`${BASE_URL}/editoras?page=${pagina}`, 
        { 
          method: "GET", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json())
        .catch(err => { throw new Error('Não foi possível listar as editoras') });
    },
    atualizar: async (editora: IEditoraAtualizacao): Promise<IEditoraDetalhe> => {
      return await fetch(`${BASE_URL}/editoras`, 
        { 
          body: JSON.stringify(editora), 
          method: "PUT", 
          headers: {"Content-type": "application/json"} 
        }).then(res => res.json())
        .catch(err => console.error(err.message));
    },
    deletar: async (id: number): Promise<void> => {
      await fetch(`${BASE_URL}/editoras/${id}`, 
        { 
          method: "DELETE", 
          headers: {"Content-type": "application/json"} 
        })
        .catch(err => console.error(err.message));
    }
  }
}

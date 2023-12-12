export function editoraService() {
  const BASE_URL = "http://localhost:8080";
  return {
    cadastrar: async (editora: IEditoraCadastro): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/editoras`,
        {
          body: JSON.stringify(editora),
          method: "POST",
          headers: { "Content-type": "application/json" }
        })
        .then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Editora ${editora.nome} cadastrada com sucesso!`] };
          const promise = await res.json() as Promise<IErroValidacao[]>;
          const erros = (await promise).map(erro => `O campo ${erro.campo} ${erro.mensagem}`);
          return { ok: res.ok, mensagens: erros }
        })
        .catch(() => { throw new Error('Não foi possível cadastrar uma nova editora, tente novamente mais tarde.') });
    },
    detalhar: async (id: number): Promise<IEditoraDetalhe> => {
      return await fetch(`${BASE_URL}/editoras/${id}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" }
        }).then(res => { if (res.ok) return res.json(); })
        .catch(() => { throw new Error('Não foi possível detalhar a editora, tente novamente mais tarde.') });
    },
    listarTodas: async (pagina: number): Promise<IPagina<IEditoraListagem>> => {
      return await fetch(`${BASE_URL}/editoras?page=${pagina}&size=8`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" }
        }).then(res => { if (res.ok) return res.json(); })
        .catch(() => { throw new Error('Não foi possível listar as editoras, tente novamente mais tarde.') });
    },
    atualizar: async (editora: IEditoraAtualizacao): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/editoras`,
        {
          body: JSON.stringify(editora),
          method: "PUT",
          headers: { "Content-type": "application/json" }
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Editora ${editora.nome} atualizada com sucesso!`] };
          const promise = await res.json() as Promise<IErroValidacao[]>;
          const erros = (await promise).map(erro => `O campo ${erro.campo} ${erro.mensagem}`);
          return { ok: res.ok, mensagens: erros }
        })
        .catch(() => { throw new Error('Não foi possível atualizar a editora, tente novamente mais tarde.') });
    },
    deletar: async (id: number, nome: string): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/editoras/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" }
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Editora ${nome} deletada com sucesso!`] };
          const json = await res.json();
          return { ok: res.ok, mensagens: json }
        })
        .catch(() => { throw new Error('Não foi possível deletar a editora, tente novamente mais tarde.') });
    }
  }
}

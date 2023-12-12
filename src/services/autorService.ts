import { parseAutorDetalhe } from "@/utils/parseData/Autor";

export function autorService() {
  const BASE_URL = "http://localhost:8080";
  return {
    cadastrar: async (autor: IAutorCadastro): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/autores`,
        {
          body: JSON.stringify(autor),
          method: "POST",
          headers: { "Content-type": "application/json" }
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Autor ${autor.nome} cadastrado com sucesso!`] };
          const promise = await res.json() as Promise<IErroValidacao[]>;
          const erros = (await promise).map(erro => `O campo ${erro.campo} ${erro.mensagem}`);
          return { ok: res.ok, mensagens: erros }
        })
        .catch(() => { throw new Error('Não foi possível cadastrar um novo autor, tente novamente mais tarde.') });
    },
    detalhar: async (id: number): Promise<IAutorDetalhe> => {
      return await fetch(`${BASE_URL}/autores/${id}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" }
        }).then(res => { if (res.ok) return res.json(); })
        .then(res => parseAutorDetalhe(res))
        .catch(() => { throw new Error('Não foi possível detalhar o autor, tente novamente mais tarde.') });
    },
    listarTodas: async (pagina: number): Promise<IPagina<IAutorListagem>> => {
      return await fetch(`${BASE_URL}/autores?page=${pagina}&size=8`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" }
        }).then(res => { if (res.ok) return res.json(); })
        .catch(() => { throw new Error('Não foi possível listar os autores, tente novamente mais tarde.') });
    },
    atualizar: async (autor: IAutorAtualizacao): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/autores`,
        {
          body: JSON.stringify(autor),
          method: "PUT",
          headers: { "Content-type": "application/json" }
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Autor ${autor.nome} atualizado com sucesso!`] };
          const promise = await res.json() as Promise<IErroValidacao[]>;
          const erros = (await promise).map(erro => `O campo ${erro.campo} ${erro.mensagem}`);
          return { ok: res.ok, mensagens: erros }
        })
        .catch(() => { throw new Error('Não foi possível atualizar o autor, tente novamente mais tarde.') });
    },
    deletar: async (id: number, nome: string): Promise<IPromise> => {
      return await fetch(`${BASE_URL}/autores/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" }
        }).then(async res => {
          if (res.ok) return { ok: res.ok, mensagens: [`Autor ${nome} deletado com sucesso!`] };
          const json = await res.json();
          return { ok: res.ok, mensagens: json }
        })
        .catch(() => { throw new Error('Não foi possível excluir o autor') });
    }
  }
}

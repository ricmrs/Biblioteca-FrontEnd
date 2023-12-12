import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { livroService } from "@/services/livroService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AtualizacaoPage({ livro }: { livro: ILivroAtualizacao }) {
  const theme = useTheme();
  const service = livroService();
  const [titulo, setTitulo] = useState(livro.titulo);
  const [descricao, setDescricao] = useState(livro.descricao);
  const [numeroPaginas, setNumeroPaginas] = useState(livro.numeroPaginas);
  const [idioma, setIdioma] = useState(livro.idioma);
  const [autorId, setAutorId] = useState(livro.autorId);
  const [editoraId, setEditoraId] = useState(livro.editoraId);
  const [dataPublicacao, setDataPublicacao] = useState(livro.dataPublicacao);
  const [preco, setPreco] = useState(livro.preco);
  const fields = [
    { name: 'Titulo', slug: 'titulo', value: titulo, setValue: setTitulo },
    { name: 'Descricao', slug: 'descricao', value: descricao, setValue: setDescricao },
    { name: 'Número de Páginas', slug: 'numeroPaginas', value: numeroPaginas, setValue: setNumeroPaginas },
    { name: 'Idioma', slug: 'idioma', value: idioma, setValue: setIdioma },
    { name: 'Id do autor', slug: 'autorId', value: autorId, setValue: setAutorId },
    { name: 'Id da editora', slug: 'editoraId', value: editoraId, setValue: setEditoraId },
    { name: 'Data de publicação', slug: 'dataPublicacao', value: dataPublicacao, setValue: setDataPublicacao, type: "date" },
    { name: 'Preço', slug: 'preco', value: preco, setValue: setPreco }] as FieldProps[]

  async function atualizar(dados: IDadosFormulario) {
    const id = livro.id;
    const novoLivro = { ...dados, id }
    try {
      const resposta = await service.atualizar(novoLivro as ILivroAtualizacao);
      resposta.mensagens.map(mensagem => {
        resposta.ok ? toast.success(mensagem) : toast.error(mensagem);
      })
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  }

  return (
    <>
      <Head><title>Atualização - Livros</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 0, md: 20 },
          backgroundColor: theme.colors.positive.x200
        }}
      >
        <Toaster />
        <Form
          title="Atualização"
          buttonName="Atualizar"
          color="positive"
          type="livro"
          fields={fields}
          onSubmit={atualizar}
        />
      </Box>
    </>
  )
}

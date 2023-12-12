import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { livroService } from "@/services/livroService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CadastroPage() {
  const theme = useTheme();
  const service = livroService();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState('');
  const [idioma, setIdioma] = useState('');
  const [autorId, setAutorId] = useState('');
  const [editoraId, setEditoraId] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [preco, setPreco] = useState('');
  const fields = [
    { name: 'Titulo', slug: 'titulo', value: titulo, setValue: setTitulo },
    { name: 'Descricao', slug: 'descricao', value: descricao, setValue: setDescricao },
    { name: 'Número de Páginas', slug: 'numeroPaginas', value: numeroPaginas, setValue: setNumeroPaginas },
    { name: 'Idioma', slug: 'idioma', value: idioma, setValue: setIdioma },
    { name: 'Id do autor', slug: 'autorId', value: autorId, setValue: setAutorId },
    { name: 'Id da editora', slug: 'editoraId', value: editoraId, setValue: setEditoraId },
    { name: 'Data de publicação', slug: 'dataPublicacao', value: dataPublicacao, setValue: setDataPublicacao, type: "date" }, 
    { name: 'Preço', slug: 'preco', value: preco, setValue: setPreco }] as FieldProps[]

  async function cadastrar(dados: IDadosFormulario) {
    try {
      const resposta = await service.cadastrar(dados as ILivroCadastro);
      resposta.mensagens.map(mensagem => {
        resposta.ok ? toast.success(mensagem) : toast.error(mensagem);
      })
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  }

  return (
    <>
      <Head><title>Cadastro - Livros</title></Head>
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
          type="livro"
          title="Cadastro"
          buttonName="Cadastrar"
          color="positive"
          fields={fields}
          onSubmit={cadastrar}
        />
      </Box>
    </>
  )
}

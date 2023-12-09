import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { livroService } from "@/services/livroService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useState } from "react";

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
      console.log('resposta livro', resposta)
      if ((Array.isArray(resposta))) {
        resposta.map(res => console.log(`O campo ${res.campo} ${res.mensagem}`))
      }
    } catch (err) {
      console.error(err)
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
          padding: 20,
          backgroundColor: theme.colors.positive.x200
        }}
      >
        <Form
          type="livro"
          title="Cadastro"
          buttonName="Cadastrar"
          buttonColor="positive"
          fields={fields}
          onSubmit={cadastrar}
        />
      </Box>
    </>
  )
}

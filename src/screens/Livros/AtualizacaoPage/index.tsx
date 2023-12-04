import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { livroService } from "@/services/livroService";
import { useTheme } from "@/theme/ThemeProvider";
import { getISODate } from "@/utils/getISODate";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AtualizacaoPage() {
  const theme = useTheme();
  const service = livroService();
  const params = useParams();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState<number>();
  const [idioma, setIdioma] = useState('');
  const [autorId, setAutorId] = useState<number>();
  const [editoraId, setEditoraId] = useState<number>();
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [preco, setPreco] = useState<number>();
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
    if (params?.id) {
      const id = parseInt(params.id as string);
      const livro = {...dados, id}
      try {
        const resposta = await service.atualizar(livro as ILivroAtualizacao);
        console.log("Livro atualizado com sucesso!");
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    buscarDadosLivro();
  }, [])

  async function buscarDadosLivro(){
    if (params?.id) {
      const id = parseInt(params.id as string);
      try {
        const livro = await service.detalhar(id);
        setTitulo(livro.titulo);
        setDescricao(livro.descricao);
        setNumeroPaginas(livro.numeroPaginas);
        setIdioma(livro.idioma);
        setAutorId(livro.autor.id);
        setEditoraId(livro.editora.id);
        setDataPublicacao(getISODate(livro.dataPublicacao));
        setPreco(livro.preco);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <Head><title>Atualizacao - Livros</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Form title="Atualização" buttonName="Atualizar" type="livro" fields={fields} onSubmit={atualizar} />
      </Box>
    </>
  )
}

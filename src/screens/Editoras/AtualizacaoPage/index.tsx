import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AtualizacaoPage() {
  const theme = useTheme();
  const service = editoraService();
  const params = useParams();
  const [nome, setNome] = useState('');
  const fields = [{ name: 'Nome', slug: 'nome', value: nome, setValue: setNome }] as FieldProps[]

  async function atualizar(dados: IDadosFormulario) {
    if (params?.id) {
      const id = parseInt(params.id as string);
      const editora = {...dados, id}
      try {
        const resposta = await service.atualizar(editora as IEditoraAtualizacao);
        console.log("Editora atualizada com sucesso!");
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    buscarDadosEditora();
  }, [])

  async function buscarDadosEditora(){
    if (params?.id) {
      const id = parseInt(params.id as string);
      try {
        const editora = await service.detalhar(id);
        setNome(editora.nome);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <Head><title>Atualizacao - Editoras</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Form title="Atualização" buttonName="Atualizar" type="editora" fields={fields} onSubmit={atualizar} />
      </Box>
    </>
  )
}

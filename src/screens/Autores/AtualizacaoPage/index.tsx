import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { autorService } from "@/services/autorService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AtualizacaoPage() {
  const theme = useTheme();
  const service = autorService();
  const params = useParams();
  const searchParams = useSearchParams();
  const [nome, setNome] = useState(searchParams.get('nome') || '');
  const [sobre, setSobre] = useState('');
  const fields = [
    { name: 'Nome', slug: 'nome', value: nome, setValue: setNome },
    { name: 'Sobre', slug: 'sobre', value: sobre, setValue: setSobre }] as FieldProps[]

  async function atualizar(dados: IDadosFormulario) {
    if (params?.id) {
      const id = parseInt(params.id as string);
      const autores = {...dados, id}
      try {
        const resposta = await service.atualizar(autores as IAutorAtualizacao);
        console.log("Autor atualizado com sucesso!");
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <Head><title>Atualizacao - Autores</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Form title="Atualização" buttonName="Atualizar" type="autor" fields={fields} onSubmit={atualizar} />
      </Box>
    </>
  )
}

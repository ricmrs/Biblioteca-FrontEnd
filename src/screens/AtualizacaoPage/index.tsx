import Box from "@/components/Box";
import Form from "@/components/Form";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

export default function AtualizacaoPage() {
  const theme = useTheme();
  const service = editoraService();

  async function atualizar(
    event: React.MouseEvent<HTMLButtonElement>, 
    value: string, 
    setValue: Dispatch<SetStateAction<string>>)
    {
      event.preventDefault();
      const editora = { id: 1, nome: value }
      try {
        const resposta = await service.atualizar(editora);
        console.log("Editora cadastrado com sucesso!");
      } catch(err) {
        console.error(err);
      } finally {
        setValue('');
      }
  }

  return (
    <>
      <Head><title>Atualizacao</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Form title="Atualização" buttonName="Atualizar" onSubmit={atualizar}/>
      </Box>
    </>
  )
}

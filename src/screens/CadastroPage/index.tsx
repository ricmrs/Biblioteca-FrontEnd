import Box from "@/components/Box";
import Form from "@/components/Form";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

export default function Cadastro() {
  const theme = useTheme();
  const service = editoraService();

  async function cadastrar(
    event: React.MouseEvent<HTMLButtonElement>, 
    value: string, 
    setValue: Dispatch<SetStateAction<string>>)
    {
      event.preventDefault();
      const editora = { nome: value }
      try {
        const resposta = await service.cadastrar(editora);
        console.log("Editora cadastrado com sucesso!");
      } catch(err) {
        console.error(err);
      } finally {
        setValue('');
      }
  }

  return (
    <>
      <Head><title>Cadastro</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Form title="Cadastro" buttonName="Cadastrar" onSubmit={cadastrar}/>
      </Box>
    </>
  )
}

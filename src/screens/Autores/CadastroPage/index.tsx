import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { autorService } from "@/services/autorService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useState } from "react";

export default function CadastroPage() {
  const theme = useTheme();
  const service = autorService();
  const [nome, setNome] = useState('');
  const [sobre, setSobre] = useState('');
  const fields = [
    { name: 'Nome', slug: 'nome', value: nome, setValue: setNome },
    { name: 'Sobre', slug: 'sobre', value: sobre, setValue: setSobre }] as FieldProps[]

  async function cadastrar(dados: IDadosFormulario) {
    try {
      const resposta = await service.cadastrar(dados as IAutorCadastro);
      console.log('resposta autor', resposta)
      if ((Array.isArray(resposta))) {
        resposta.map(res => console.log(`O campo ${res.campo} ${res.mensagem}`))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Head><title>Cadastro - Autores</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          padding: { xs: 0, md: 20 },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x200
        }}
      >
        <Form
          type="autor"
          title="Cadastro"
          buttonName="Cadastrar"
          color="warning"
          fields={fields}
          onSubmit={cadastrar}
        />
      </Box>
    </>
  )
}

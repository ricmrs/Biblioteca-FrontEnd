import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useState } from "react";

export default function CadastroPage() {
  const theme = useTheme();
  const service = editoraService();
  const [nome, setNome] = useState('');
  const fields = [{ name: 'Nome', slug: 'nome', value: nome, setValue: setNome }] as FieldProps[];

  async function cadastrar(dados: IDadosFormulario) {
    try {
      const resposta = await service.cadastrar(dados as IEditoraCadastro);
      console.log(resposta)
      if((Array.isArray(resposta))){
        resposta.map(res => console.log(`O campo ${res.campo} ${res.mensagem}`))
      }
    } catch (err){
      console.error(err)
    }
  }

  return (
    <>
      <Head><title>Cadastro - Editoras</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.negative.x200
        }}
      >
        <Form
          type="editora"
          title="Cadastro"
          buttonName="Cadastrar"
          buttonColor="negative"
          fields={fields}
          onSubmit={cadastrar}
        />
      </Box>
    </>
  )
}

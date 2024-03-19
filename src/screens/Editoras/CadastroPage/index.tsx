import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CadastroPage() {
  const theme = useTheme();
  const service = editoraService();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const fields = [{ name: 'Nome', slug: 'nome', value: nome, setValue: setNome }] as FieldProps[];

  async function cadastrar(dados: IDadosFormulario) {
    try {
      const resposta = await service.cadastrar(dados as IEditoraCadastro);
      if(resposta.ok) router.back();
      resposta.mensagens.map(mensagem => {
        resposta.ok ? toast.success(mensagem) : toast.error(mensagem);
      })
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
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
          padding: { xs: 0, md: 20 },
          backgroundColor: theme.colors.negative.x200
        }}
      >
        <Toaster />
        <Form
          type="editora"
          title="Cadastro"
          buttonName="Cadastrar"
          color="negative"
          fields={fields}
          onSubmit={cadastrar}
        />
      </Box>
    </>
  )
}

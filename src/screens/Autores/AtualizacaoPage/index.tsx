import Box from "@/components/Box";
import { FieldProps } from "@/components/Field";
import Form from "@/components/Form";
import { autorService } from "@/services/autorService";
import { useTheme } from "@/theme/ThemeProvider";
import { parseAutor } from "@/utils/parseData/parseJson";
import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AtualizacaoPage({ autorJson }: { autorJson: IAutorDetalheJson }) {
  const theme = useTheme();
  const service = autorService();
  const autor = parseAutor.fromJSON(autorJson);
  const [nome, setNome] = useState(autor.nome);
  const [sobre, setSobre] = useState(autor.sobre);
  const fields = [
    { name: 'Nome', slug: 'nome', value: nome, setValue: setNome },
    { name: 'Sobre', slug: 'sobre', value: sobre, setValue: setSobre }] as FieldProps[]

  async function atualizar(dados: IDadosFormulario) {
      const id = autor.id;
      const novoAutor = {...dados, id};
      try {
        const resposta = await service.atualizar(novoAutor as IAutorAtualizacao);
        resposta.mensagens.map(mensagem => {
          resposta.ok ? toast.success(mensagem) : toast.error(mensagem);
        })
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
      }
  } 

  return (
    <>
      <Head><title>Atualização - Autores</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 0, md: 20 },
          backgroundColor: theme.colors.warning.x200
        }}
      >
        <Toaster />
        <Form 
          title="Atualização" 
          buttonName="Atualizar" 
          color="warning"
          type="autor" 
          fields={fields} 
          onSubmit={atualizar}
        />
      </Box>
    </>
  )
}

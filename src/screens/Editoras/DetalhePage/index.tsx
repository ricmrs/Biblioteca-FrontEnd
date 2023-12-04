import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetalhePage() {
  const theme = useTheme();
  const service = editoraService();
  const params = useParams();
  const router = useRouter();
  const [editora, setEditora] = useState<IEditoraDetalhe>();

  useEffect(() => {
    if(params?.id) {
      try {
        carregaDadosEditora(params.id as unknown as number);
      } catch (err) {
        console.error(err)
      }
    }
  }, [params?.id])

  async function carregaDadosEditora(id: number) {
    const editora = await service.detalhar(id);
    setEditora(editora)
  }

  return (
    <>
      <Head><title>Editora</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Box
          styleSheet={{
            width: "80%",
            padding: 20,
            paddingBottom: 30,
            gap: 20,
            borderRadius: 15,
            alignItems: "center",
            backgroundColor: theme.colors.neutral.x050
          }}
        >
          <Text tag="h1" variant="heading3">Editora</Text>
          <Box>
            <Text>ID: {editora?.id}</Text>
            <Text>Nome: {editora?.nome}</Text>
          </Box>
          <Button onClick={() => router.back()} colorVariant="warning" colorVariantEnabled styleSheet={{ padding: 5 }}>
            Voltar
          </Button>
        </Box>  
      </Box>
    </>
  )
}

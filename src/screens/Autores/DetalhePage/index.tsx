import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { autorService } from "@/services/autorService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetalhePage() {
  const theme = useTheme();
  const service = autorService();
  const params = useParams();
  const router = useRouter();
  const [autor, setAutor] = useState<IAutorDetalhe>();

  useEffect(() => {
    if(params?.id) {
      try {
        carregaDadosAutor(params.id as unknown as number);
      } catch (err) {
        console.error(err);
      }
    }
  }, [params?.id])

  async function carregaDadosAutor(id: number) {
    const autor = await service.detalhar(id);
    setAutor(autor);
  }

  return (
    <>
      <Head><title>Autor</title></Head>
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
          <Text tag="h1" variant="heading3">Autor</Text>
          <Box>
            <Text>ID: {autor?.id}</Text>
            <Text>Nome: {autor?.nome}</Text>
            {autor?.sobre && <Text>Sobre: {autor?.sobre}</Text>}
            {!!autor?.livros.length && 
              (<><Text>Livros: </Text>
              {autor!.livros.map(livro => <Text key={livro.id}>- {livro.titulo} - {livro.dataPublicacao.toLocaleDateString('pt-BR')}</Text>)}</>)}
          </Box>
          <Button onClick={() => router.back()} colorVariant="warning" colorVariantEnabled styleSheet={{ padding: 5 }}>
            Voltar
          </Button>
        </Box>  
      </Box>
    </>
  )
}

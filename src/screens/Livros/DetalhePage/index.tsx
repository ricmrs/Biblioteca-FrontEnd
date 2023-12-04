import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { livroService } from "@/services/livroService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetalhePage() {
  const theme = useTheme();
  const service = livroService();
  const params = useParams();
  const router = useRouter();
  const [livro, setLivro] = useState<ILivroDetalhe>();

  useEffect(() => {
    if(params?.id) {
      try {
        carregaDadosLivro(params.id as unknown as number);
      } catch (err) {
        console.error(err);
      }
    }
  }, [params?.id])

  async function carregaDadosLivro(id: number) {
    const livro = await service.detalhar(id);
    setLivro(livro);
  }

  return (
    <>
      <Head><title>Livro</title></Head>
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
          <Text tag="h1" variant="heading3">Livro</Text>
          <Box>
            <Text>ID: {livro?.id}</Text>
            <Text>Titulo: {livro?.titulo}</Text>
            <Text>Descrição: {livro?.descricao}</Text>
            <Text>Número de Páginas: {livro?.numeroPaginas}</Text>
            <Text>Idioma: {livro?.idioma}</Text>
            <Text>Data de publicação: {livro?.dataPublicacao.toLocaleDateString('pt-BR')}</Text>
            <Text>Preço: R${livro?.preco}</Text>
          </Box>
          <Button onClick={() => router.back()} colorVariant="warning" colorVariantEnabled styleSheet={{ padding: 5 }}>
            Voltar
          </Button>
        </Box>  
      </Box>
    </>
  )
}

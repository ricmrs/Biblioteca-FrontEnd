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
    if (params?.id) {
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

  const gridStyles = {
    backgroundColor: theme.colors.warning.x050,
    padding: { xs: 5, xl: 8 },
    justifyContent: "center"
  }

  const gridLabelStyles = {
    ...gridStyles,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.colors.warning.x200,
    color: theme.colors.neutral.x000
  }

  return (
    <>
      <Head><title>Autor</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 0, md: 15, xl: 30 },
          backgroundColor: theme.colors.warning.x200
        }}
      >
        <Box
          styleSheet={{
            width: { xs: "100%", md: "90%", xl: "85%" },
            height: { xs: "100%", md: "auto" },
            padding: { xs: 10, md: 20, xl: 30 },
            paddingBottom: 30,
            gap: { xs: 40, md: 25, xl: 30 },
            borderRadius: { xs: 0, md: 15 },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: { xs: theme.colors.warning.x100, md: theme.colors.neutral.x050 }
          }}
        >
          <Text tag="h1" variant="heading2">Autor</Text>
          <Box styleSheet={{ display: "grid", gridTemplateColumns: "1fr 7fr", gap: 3, backgroundColor: theme.colors.warning.x300, padding: 3 }}>
            <Text variant="heading5" styleSheet={gridLabelStyles}>ID</Text>
            <Text variant="body" styleSheet={gridStyles}>{autor?.id}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Nome</Text>
            <Text variant="body" styleSheet={gridStyles}>{autor?.nome}</Text>
            {autor?.sobre && <>
              <Text variant="heading5" styleSheet={gridLabelStyles}>Sobre</Text>
              <Text variant="body" styleSheet={gridStyles}>{autor?.sobre}</Text></>}
            {!!autor?.livros.length &&
              (<><Text variant="heading5" styleSheet={gridLabelStyles}>Livros</Text>
                <Box styleSheet={{ gap: 3 }}>
                  <Box styleSheet={{ flexDirection: "row", gap: 3 }}>
                    <Text variant="heading5" styleSheet={{...gridLabelStyles, flexGrow: 1}}>Título</Text>
                    <Text variant="heading5" styleSheet={{ ...gridLabelStyles, width: { xs: 130, md: 150, xl: 200 } }}>Data de Publicação</Text>
                  </Box>
                  {autor!.livros.map(livro =>
                    <Box key={livro.id} styleSheet={{ gap: 3, flexDirection: "row" }}>
                      <Text variant="body" styleSheet={{ ...gridStyles, flexShrink: 1, flexGrow: 1 }}>{livro.titulo}</Text>
                      <Text variant="body" styleSheet={{ ...gridStyles, textAlign: "center", width: { xs: 130, md: 150, xl: 200 }}}>{livro.dataPublicacao.toLocaleDateString('pt-BR')}</Text>
                    </Box>)}
                </Box>
              </>
              )
            }
          </Box>
          <Button onClick={() => router.back()} colorVariant="warning" colorVariantEnabled styleSheet={{ padding: 5 }}>
            Voltar
          </Button>
        </Box>
      </Box>
    </>
  )
}

import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { useTheme } from "@/theme/ThemeProvider";
import { parseLivro } from "@/utils/parseData/parseJson";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DetalhePage({ livroJson }: { livroJson: ILivroDetalheJson }) { 
  const theme = useTheme();
  const router = useRouter();
  const livro = parseLivro.fromJSON(livroJson);

  const gridStyles = {
    backgroundColor: theme.colors.positive.x050,
    padding: { xs: 5, xl: 8 },
    justifyContent: "center",
    textAlign: "center"
  }

  const gridLabelStyles = {
    ...gridStyles,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.colors.positive.x200,
    color: theme.colors.neutral.x000
  }

  return (
    <>
      <Head><title>Livro</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 0, md: 15, xl: 30 },
          backgroundColor: theme.colors.positive.x200
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
            backgroundColor: { xs: theme.colors.positive.x100, md: theme.colors.neutral.x050 }
          }}
        >
          <Text tag="h1" variant="heading3">Livro</Text>
          <Box styleSheet={{ display: "grid", gridTemplateColumns: "1fr 7fr", gap: 3, backgroundColor: theme.colors.positive.x300, padding: 3 }}>
            <Text variant="heading5" styleSheet={gridLabelStyles}>ID</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.id}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Título</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.titulo}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Descrição</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.descricao}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Número de páginas</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.numeroPaginas}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Autor</Text>
            <Box styleSheet={{ display: "grid", gridTemplateColumns: "1fr 7fr", gap: 3, backgroundColor: theme.colors.positive.x300 }}>
              <Text variant="heading5" styleSheet={{ ...gridLabelStyles }}>ID</Text>
              <Text variant="heading5" styleSheet={{ ...gridLabelStyles }}>Nome</Text>
              <Text variant="body" styleSheet={gridStyles}>{livro?.autor.id}</Text>
              <Text variant="body" styleSheet={gridStyles}>{livro?.autor.nome}</Text>
            </Box>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Editora</Text>
            <Box styleSheet={{ display: "grid", gridTemplateColumns: "1fr 7fr", gap: 3, backgroundColor: theme.colors.positive.x300 }}>
              <Text variant="heading5" styleSheet={{ ...gridLabelStyles }}>ID</Text>
              <Text variant="heading5" styleSheet={{ ...gridLabelStyles }}>Nome</Text>
              <Text variant="body" styleSheet={gridStyles}>{livro?.editora.id}</Text>
              <Text variant="body" styleSheet={gridStyles}>{livro?.editora.nome}</Text>
            </Box>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Idioma</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.idioma}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Data de Publicação</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.dataPublicacao.toLocaleDateString('pt-BR')}</Text>
            <Text variant="heading5" styleSheet={gridLabelStyles}>Preço</Text>
            <Text variant="body" styleSheet={gridStyles}>{livro?.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            
          </Box>
          <Button onClick={() => router.back()} colorVariant="positive" colorVariantEnabled styleSheet={{ padding: 5 }}>
            Voltar
          </Button>
        </Box>
      </Box>
    </>
  )
}

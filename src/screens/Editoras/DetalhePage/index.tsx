import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DetalhePage({ editora }: { editora: IEditoraDetalhe }) {
  const theme = useTheme();
  const router = useRouter();

  const gridStyles = {
    backgroundColor: theme.colors.negative.x050,
    padding: { xs: 5, xl: 15 },
    justifyContent: "center"
  }

  const gridLabelStyles = {
    ...gridStyles,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.colors.negative.x200,
    color: theme.colors.neutral.x000
  }

  return (
    <>
      <Head><title>Editora</title></Head>
        <Box tag="main"
          styleSheet={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.negative.x200
          }}
        >
          <Box
            styleSheet={{
              width: { xs: "100%", md: "80%", xl: "60%" },
              height: { xs: "100%", md: "auto" },
              padding: { xs: 10, md: 20, xl: 30 },
              paddingBottom: 30,
              gap: { xs: 40, md: 25, xl: 30 },
              borderRadius: { xs: 0, md: 15 },
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: { xs: theme.colors.negative.x100, md: theme.colors.neutral.x050 }
            }}
          >
            <Text tag="h1" variant="heading2">Editora</Text>
            <Box styleSheet={{ display: "grid", gridTemplateColumns: "1fr 7fr", gap: 3, backgroundColor: theme.colors.negative.x300, padding: 3 }}>
              <Text variant="heading5" styleSheet={gridLabelStyles}>ID</Text>
              <Text variant="body" styleSheet={gridStyles}>{editora?.id}</Text>
              <Text variant="heading5" styleSheet={gridLabelStyles}>Nome</Text>
              <Text variant="body" styleSheet={gridStyles}>{editora?.nome}</Text>
            </Box>
            <Button onClick={() => router.back()} colorVariant="negative" colorVariantEnabled styleSheet={{ padding: 8 }}>
              Voltar
            </Button>
          </Box>
        </Box>
    </>
  )
}

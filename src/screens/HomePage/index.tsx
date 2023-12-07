import Box from "@/components/Box";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import Card from "./Card";
import Text from "@/components/Text";

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Head><title>Homepage</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          backgroundColor: theme.colors.accent.x100
        }}
      >
        <Text styleSheet={{ fontSize: 50, color: theme.colors.warning.x900 }}>Entidades</Text>
        <Box styleSheet={{ flexDirection: { xs: "column", md: "row" }, gap: {  xs: 20, md: 30 } }}>
          <Card href="/editoras/listagem?page=1" title="Editoras" colorVariant="negative" />
          <Card href="/autores/listagem?page=1" title="Autores" colorVariant="warning"/>
          <Card href="/livros/listagem?page=1" title="Livros" colorVariant="positive"/>
        </Box>
      </Box>
    </>
  )
}

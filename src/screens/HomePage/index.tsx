import Box from "@/components/Box";
import Link from "@/components/Link";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import Card from "./Card";

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
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Box styleSheet={{ flexDirection: "row", gap: 10 }}>
          <Card href="/editoras/listagem?page=1" title="Editoras" />
          <Card href="/autores/listagem?page=1" title="Autores" />
          <Card href="/livros/listagem?page=1" title="Livros" />
        </Box>
      </Box>
    </>
  )
}

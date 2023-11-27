import Box from "@/components/Box";
import Form from "@/components/Form";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Head><title>Cadastro</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Form />
      </Box>
    </>
  )
}

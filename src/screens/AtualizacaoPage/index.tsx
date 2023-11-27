import Box from "@/components/Box";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useEffect, useState } from 'react';

export default function AtualizacaoPage() {
  const theme = useTheme();
  const service = editoraService();

  return (
    <>
      <Head><title>Atualizacao</title></Head>
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
        </Box>
      </Box>
    </>
  )
}

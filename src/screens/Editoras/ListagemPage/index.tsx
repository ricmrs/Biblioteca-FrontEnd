import Box from "@/components/Box";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function ListagemPage() {
  const theme = useTheme();
  const service = editoraService();
  const router = useRouter();
  const params = useSearchParams();
  let page = params.get('page');

  const [editoras, setEditoras] = useState<IEditoraListagem>([]);
  const [primeiraPagina, setPrimeiraPagina] = useState<boolean>();
  const [ultimaPagina, setUltimaPagina] = useState<boolean>();

  useEffect(() => {
    if (page) {
      try {
        carregaDadosEditoras();
      } catch (err) {
        console.error(err);
      }
    }
  }, [page])

  async function carregaDadosEditoras() {
    const numPage = parseInt(page as string) - 1;
    const paginaEditoras = await service.listarTodas(numPage);
    setEditoras(paginaEditoras.content)
    setPrimeiraPagina(paginaEditoras.first);
    setUltimaPagina(paginaEditoras.last);
  }

  function voltarPagina() {
    if (primeiraPagina) return;
    const numPage = (parseInt(page as string) - 1).toString();
    router.push(`?page=${numPage}`);
  }

  function avancarPagina() {
    if (ultimaPagina) return;
    const numPage = (parseInt(page as string) + 1).toString();
    router.push(`?page=${numPage}`);
  }

  async function excluir(id: number) {
    try {
      await service.deletar(id);
      carregaDadosEditoras();
      console.log("Editora excluída com sucesso")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Head><title>Listagem - Editoras</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 25,
          backgroundColor: theme.colors.warning.x100
        }}
      >
        <Box
          styleSheet={{
            width: "80%",
            padding: 20,
            paddingBottom: 25,
            gap: 15,
            borderRadius: 15,
            alignItems: "center",
            backgroundColor: theme.colors.neutral.x050
          }}
        >
          <Text tag="h1" variant="heading3">Editoras</Text>
          <Box styleSheet={{ width: "100%" }}>
            <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
              <Button
                href="/"
                colorVariant="warning"
                colorVariantEnabled
                styleSheet={{ width: { md: 29, lg: 36 }, height: { md: 29, lg: 36 }, alignSelf: "center" }}
              >
                <Icon styleSheet={{ width: 25, height: 25 }} viewBox={[25, 25]} />
              </Button>
              <Button
                href="cadastro"
                colorVariant="warning"
                textVariant="heading4"
                colorVariantEnabled
                styleSheet={{ paddingVertical: 2, paddingHorizontal: 5 }}
              >
                Cadastro
              </Button>
            </Box>
            <Box styleSheet={{ gap: 5, height: { md: 527, lg: 461 } }}>
              {editoras.map(editora =>
                <Box
                  key={editora.id}
                  styleSheet={{
                    flexDirection: "row",
                    gap: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    border: "2px solid #000",
                    backgroundColor: theme.colors.positive.x500,
                    color: theme.colors.neutral.x000,
                    hover: {
                      backgroundColor: theme.colors.positive.x400,
                      transform: "none"
                    },
                    focus: {
                      backgroundColor: theme.colors.positive.x600,
                    }
                  }}>
                  <Button
                    href={`detalhe/${editora.id}`}
                    styleSheet={{
                      alignItems: "flex-start",
                      flexGrow: 1,
                    }}
                    textVariant="heading4"
                  >
                    {editora.nome}
                  </Button>
                  <Box styleSheet={{ flexDirection: "row", gap: 15 }}>
                    <Button href={`atualizacao/${editora.id}`} styleSheet={{ width: 25, height: 25, alignSelf: "center" }} colorVariantEnabled={false}>
                      <Icon styleSheet={{ width: 25, height: 25 }} viewBox={[25, 25]} />
                    </Button>
                    <Button onClick={() => excluir(editora.id)} styleSheet={{ width: 25, height: 25, alignSelf: "center" }} colorVariantEnabled={false}>
                      <Icon styleSheet={{ width: 25, height: 25 }} viewBox={[25, 25]} />
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
              <Button
                colorVariant="warning"
                colorVariantEnabled
                textVariant="heading4"
                onClick={voltarPagina}
                styleSheet={{ visibility: primeiraPagina && "hidden", padding: 5 }}
              >
                Voltar
              </Button>
              <Button
                colorVariant="warning"
                colorVariantEnabled
                textVariant="heading4"
                onClick={avancarPagina}
                styleSheet={{ visibility: ultimaPagina && "hidden", padding: 5 }}
              >
                Próximo
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

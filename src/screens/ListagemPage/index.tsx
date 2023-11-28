import Box from "@/components/Box";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { editoraService } from "@/services/editoraService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function ListagemPage() {
  const theme = useTheme();
  const service = editoraService();
  const params = useParams();
  const router = useRouter();

  const [editoras, setEditoras] = useState<IEditoraListagem>([]);
  const [primeiraPagina, setPrimeiraPagina] = useState<boolean>();
  const [ultimaPagina, setUltimaPagina] = useState<boolean>();

  useEffect(() => {
    if(params?.page) {
      try {
        carregaDadosEditoras();
      } catch (err) {
        console.error(err);
      }
    }
  }, [params?.page])

  async function carregaDadosEditoras() {
    const page = parseInt(params.page as string) - 1;
    const paginaEditoras = await service.listarTodas(page);
    setEditoras(paginaEditoras.content)
    setPrimeiraPagina(paginaEditoras.first);
    setUltimaPagina(paginaEditoras.last);
  }

  function voltarPagina() {
    if (primeiraPagina) return;
    const page = (parseInt(params.page as string) - 1).toString();
    router.push(page);
  }

  function avancarPagina() {
    if (ultimaPagina) return;
    const page = (parseInt(params.page as string) + 1).toString();
    router.push(page);
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
      <Head><title>Listagem</title></Head>
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
          <Text tag="h1" variant="heading3">Editoras</Text>
          <Box styleSheet={{ width: "100%" }}>
            <Box styleSheet={{ gap: 5, height: { md: 527, lg: 597 } }}>
              {editoras.map(editora =>
                <Box 
                  key={editora.id} 
                  styleSheet={{ 
                    flexDirection: "row", 
                    gap: 10,
                    paddingVertical: 10,
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
                    href={`/detalhe/${editora.id}`}
                    styleSheet={{
                      alignItems: "flex-start",
                      flexGrow: 1,
                    }}
                  >
                    {editora.nome}
                  </Button>
                  <Box styleSheet={{ flexDirection: "row", gap: 15 }}>
                    <Button href="/atualizacao" styleSheet={{ width: 25, height: 25, alignSelf: "center" }} colorVariantEnabled={false}>
                      <Icon styleSheet={{ width: 25, height: 25 }} viewBox={[25, 25]} />
                    </Button>
                    <Button onClick={() => excluir(editora.id)} styleSheet={{ width: 25, height: 25, alignSelf: "center" }} colorVariantEnabled={false}>
                      <Icon styleSheet={{ width: 25, height: 25 }} viewBox={[25, 25]} />
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
              <Button
                colorVariant="warning"
                colorVariantEnabled
                onClick={voltarPagina}
                styleSheet={{ visibility: primeiraPagina && "hidden", padding: 5 }}
              >
                Voltar
              </Button>
              <Button
                colorVariant="warning"
                colorVariantEnabled
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

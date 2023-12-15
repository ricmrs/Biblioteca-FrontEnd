import Box from "@/components/Box";
import Button from "@/components/Button";
import Carregando from "@/components/Carregando";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { livroService } from "@/services/livroService";
import { useTheme } from "@/theme/ThemeProvider";
import Head from "next/head";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

export default function ListagemPage() {
  const theme = useTheme();
  const service = livroService();
  const router = useRouter();
  const params = useSearchParams();
  let page = params.get('page');

  const [livros, setLivros] = useState<ILivroListagem>([]);
  const [primeiraPagina, setPrimeiraPagina] = useState<boolean>();
  const [ultimaPagina, setUltimaPagina] = useState<boolean>();

  useEffect(() => {
    if (page) {
      carregaDadosLivros();
    }
  }, [page])

  async function carregaDadosLivros() {
    const numPage = parseInt(page as string) - 1;
    const resposta = await service.listarTodas(numPage);
    setLivros(resposta.content)
    setPrimeiraPagina(resposta.first);
    setUltimaPagina(resposta.last);
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

  async function excluir(id: number, nome: string) {
    try {
      const resposta = await service.deletar(id, nome);
      resposta.mensagens.map(res => {
        resposta.ok ? toast.success(res) : toast.error(res);
      })
      if (livros?.length === 1 && !primeiraPagina) {
        const numPage = (parseInt(page as string) - 1).toString();
        router.push(`listagem?page=${numPage}`);
      } else {
        carregaDadosLivros();
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  }

  return (
    <>
      <Head><title>Listagem - Livros</title></Head>
      <Box tag="main"
        styleSheet={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 0, md: 25 },
          backgroundColor: theme.colors.positive.x200
        }}
      >
        <Toaster />
        <Box
          styleSheet={{
            width: { xs: "100%", md: "80%" },
            padding: 20,
            paddingBottom: 25,
            gap: { xs: 20, md: 15 },
            borderRadius: { xs: 0, md: 15 },
            alignItems: "center",
            backgroundColor: theme.colors.neutral.x050
          }}
        >
          <Text tag="h1" variant="heading3">Livros</Text>
          <Box styleSheet={{ width: "100%" }}>
            <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", marginBottom: { xs: 12, md: 15, xl: 20 } }}>
              <Button
                href="/"
                colorVariant="positive"
                colorVariantEnabled
                styleSheet={{ width: { xs: 30, md: 35, xl: 40 }, height: { xs: 30, md: 35, xl: 40 }, alignSelf: "center", borderRadius: "100%" }}
              >
                <Icon styleSheet={{ width: 20, height: 20 }} viewBox={[50, 50]} name="home" />
              </Button>
              <Button
                href="cadastro"
                colorVariant="positive"
                textVariant="heading4"
                colorVariantEnabled
                styleSheet={{ paddingHorizontal: 8, height: { xs: 30, md: 35, xl: 40 } }}
              >
                Cadastro
              </Button>
            </Box>
            <Box styleSheet={{ gap: { xs: 8, md: 10 }, height: { xs: 378, md: 463 } }}>
              {(livros == undefined) && <Carregando colorVariant="positive" />}
              {(livros?.length === 0 ? "Parece que não há nada aqui" : "")}
              {livros.map(livro =>
                <Box
                  key={livro.id}
                  styleSheet={{
                    flexDirection: "row",
                    gap: 10,
                    paddingVertical: { xs: 6, md: 8 },
                    paddingHorizontal: 10,
                    width: "100%",
                    border: "2px solid #000",
                    backgroundColor: theme.colors.positive.x300,
                    color: theme.colors.neutral.x000,
                    hover: {
                      backgroundColor: theme.colors.positive.x400,
                      transform: "none"
                    }
                  }}>
                  <Button
                    href={`detalhe/${livro.id}`}
                    styleSheet={{
                      alignItems: "flex-start",
                      flexShrink: 1,
                      flexGrow: 1,
                      display: "block",
                      lineHeight: { xs: "25px", md: "30px" },
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      focus: {
                        color: theme.colors.positive.x600,
                      }
                    }}
                    textVariant="heading4"
                  >
                    {livro.titulo}
                  </Button>
                  <Box styleSheet={{ flexDirection: "row", gap: 10 }}>
                    <Button href={`atualizacao/${livro.id}`} styleSheet={{ width: { xs: 25, md: 30 }, height: { xs: 25, md: 30 }, alignSelf: "center", focus: { border: "2px dotted #FFF" } }} colorVariantEnabled={false}>                      <Icon styleSheet={{ width: { xs: 25, md: 30 }, height: { xs: 25, md: 30 } }} viewBox={[64, 64]} name="pencil" />
                    </Button>
                    <Button onClick={() => excluir(livro.id, livro.titulo)} styleSheet={{ width: { xs: 25, md: 25 }, height: { xs: 25, md: 25 }, alignSelf: "center", focus: { border: "2px dotted #FFF" } }} colorVariantEnabled={false}>                      <Icon styleSheet={{ width: { xs: 22, md: 25 }, height: { xs: 22, md: 25 } }} viewBox={[64, 64]} name="lixeira" />
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", marginTop: { xs: 12, md: 15, xl: 20 } }}>
              <Button
                colorVariant="positive"
                colorVariantEnabled
                textVariant="heading4"
                onClick={voltarPagina}
                styleSheet={{ visibility: primeiraPagina && "hidden", padding: 5 }}
              >
                Voltar
              </Button>
              <Button
                colorVariant="positive"
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

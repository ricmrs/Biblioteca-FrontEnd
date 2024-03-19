import { livroService } from '@/services/livroService';
import { parseLivro } from '@/utils/parseData/parseJson';
import { GetServerSidePropsContext } from 'next';

export { default } from '@/screens/Livros/AtualizacaoPage';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const service = livroService();
  const id = parseInt(ctx.params?.id as string);
  const livro = await service.detalhar(id);
  
  if (!livro) {
    return {
      notFound: true
    }
  }
  
  const livroJson = parseLivro.toJSON(livro);
  
  return {
    props: {
      livroJson
    }
  }
}

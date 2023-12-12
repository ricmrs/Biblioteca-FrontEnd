import { autorService } from '@/services/autorService';
import { GetServerSidePropsContext } from 'next';

export { default } from '@/screens/Autores/AtualizacaoPage';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const service = autorService();
  const id = parseInt(ctx.params?.id as string);
  const autor = await service.detalhar(id);

  if (!autor) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      autor
    }
  }
}


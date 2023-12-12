import { autorService } from '@/services/autorService';
import { parseAutor } from '@/utils/parseData/parseJson';
import { GetServerSidePropsContext } from 'next';

export { default } from '@/screens/Autores/DetalhePage';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const service = autorService();
  const id = parseInt(ctx.params?.id as string);
  const autor = await service.detalhar(id);
  const autorJson = parseAutor.toJSON(autor);

  if (!autor) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      autorJson
    }
  }
}

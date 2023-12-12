import { editoraService } from '@/services/editoraService';
import { GetServerSidePropsContext } from 'next';

export { default } from '@/screens/Editoras/DetalhePage';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const service = editoraService();
  const id = parseInt(ctx.params?.id as string);
  const editora = await service.detalhar(id);

  if (!editora) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      editora
    }
  }
}

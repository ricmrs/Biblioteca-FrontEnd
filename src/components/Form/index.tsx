import { useTheme } from "@/theme/ThemeProvider";
import Box from "../Box";
import Button from "../Button";
import Text from "../Text";
import Input from "../Input";
import { editoraService } from "@/services/editoraService";
import { useState } from 'react';

export default function Form(){
  const theme = useTheme();
  const service = editoraService();
  const [value, setValue] = useState('');

  async function cadastrar(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    const editora = { nome: value }
    try {
      const resposta = await service.cadastrar(editora);
      console.log("Editora cadastrado com sucesso!");
    } catch(err) {
      console.error(err);
    } finally {
      setValue('');
    }
  }

  return (
    <Box tag="form" 
      styleSheet={{ 
        padding: 30,
        gap: 30,
        borderRadius: 15,
        backgroundColor: theme.colors.neutral.x050,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Text tag="h1" variant="heading3">Cadastro - Editora</Text>
      <Box styleSheet={{ gap: 10 }}>
        <Text tag="label" htmlFor="nome">Nome</Text>
        <Input id="nome" name="nome" value={value} onChange={event => setValue(event.target.value)}/>
      </Box>
      <Button 
        styleSheet={{ 
          padding: 15,
          borderRadius: 5,
          alignSelf: "center",
          width: "auto",
          color: theme.colors.neutral.x050,
          backgroundColor: theme.colors.warning.x500 
        }} 
        onClick={cadastrar}
      >
        Cadastrar
      </Button>
    </Box>
  )
}

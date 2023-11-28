import { useTheme } from "@/theme/ThemeProvider";
import Box from "../Box";
import Button from "../Button";
import Text from "../Text";
import Input from "../Input";
import { Dispatch, SetStateAction, useState } from 'react';

interface IForm {
  title: string;
  buttonName: string;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>, value: string, setValue: Dispatch<SetStateAction<string>>) => void;
}

export default function Form({ title, buttonName, onSubmit }: IForm ){
  const theme = useTheme();
  const [value, setValue] = useState('');

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
      <Text tag="h1" variant="heading3">{title} - Editora</Text>
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
        onClick={event => onSubmit(event, value, setValue)}
      >
        {buttonName}
      </Button>
    </Box>
  )
}

import { useTheme } from "@/theme/ThemeProvider";
import Box from "../Box";
import Button from "../Button";
import Text from "../Text";
import { useRouter } from "next/navigation";
import Field, { FieldProps } from "../Field";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

interface FormProps {
  title: string;
  buttonName: string;
  fields: FieldProps[];
  type: 'editora' | 'autor' | 'livro';
  onSubmit: (dadosFormulario: IDadosFormulario) => void;
}

export default function Form({ title, buttonName, fields, type, onSubmit }: FormProps) {
  const theme = useTheme();
  const router = useRouter();
  
  function montarDadosFormulario(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    let dadosFormulario = fields.reduce((prev, current) => (
      {
        ...prev, 
        [current.slug]: ((typeof current.value === 'string' ? current.value.trim() : current.value) || null)
      }), {})
    dadosFormulario = {...dadosFormulario, id: null}
    onSubmit(dadosFormulario as IDadosFormulario);
    limparCampos();
  }

  function limparCampos(){
    fields.map(field => field.setValue(''));
  }

  function voltar(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    router.back();
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
      <Text tag="h1" variant="heading3">{title} - {capitalizeFirstLetter(type)}</Text>
      {fields.map(field => <Field key={field.name} slug={field.slug} name={field.name} value={field.value} setValue={field.setValue} type={field.type}/>)}
      <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <Button
          styleSheet={{
            padding: 15,
            borderRadius: 5,
            width: "auto",
            color: theme.colors.neutral.x050,
            backgroundColor: theme.colors.warning.x500
          }}
          onClick={montarDadosFormulario}
        >
          {buttonName}
        </Button>
        <Button
          styleSheet={{
            padding: 15,
            borderRadius: 5,
            width: "auto",
            color: theme.colors.neutral.x050,
            backgroundColor: theme.colors.warning.x500
          }}
          onClick={voltar}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  )
}

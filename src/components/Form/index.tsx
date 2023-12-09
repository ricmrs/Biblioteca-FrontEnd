import { useTheme } from "@/theme/ThemeProvider";
import Box from "../Box";
import Button from "../Button";
import Text from "../Text";
import { useRouter } from "next/navigation";
import Field, { FieldProps } from "../Field";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { ColorVariant } from "../Button/colorVariantBy";

interface FormProps {
  title: string;
  buttonName: string;
  color: ColorVariant;
  fields: FieldProps[];
  type: 'editora' | 'autor' | 'livro';
  onSubmit: (dadosFormulario: IDadosFormulario) => void;
}

export default function Form({ title, buttonName, color, fields, type, onSubmit }: FormProps) {
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
        width: { xs: "100%", md: "80%" },
        padding: 30,
        gap: 30,
        borderRadius: { xs: 0, md: 15 },
        backgroundColor: { xs: theme.colors[color].x100, md: theme.colors.neutral.x050 },
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Text tag="h1" variant="heading2">{title} - {capitalizeFirstLetter(type)}</Text>
      {fields.map(field => 
        <Field 
          key={field.name} 
          slug={field.slug} 
          name={field.name} 
          value={field.value} 
          setValue={field.setValue} 
          type={field.type}
        />)}
      <Box styleSheet={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <Button
          styleSheet={{
            paddingVertical: { xs: 8, md: 8, xl: 5},
            paddingHorizontal: { xs: 5, md: 8, xl: 10 },
            borderRadius: 5,
          }}
          colorVariant={color}
          colorVariantEnabled
          onClick={voltar}
        >
          Voltar
        </Button>
        <Button
          styleSheet={{
            paddingVertical: { xs: 8, md: 8, xl: 5},
            paddingHorizontal: { xs: 5, md: 8, xl: 10 },
            borderRadius: 5,
          }}
          colorVariant={color}
          colorVariantEnabled
          onClick={montarDadosFormulario}
        >
          {buttonName}
        </Button>
      </Box>
    </Box>
  )
}

Form.displayName = "Form";

Form.defaultProps = {
  buttonColor: "primary"
};

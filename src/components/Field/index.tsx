import Box from "../Box";
import Input from "../Input";
import Text from "../Text";
import { Dispatch, SetStateAction } from 'react';

 export interface FieldProps {
  name: string;
  slug: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type?: 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'email' | 'file' | 'image' | 'number' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'url' ;
}

export default function Field({ name, slug, value, setValue, type }: FieldProps) {
  return (
    <Box styleSheet={{ gap: 10, width: "100%" }}>
      <Text 
        tag="label" 
        htmlFor={slug}
        styleSheet={{ fontSize: { xs: 22, md: 24, xl: 28 }}}
      >
        {name}
      </Text>
      <Input 
        id={slug} 
        name={slug} 
        value={value}
        styleSheet={{ paddingVertical: 5, paddingHorizontal: 5 }}
        type={type} 
        onChange={event => setValue(event.target.value)}
      />
    </Box>
  )
}

Field.defaultProps = {
  type: 'text'
}

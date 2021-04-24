import React from "react";

import { TextFieldFormsy } from "@fuse";

import { Grid, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { addValidationRule } from "formsy-react";
//import { getEdadFromDate } from "app/utils/utils";

addValidationRule("noWhiteSpaces", (values, value) => {
  if (value.trim().length > 0) return true;
  return false;
});

addValidationRule("outsideError", (values, value) => {
  return false;
});
addValidationRule("expedienteAntiguoAno", (values, value) => {
  if (!Number.isInteger(Number(value))) return false;
  if (value < 1994) return false;
  const year = new Date().getFullYear();
  if (value > year - 1) return false;
  return true;
});

addValidationRule("noEmptySpacesEdge", (values, value) => {
  if (value && value.length > 0) {
    if (value.charAt(0) === " " || value.charAt(value.length - 1) === " ")
      return false;
  }
  return true;
});

addValidationRule("oneWordAlpha", (values, value) => {
  let aplha = /^[A-Z]+$/i;
  if (/\s/.test(value) || !aplha.test(value)) return false;
  return true;
});

//la edad en echo no puede ser menor a la edad
addValidationRule("edadEnEchoMayorAEdad", (values, value) => {
  // if (values.edad && Number(values.edad) < Number(value)) return false;
  // else {
  //   const edad = getEdadFromDate(values.fecha_nacimiento);
  //   if (values.fecha_nacimiento && Number(edad) < value) return false;
  // }
  return true;
});
addValidationRule("edadMinSindicado", (values, value) => {
  if (Number.isInteger(Number(value)) && value > 12) return true;
  return false;
});
addValidationRule("edadMax", (values, value) => {
  if (Number.isInteger(Number(value)) && value < 121) return true;
  return false;
});

addValidationRule("numericoMayorCero", (values, value) => {
  if (Number.isInteger(Number(value)) && value > 0) return true;
  return false;
});

addValidationRule("numerico", (values, value) => {
  if (Number.isInteger(Number(value))) return true;
  return false;
});

const StyledField = styled(TextFieldFormsy)`
  border-color: transparent;
  width: calc(100% - 24px);
  margin: 12px;
  .MuiInputBase-root {
    border-radius: 4px;
    &:before {
      border-bottom: none;
    }
  }
  .MuiInputLabel-filled {
    font-size: medium;
    font-weight: 500;
  }
`;

const StyledModalField = styled(TextFieldFormsy)`
  border-color: transparent;
  width: 100%;
  margin: 12px 0px 0px 0px;
  .MuiInputBase-root {
    border-radius: 4px;
    &:before {
      border-bottom: none;
    }
  }
  .MuiInputLabel-filled {
    font-size: medium;
    font-weight: 500;
  }
`;

/**
 * 
 * @param {name} String nombre del campo
 * @param {required} Boolean si es requerido
 * @param {label} String texto que despliega
 * @param {minLengh} Number cantidad minima de caracteres
 * @param {value} String valor del string, al manejar dentro de fomsy apuntar a su respectivo valor en el form  
 * 
 * Ejemplo Implementacion 
 *          
 *          const campo=
  *          {name:"primer_nombre",
              required:true,
              label:"Primer Nombre",
              minLength:2,
              value:values.primer_nombre,
            }
          ...
          <FieldForm  {...campo} onChange={handleChange}/>
 */

const FieldForm = ({ ...props }) => {
  const StyledFieldTemp = props.withModal ? StyledModalField : StyledField;
  const { titleTooltip = "", tooltipProps } = props;
  return (
    <Tooltip
      PopperProps={{
        popperOptions: {
          modifiers: {
            offset: {
              enabled: true,
              offset: "0px, -24px",
            },
          },
        },
      }}
      placement="top"
      title={titleTooltip}
      {...tooltipProps}
    >
      <Grid
        item
        xs={props.xs || 12}
        sm={props.sm || 6}
        md={props.md || 4}
        {...(props.margin ? { style: { ...props.margin } } : {})}
        onClick={props.onClickContainer ? props.onClickContainer : () => {}}
      >
        <StyledFieldTemp
          {...props}
          {...(props.mensajeError
            ? {
                validations: {
                  isTrue: true,
                },
                validationErrors: {
                  isTrue: props.mensajeError,
                },
              }
            : {})}
          onChange={(event) =>
            props.onChange &&
            props.onChange({
              target: { value: event.target.value, name: props.name },
            })
          }
          variant="filled"
        />
      </Grid>
    </Tooltip>
  );
};
export default React.memo(FieldForm);

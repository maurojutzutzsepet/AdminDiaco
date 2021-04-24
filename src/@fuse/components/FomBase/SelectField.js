import React from "react";

import { SelectFormsy } from "@fuse";

import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Tooltip } from "@material-ui/core";
import styled from "styled-components";
//import { useTheme } from "@material-ui/core/";

const StyledSelectFieldCard = styled(SelectFormsy)`
  width: 100%;
  height: 56px;
  margin: 0px;
  border-color: transparent;

  .MuiGrid-root {
    width: 100%;
    maxwidth: 100%;
  }
  .MuiAutocomplete {
    root: {
      width: 100% !important;
    }
  }
  .MuiFormControl-root {
    width: 100%;
  }
  .MuiInputBase-root {
    background-color: #fff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.06);
    width: 100%;
    height: 56px;
    border-radius: 8px;
    &:before {
      border-bottom: none;
    }
  }
  .MuiFormHelperText-root.Mui-error {
    position: absolute;
    margin-top: 61px;
  }
`;

const SelectFieldStyled = styled(SelectFormsy)`
  border-color: transparent;
  margin: 12px;
  width: calc(100% - 24px);
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

const SelectFieldNoMargin = styled(SelectFormsy)`
  border-color: transparent;
  margin: 12px 0 0 0;
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

const MenuItemSeparator = styled(MenuItem)`
  ${(props) => `
    background-color: white !important;
    font-size: ${props.theme.typography.body2.fontSize}px;
    font-weight: ${props.theme.typography.body2.fontWeight};
  `}
`;
/**
 * 
 * @param {name} String Nombre del campo 
   @param {required} Boolean si el campo es requerido,
   @param {label} String placeholder,
   @param {value} String valor, en formsy enlazar con el valor asignado
   @param {opciones} Array array de opciones con campos necesarios [{label:string,id:string}],  
   @param {valueKey} String opcional key del valor de opciones a retornar
   @param {textKey} String opcional key del string a desplegar
   @param mensajeError despliega mensaje derror personalizado, nota "solo se despliega si el select contien data"
   @param {Boolean} unSelectableSinSelect cambia el valor del "Sin seleccion" a <""> para adaptar el comportamiento cuando se seleccionar esta opcion volver al estado inicial
   * Ejemplo implementacion:
*      const select={
        name:"nombreDelCampo",
        required:false,
        label:"Estado Civil",
        minLength:2,
        value:values.lgbti,
        textKey:"titulo",
        valueKey:"id_estado_civil"
        opciones:[{id:"1",label:"a"},{id:"2",label:"b"},{id:"3",label:"c"}],       
    }
    <SelectField {...select} onChange={handleChange}/>
 */
const SelectField = (props) => {
  const { titleTooltip = "", tooltipProps } = props;
  const valueKey = props.valueKey || "id";
  const text = props.textKey || "titulo";
  //const theme = useTheme();
  const variant = props.variant || "";
  const SelectType =
    variant === "card"
      ? StyledSelectFieldCard
      : variant === "noMargin"
      ? SelectFieldNoMargin
      : SelectFieldStyled;
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
      <Grid item xs={props.xs || 12} sm={props.sm || 6} md={props.md || 4}>
        <SelectType
          id={props.id}
          className="my-16"
          {...props}
          //crear mensaje de error personalizado
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
          variant="filled"
          onChange={(event) =>
            props.onChange &&
            props.onChange({
              target: { value: event.target.value, name: props.name },
            })
          }
        >
          {props.opciones.length > 0 ? (
            props.opciones.map(({ separador, ...op }, index) => {
              if (props.unSelectableSinSelect && op[valueKey] === -1) {
                return (
                  <MenuItem key={index} value={""}>
                    {op[text]}
                  </MenuItem>
                );
              }
              if (separador) {
                return (
                  <MenuItemSeparator disabled key={index}>
                    {op[text]}
                  </MenuItemSeparator>
                );
              } else {
                return (
                  <MenuItem key={index} value={op[valueKey]}>
                    {op[text]}
                  </MenuItem>
                );
              }
            })
          ) : (
            <MenuItem disabled={props.disabled} value="-1">
              Sin selección
            </MenuItem>
          )}
        </SelectType>
      </Grid>
    </Tooltip>
  );
};
export default React.memo(SelectField);

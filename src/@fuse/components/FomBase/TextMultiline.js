import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { TextFieldFormsy } from "@fuse";
// import { withFormsy } from "formsy-react";
/**
 * Campo de Texto multilineas con contador de palabras que limita la cantidad escrita en funcion a maxCount
 * 
 * @param {String} label etiqueta 
 * @param {String} rows cantidad de lineas
 * @param {String} value valor o variable de valor 
 * @param {maxCount} string cantidad maxima de palabras en STRING (importante)
 * @param {bool} required parámetro obligatorio
 * @param {bool} wordBreakOverflow comportamiento de break en el overfloy en lugar de ellipsis
 * 
 * ejemplo de implementacion
 *  const narracion = {
        id: "opcional",
        name: "opcional",
        label: "Narracion detallada",
        rows:"19",
        value: valuesFormDetalleExpediente.narracion,
        maxCount:2,
  };} 
 */
const useStyles = makeStyles((theme) => ({
  wordCount: {
    color: theme.palette.grey[300],
    zIndex: 10,
    position: "absolute",
    right: 18, //28,
    bottom: 8, //24,
  },
  positionCount: {
    bottom: 27,
  },
}));
const TextMultiLIne = ({
  maxCount,
  textError,
  emptyError,
  wordBreakOverflow = false,
  ...props
}) => {
  const [palabrasCount, setPalabrasCount] = useState(0);

  const textFieldRef = useRef({});

  const handleChange = (e) => {
    const val = e.target.value;
    const palabras = val.length;
    setPalabrasCount(palabras);
    props.onChange &&
      props.onChange({
        target: { value: e.target.value, name: props.name },
      });
  };

  useEffect(() => {
    /* Descomentar en caso de que algo falle en los campos textMultiline */
    // const element = textFieldRef.current ||{}

    // if (props.value) setPalabrasCount(props.value.length)
    // else if (element.value) setPalabrasCount(element.value.length)

    /* comentar codigo en caso que los campos textMultiline fallen*/
    if (props.value) setPalabrasCount(props.value.length);
    //resetear contador
    return () => {
      setPalabrasCount(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFieldRef, props.value]);

  const classes = useStyles();
  const element = textFieldRef.current || {};
  return (
    <div className="relative">
      <Box width={1}>
        <TextFieldFormsy
          {...(wordBreakOverflow
            ? {
                InputLabelProps: {
                  style: {
                    whiteSpace: "break-spaces",
                    wordBreak: "break-word",
                  },
                },
              }
            : {})}
          {...props}
          variant="filled"
          inputRef={textFieldRef}
          multiline={true}
          fullWidth={true}
          // onBlur={props.onBlur}
          onBlur={(event) =>
            props.onBlur &&
            props.onBlur({
              target: { value: event.target.value, name: props.name },
            })
          }
          onChange={handleChange}
          // {...(textError ? { error: true, helperText: textError } : {})}
          // {...(emptyError && !palabrasCount
          //   ? { error: true, helperText: emptyError }
          //   : {})}
          {...(maxCount ? { inputProps: { maxLength: maxCount } } : {})}
        />
      </Box>
      <Typography
        className={clsx(classes.wordCount, {
          [classes.positionCount]: Boolean(
            element.validity && !element.validity.valid
          ),
        })}
        // style={
        //   textError || (!palabrasCount && emptyError) ? { bottom: 46 } : {}
        // }
        variant="caption"
      >
        {palabrasCount}/{maxCount}
      </Typography>
    </div>
  );
};
export default React.memo(/* withFormsy */ TextMultiLIne);

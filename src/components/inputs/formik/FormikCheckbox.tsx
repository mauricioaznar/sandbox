import React from 'react'
import {Checkbox, FormControlLabel, FormGroup, SvgIconTypeMap} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {FormikDefaultProps} from "./common/FormikDefaultProps";
import {useField} from "formik";


interface FormikCheckboxProps extends FormikDefaultProps {
    uncheckedIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}
    checkedIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}

}


const ReactHookFormCheckbox = ({ name, label, checkedIcon, uncheckedIcon }: FormikCheckboxProps) => {
    const CheckedIcon = checkedIcon || CheckBoxIcon
    const UncheckedIcon = uncheckedIcon || CheckBoxOutlineBlankIcon

    const [formikProps, ,fieldHelperProps] = useField(name)


    return (
        <FormGroup>
            <FormControlLabel
                sx={{
                    justifyContent: "flex-start"
                }}
                checked={formikProps.value}
                onChange={() => {
                    fieldHelperProps.setValue(!formikProps.value, true)
                }}
                value={formikProps.value}
                control={
                    <Checkbox
                        checkedIcon={<CheckedIcon />}
                        icon={<UncheckedIcon />}
                    />
                }
                label={label || ''}
            />
        </FormGroup>
    )
}

export default ReactHookFormCheckbox

import React from 'react'
import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {MauInputProps} from "./common/MauInputProps";

interface Rules {
    required?: boolean;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    email?: boolean;
    pattern?: RegExp;
    invalid?: null | string;
}


interface MauTextFieldProps extends MauInputProps {
    rules: Rules;
    size?: "medium" | "small"
}

const validateEmail = (email:string) => {
    return email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );
}

const getRuleMessage = ({
                            rule,
                            rules,
                            fieldName,
                            value
                        }: { rule: keyof Rules | 'validate', value: string, rules: Rules, fieldName: string }) => {

    switch (rule) {
        case 'required': {
            return `${fieldName} is required.`
        }
        case 'minLength': {
            return `${fieldName} must be bigger than ${rules[rule]}.`
        }
        case 'validate': {
            const rule = customValidate(value, rules)
            if (rule === 'email') {
                return `${rule} is not a valid email.`
            } else {
                return rules.invalid
            }
        }
        default: {
            return ''
        }
    }
}

const customValidate: (val: string, rules: Rules) => keyof Rules | null = (val, rules) => {
    let rule: keyof Rules | null = null
    if (rules.email === true && !validateEmail(val)) {
        rule = 'email'
    }
    if (rules.invalid !== null) {
        rule = 'invalid'
    }
    return rule
}


const getReactHookFormRules = (rules: Rules) => {
    const {email, invalid, ...rest} = rules

    return {
        ...rest,
        validate: async (val: string) => {
            return customValidate(val, {email, invalid}) ===  null
        }
    }
}


const MauTextField = ({control, name, label, rules, size = "medium"}: MauTextFieldProps) => {


    return (
        <Controller
            control={control}
            name={name}
            rules={getReactHookFormRules(rules)}
            render={(ops) => {
                const {field: {onChange, value}, fieldState: {error}} = ops
                let helperText = ''
                if (error) {
                    const rule = error.type as keyof Rules
                    helperText = getRuleMessage({
                        rule: rule,
                        fieldName: label || name,
                        rules: rules,
                        value: value
                    })
                }
                return (
                    <TextField
                        size={size}
                        margin="normal"
                        fullWidth
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value)
                        }}
                        error={!!error}
                        helperText={helperText}
                        label={label}
                    />
                )
            }}
        />
    )
}

export default MauTextField

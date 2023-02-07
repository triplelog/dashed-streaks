import { useState, useEffect } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    Radio,
    Upload,
    useForm,
    useSelect,
    RcFile,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { supabaseClient } from "utility";
import { createMorse, fromMorse } from "utility/morse";

export const StreakCreate: React.FC<IResourceComponentsProps> = (  ) => {
    const { formProps, saveButtonProps, onFinish } = useForm();
    
    const [values, setValues] = useState({
        start: 'test',
    });
    const changeType = (value: string) => {
        setValues({start: value});
    }
    

    const handleOnFinish = (values: any) => {
        const morse = createMorse(values.word);
        onFinish({
            morse: morse,
            name: `${values.name}`,
            word: `${values.word}`,
            type: `${values.type}`,
            onoff: `${values.onoff}`,
            dot: `${values.dot}`,
            dash: `${values.dash}`,
            start: new Date().toUTCString(),
        });
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={(values) => handleOnFinish(values)} layout="vertical">
                
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Word/Phrase"
                    name="word"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Time per Task"
                >
                    <Radio.Group 
                        name="type"
                        optionType="button"
                        buttonStyle="solid"
                        defaultValue="day"
                        onChange={(event) => {changeType(event.target.value)}}
                    >
                        <Radio value="hour" >Hour</Radio>
                        <Radio value="day" >Day</Radio>
                        <Radio value="week" >Week</Radio>
                        <Radio value="month" >Month</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Schedule"
                    name="onoff"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Dot Task"
                    name="dot"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Dash Task"
                    name="dash"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Start Time"
                    
                >
                    <Input name="start" value={values.start} />
                </Form.Item>
                
                
            </Form>
        </Create>
    );
};

import { useState, useEffect } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
    RcFile,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IStreak } from "interfaces";
import { supabaseClient } from "utility";

export const StreakCreate: React.FC<IResourceComponentsProps> = (  ) => {
    const { formProps, saveButtonProps } = useForm<IStreak>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Word"
                    name="word"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                
            </Form>
        </Create>
    );
};
